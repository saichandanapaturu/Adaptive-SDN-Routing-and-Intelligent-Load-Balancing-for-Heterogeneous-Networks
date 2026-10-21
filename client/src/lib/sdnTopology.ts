import type { NetworkNode } from '@/hooks/useLiveNetworkData';

/**
 * Normalize nodes saved or exported before routers were removed from the SDN
 * topology. A legacy router was a forwarding device, so it becomes an SDN
 * switch with the same id, label, and links; dropping it could disconnect hosts.
 */
export function toSdnNodes(nodes: unknown): NetworkNode[] {
  if (!Array.isArray(nodes)) return [];
  return nodes.map(node => (
    node && typeof node === 'object' && (node as { type?: unknown }).type === 'router'
      ? { ...(node as NetworkNode), type: 'switch' }
      : node as NetworkNode
  ));
}
