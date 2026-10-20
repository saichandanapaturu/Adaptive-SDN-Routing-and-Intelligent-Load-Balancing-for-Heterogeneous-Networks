export interface PeakHourPeriod {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  intensity: number;
  enabled: boolean;
}

export const PEAK_HOURS_STORAGE_KEY = 'aife-peak-hours';

export const DEFAULT_PEAK_HOURS: PeakHourPeriod[] = [
  {
    id: 'major-ticket-release',
    name: 'Major Ticket Release',
    startTime: '17:45',
    endTime: '18:45',
    intensity: 76,
    enabled: true,
  },
];

function minuteOfDay(time: string): number | null {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isValidPeakHourFields(period: {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  intensity: number;
  enabled: boolean;
}): boolean {
  const start = minuteOfDay(period.startTime);
  const end = minuteOfDay(period.endTime);
  return Boolean(
    period.id.trim()
      && period.name.trim()
      && start !== null
      && end !== null
      && start !== end
      && Number.isInteger(period.intensity)
      && period.intensity >= 0
      && period.intensity <= 100
      && typeof period.enabled === 'boolean',
  );
}

export function isValidPeakHourPeriod(period: PeakHourPeriod): boolean {
  return isValidPeakHourFields(period);
}

export function isPeakHourSchedule(value: unknown): value is PeakHourPeriod[] {
  return Array.isArray(value)
    && value.every((period: unknown): period is PeakHourPeriod => {
      if (!isRecord(period)
        || typeof period.id !== 'string'
        || typeof period.name !== 'string'
        || typeof period.startTime !== 'string'
        || typeof period.endTime !== 'string'
        || typeof period.intensity !== 'number'
        || typeof period.enabled !== 'boolean') return false;
      return isValidPeakHourFields({
        id: period.id,
        name: period.name,
        startTime: period.startTime,
        endTime: period.endTime,
        intensity: period.intensity,
        enabled: period.enabled,
      });
    })
    && new Set(value.map(period => period.id)).size === value.length;
}

export function parsePeakHourSchedule(serialized: string | null): PeakHourPeriod[] {
  if (!serialized) return DEFAULT_PEAK_HOURS.map(period => ({ ...period }));
  try {
    const parsed: unknown = JSON.parse(serialized);
    return isPeakHourSchedule(parsed)
      ? parsed
      : DEFAULT_PEAK_HOURS.map(period => ({ ...period }));
  } catch {
    return DEFAULT_PEAK_HOURS.map(period => ({ ...period }));
  }
}

export function serializePeakHourSchedule(periods: PeakHourPeriod[]): string {
  if (!isPeakHourSchedule(periods)) {
    throw new RangeError('Peak-hour schedules must contain valid, uniquely identified periods.');
  }
  return JSON.stringify(periods);
}

export function addPeakHour(
  periods: PeakHourPeriod[],
  period: PeakHourPeriod,
): PeakHourPeriod[] {
  const next = [...periods, period];
  if (!isPeakHourSchedule(next)) {
    throw new RangeError('The peak period is invalid or its id is already in use.');
  }
  return next;
}

export function updatePeakHour(
  periods: PeakHourPeriod[],
  id: string,
  changes: Partial<Omit<PeakHourPeriod, 'id'>>,
): PeakHourPeriod[] {
  const next = periods.map(period => period.id === id ? { ...period, ...changes } : period);
  if (!isPeakHourSchedule(next)) {
    throw new RangeError('The updated peak-hour schedule is invalid.');
  }
  return next;
}

export function removePeakHour(periods: PeakHourPeriod[], id: string): PeakHourPeriod[] {
  return periods.filter(period => period.id !== id);
}

function containsMinute(period: PeakHourPeriod, minute: number): boolean {
  const start = minuteOfDay(period.startTime);
  const end = minuteOfDay(period.endTime);
  if (start === null || end === null || start === end) return false;
  const normalizedMinute = ((minute % 1440) + 1440) % 1440;
  return start < end
    ? normalizedMinute >= start && normalizedMinute < end
    : normalizedMinute >= start || normalizedMinute < end;
}

export function activePeakHourAt(
  periods: PeakHourPeriod[],
  minute: number,
): PeakHourPeriod | undefined {
  return periods
    .filter(period => period.enabled && containsMinute(period, minute))
    .sort((left, right) => right.intensity - left.intensity || left.id.localeCompare(right.id))[0];
}

export function nextPeakHour(
  periods: PeakHourPeriod[],
  minute: number,
): { period: PeakHourPeriod; scheduledMinute: number; timeUntilMinutes: number } | undefined {
  const currentMinute = ((minute % 1440) + 1440) % 1440;
  const candidates = periods
    .filter(period => period.enabled)
    .map(period => {
      const start = minuteOfDay(period.startTime);
      if (start === null) return undefined;
      const timeUntilMinutes = (start - currentMinute + 1440) % 1440 || 1440;
      return { period, scheduledMinute: start, timeUntilMinutes };
    })
    .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate))
    .sort((left, right) => left.timeUntilMinutes - right.timeUntilMinutes || left.period.id.localeCompare(right.period.id));
  return candidates[0];
}

export function applyPeakHourLoad(baseTraffic: number, peak?: PeakHourPeriod): number {
  const baseline = Math.max(0, Math.min(100, baseTraffic));
  return peak ? Math.max(baseline, peak.intensity) : baseline;
}

export function applyPeakHourSchedule<T extends { trafficLevel: number }>(
  links: T[],
  periods: PeakHourPeriod[],
  minute: number,
  simulationEnabled: boolean,
): T[] {
  if (!simulationEnabled) return links;
  const peak = activePeakHourAt(periods, minute);
  return links.map(link => ({
    ...link,
    trafficLevel: applyPeakHourLoad(link.trafficLevel, peak),
  }));
}

export function peakHourDurationMinutes(period: PeakHourPeriod): number {
  const start = minuteOfDay(period.startTime);
  const end = minuteOfDay(period.endTime);
  if (start === null || end === null || start === end) return 0;
  return (end - start + 1440) % 1440;
}
