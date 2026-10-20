import { describe, expect, it } from 'vitest';
import {
  activePeakHourAt,
  addPeakHour,
  applyPeakHourLoad,
  applyPeakHourSchedule,
  DEFAULT_PEAK_HOURS,
  isPeakHourSchedule,
  nextPeakHour,
  parsePeakHourSchedule,
  peakHourDurationMinutes,
  removePeakHour,
  serializePeakHourSchedule,
  updatePeakHour,
  type PeakHourPeriod,
} from './peakHours';

const morningPeak: PeakHourPeriod = {
  id: 'morning',
  name: 'Morning peak',
  startTime: '09:00',
  endTime: '10:00',
  intensity: 72,
  enabled: true,
};

describe('peak-hour schedule', () => {
  it('adds, edits, disables, and removes periods with immediate load changes', () => {
    let periods = addPeakHour([], morningPeak);
    expect(applyPeakHourLoad(20, activePeakHourAt(periods, 9 * 60))).toBe(72);

    periods = updatePeakHour(periods, morningPeak.id, { intensity: 88 });
    expect(applyPeakHourLoad(20, activePeakHourAt(periods, 9 * 60))).toBe(88);

    periods = updatePeakHour(periods, morningPeak.id, { enabled: false });
    expect(applyPeakHourLoad(20, activePeakHourAt(periods, 9 * 60))).toBe(20);

    periods = removePeakHour(periods, morningPeak.id);
    expect(periods).toEqual([]);
    expect(applyPeakHourLoad(20, activePeakHourAt(periods, 9 * 60))).toBe(20);
  });

  it('uses half-open boundaries and supports periods crossing midnight', () => {
    const overnight = { ...morningPeak, startTime: '22:00', endTime: '02:00' };
    expect(activePeakHourAt([overnight], 22 * 60)?.id).toBe('morning');
    expect(activePeakHourAt([overnight], 1 * 60)?.id).toBe('morning');
    expect(activePeakHourAt([overnight], 2 * 60)).toBeUndefined();
    expect(activePeakHourAt([morningPeak], 10 * 60)).toBeUndefined();
    expect(peakHourDurationMinutes(overnight)).toBe(240);
  });

  it('resolves overlaps by highest intensity with deterministic ties', () => {
    const overlapping = [
      morningPeak,
      { ...morningPeak, id: 'evening', name: 'Evening peak', startTime: '09:30', endTime: '11:00', intensity: 90 },
      { ...morningPeak, id: 'another-90', name: 'Equal peak', startTime: '09:30', endTime: '11:00', intensity: 90 },
    ];
    expect(activePeakHourAt(overlapping, 9 * 60 + 30)?.id).toBe('another-90');
    expect(activePeakHourAt(overlapping, 9 * 60 + 29)?.id).toBe('morning');
  });

  it('selects the next enabled daily period and reports no disabled period', () => {
    const periods = [
      { ...morningPeak, enabled: false },
      { ...morningPeak, id: 'later', name: 'Later', startTime: '18:00', endTime: '19:00' },
    ];
    expect(nextPeakHour(periods, 17 * 60 + 30)).toMatchObject({
      period: { id: 'later' },
      scheduledMinute: 18 * 60,
      timeUntilMinutes: 30,
    });
    expect(nextPeakHour(periods.map(period => ({ ...period, enabled: false })), 0)).toBeUndefined();
  });

  it('rejects invalid times and equal start/end boundaries', () => {
    expect(isPeakHourSchedule([{ ...morningPeak, startTime: '24:00' }])).toBe(false);
    expect(isPeakHourSchedule([{ ...morningPeak, startTime: '09:00', endTime: '09:00' }])).toBe(false);
    expect(() => updatePeakHour([morningPeak], morningPeak.id, { endTime: '09:00' })).toThrow(RangeError);
    expect(() => addPeakHour([morningPeak], morningPeak)).toThrow(RangeError);
  });

  it('round-trips settings through persistence and recovers safely from malformed data', () => {
    const serialized = serializePeakHourSchedule([morningPeak]);
    expect(parsePeakHourSchedule(serialized)).toEqual([morningPeak]);
    expect(parsePeakHourSchedule('{broken')).toEqual(DEFAULT_PEAK_HOURS);
    expect(parsePeakHourSchedule(JSON.stringify([{ ...morningPeak, intensity: 101 }]))).toEqual(DEFAULT_PEAK_HOURS);
  });

  it('applies configured load to arbitrary simulated topologies but leaves real telemetry untouched', () => {
    const customLinks = [
      { source: 'host-a', target: 'switch-a', trafficLevel: 20 },
      { source: 'switch-a', target: 'switch-b', trafficLevel: 35 },
    ];
    const simulatedLinks = applyPeakHourSchedule(customLinks, [morningPeak], 9 * 60, true);
    expect(simulatedLinks.map(link => link.trafficLevel)).toEqual([72, 72]);
    expect(simulatedLinks.map(link => [link.source, link.target])).toEqual([
      ['host-a', 'switch-a'],
      ['switch-a', 'switch-b'],
    ]);
    expect(applyPeakHourSchedule(customLinks, [morningPeak], 9 * 60, false)).toBe(customLinks);
    expect(customLinks.map(link => link.trafficLevel)).toEqual([20, 35]);
  });
});
