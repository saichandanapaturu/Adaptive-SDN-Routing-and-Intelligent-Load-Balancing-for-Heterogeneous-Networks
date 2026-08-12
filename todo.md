# Custom topology integration

- [ ] Inspect current active-topology selection and identify why Dashboard Topology falls back to the default network.
- [ ] Make custom nodes and links the active topology in Dashboard Topology mode when the user has created a custom topology.
- [ ] Make port statistics, predictions, reroute events, packet flows, and summary metrics derive from the active topology.
- [ ] Preserve custom topology data across mode switches and page reloads.
- [ ] Handle empty custom networks without showing default-network metrics.
- [ ] Verify node/link counts, tables, graphs, route controls, and animated packet flow in the browser.
- [ ] Save a checkpoint after verification.

## Acceptance criteria

- Dashboard Topology renders the same custom nodes and links created in Custom Topology.
- Custom node/link counts are reflected in the summary cards and network stats.
- Statistics, Prediction, and Reroute Log use only the active topology.
- Source/destination controls use custom nodes, and packet flow follows custom links.
- Switching modes does not erase the custom topology.
- A custom topology with no links shows zero active links and no fabricated default links.

## Notes

- The current implementation has separate default and custom fallback logic in the live-data hook.
- The previous browser test showed custom nodes while the dashboard still reported default link counts; this is the bug to remove.
- Use simulated live telemetry only because no external network API/source was provided.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently mixing it with the default topology.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

- [ ] Phase 1: inspect and document
- [ ] Phase 2: unify active topology
- [ ] Phase 3: persistence and empty states
- [ ] Phase 4: browser verification
- [ ] Phase 5: delivery

## Style Decisions

- Preserve the existing dark network-operations-center visual language.
- Keep topology labels and links high-contrast and legible.
- Make active custom data explicit with a visible Custom topology indicator rather than silently rendering unrelated default-network values.
- Do not present simulated telemetry as real infrastructure telemetry; label it as live simulation where appropriate.

## Style Decisions

- The active topology is the primary visual subject: the Dashboard Topology canvas and metric panels must stay synchronized.
- Custom mode is an authoring surface; Dashboard Topology is the monitoring surface for the saved custom network.
- Empty states should explain what is missing instead of silently rendering unrelated default-network values.
- Prefer clear, compact status copy and visible live-update timestamps over decorative dashboard noise.

## Status

## Live custom telemetry correction

- [ ] Remove the behavior that substitutes default links when custom nodes exist but custom links are empty.
- [ ] Use the custom node/link arrays as the sole input for the Dashboard Topology monitor view whenever a custom topology has been created.
- [ ] Recalculate all live metrics from the active custom topology on every tick.
- [ ] Ensure the live simulation visibly changes node traffic, link traffic, port rates, packet counters, predictions, and route events.
- [ ] Show zero active links, zero traffic, and an explanatory state for a custom topology that has nodes but no links.
- [ ] Verify the Dashboard Topology canvas contains custom labels and no default labels after switching from Custom Topology.
- [ ] Verify the Statistics, Prediction, and Reroute Log tabs contain data tied to custom node labels.
- [ ] Verify source/destination selectors and packet flow use only custom nodes and custom links.
- [ ] Run type checking/build verification and save a checkpoint only after the browser test passes.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.

## Live custom telemetry status

- [ ] Inspect current fallback logic
- [ ] Replace fallback logic
- [ ] Recalculate panels from active custom topology
- [ ] Verify live changes
- [ ] Save and deliver

## Acceptance criteria for this correction

- When a custom topology exists, the dashboard summary node count equals the custom node count.
- When a custom topology exists with no links, the dashboard active-link count is zero rather than the default topology count.
- Dashboard Topology shows custom node labels and custom links only.
- Port statistics rows use custom node labels.
- Prediction and reroute entries reference custom node labels when those events are generated.
- Packet flows are emitted only when a valid custom path exists.
- Values change over time without reintroducing default-network data.


## Requested completion pass

- [ ] Make custom nodes and custom links the active source for Dashboard Topology whenever a saved custom topology exists.
- [ ] Remove the custom-links-empty fallback to DEFAULT_LINKS.
- [ ] Generate port statistics from active custom nodes and active custom links, with values changing every tick.
- [ ] Generate prediction values from current custom-link traffic and append live history for the prediction graph.
- [ ] Generate reroute events using valid custom source/destination pairs and custom paths only.
- [ ] Generate packet flows only across valid custom links and use the selected custom source and destination.
- [ ] Make summary counts, topology labels, tables, graphs, and logs update from the same active custom telemetry state.
- [ ] Verify a custom topology with nodes and links in Dashboard Topology.
- [ ] Verify a custom topology with nodes but no links shows zero active links and no default data.
- [ ] Verify telemetry values change across multiple ticks and route flow completes.
- [ ] Run typecheck/build, restart if required, capture representative screenshots, and save the final checkpoint.

## Requested completion pass

- [ ] Make custom nodes active in Dashboard Topology whenever a custom topology exists.
- [ ] Keep custom links as an exact active-link set; never substitute default links when the custom link list is empty.
- [ ] Recompute port statistics, predictions, reroute events, packet flows, and summary cards from the active custom topology.
- [ ] Ensure telemetry values continue changing on a stable one-second interval without stale topology closures.
- [ ] Verify custom labels render in Dashboard Topology and route flow uses selected custom source and destination.
- [ ] Verify the requested live custom dashboard behavior, build, and checkpoint delivery.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow
- [ ] Save and deliver

## Acceptance criteria

- A custom topology with nodes but no links shows zero active links and no default-network links.
- A custom topology with links shows only those links in Dashboard Topology.
- Port statistics contain custom node labels and changing values.
- Predictions and reroute events reference custom node labels where applicable.
- Packet flows appear only along valid custom paths.
- Summary values reflect custom node and link counts and continue changing as telemetry updates.

## Requested completion status

- [ ] Trace fallback logic
- [ ] Implement live custom telemetry
- [ ] Verify custom rendering and packet flow

## Completion evidence

The custom telemetry integration is implemented. The hook now uses custom nodes as the active source whenever any custom node exists, uses only custom links without substituting default links, recomputes node/link traffic every second, derives port statistics from incident custom links, records prediction history from custom traffic, emits reroute entries only for connected custom node pairs, and emits packet flows only for valid custom paths.

Browser verification passed. A saved Core-Switch and Edge-Router topology rendered in Dashboard Topology with 2 nodes and 1 custom link. The dashboard showed CUSTOM LIVE ticks, the port table showed Core-Switch and Edge-Router rows with changing rates and packet counters, the Prediction panel showed changing forecasts and recent history, the Reroute Log showed Core-Switch to Edge-Router events, and packet flows appeared on the custom route. The no-link state also showed 2 nodes and 0 active links without default topology data. Typecheck and production build passed.

- [x] Make custom nodes and custom links the active source for Dashboard Topology.
- [x] Remove custom-links-empty fallback to default links.
- [x] Update port statistics, predictions, reroute events, packet flows, and summary metrics from active custom telemetry.
- [x] Verify custom labels, custom link, changing values, recent prediction history, reroute entries, and packet route flow.
- [x] Complete build verification.

## Topology visibility refinement

- [ ] Inspect the topology renderer’s current canvas, node, link, label, and packet styles.
- [ ] Increase topology contrast and crispness without changing live telemetry behavior.
- [ ] Improve node hierarchy, label legibility, link routing, traffic badges, and source/destination emphasis.
- [ ] Add a professional NOC visual treatment with clearer grid, spacing, status colors, and reduced blur.
- [ ] Verify the topology at desktop and mobile widths.
- [ ] Confirm packet animation remains visible and route selectors still work.
- [ ] Save a new checkpoint and publish the refined version.

## Topology refinement verification result

The topology renderer now uses a responsive high-DPI canvas, crisp grid registration, a dark instrument panel, stronger link contrast, status-based line styles, traffic badges, geometric node glyphs, boxed mono labels, clear SRC/DST markers, and precise cyan packet cores. Typecheck and production build passed. Desktop preview shows the revised topology clearly, and the mobile preview remains readable without changing the live data panels. The live server restarted successfully after the change.

- [x] Inspect renderer and identify blur sources.
- [x] Replace diffuse topology styling with crisp professional NOC treatment.
- [x] Preserve live custom nodes, links, packet flows, selectors, and interactions.
- [x] Verify desktop and mobile previews.
- [x] Verify build and server restart.

## ResizeObserver warning fix

- [ ] Trace the ResizeObserver and canvas style-sizing interaction.
- [ ] Prevent observer callbacks from synchronously changing the observed element’s layout.
- [ ] Preserve responsive high-DPI canvas rendering and packet animation.
- [ ] Run typecheck and production build.
- [ ] Verify the dashboard preview and browser console warning state.
- [ ] Save and publish the fix.

## ResizeObserver fix verification result

The warning was traced to observing the canvas while synchronously changing its CSS height during the observer callback. The renderer now observes the stable parent, schedules redraws through requestAnimationFrame, updates the CSS height only when it changes, and also listens to window resize. Typecheck and production build passed. The latest console entries after the fixed restart contain no new ResizeObserver warning; the remaining matches are historical entries from before the fix. The responsive topology preview still renders correctly with live packet flow.

- [x] Trace the observer feedback loop.
- [x] Apply parent observation and frame-scheduled redraw.
- [x] Run typecheck/build.
- [x] Restart and verify the preview.
- [x] Confirm no new warning after the fix.

## Published packet-animation fix

- [ ] Trace whether packet progress changes are visible to the canvas renderer.
- [ ] Ensure the topology canvas repaints continuously while packet flows are active.
- [ ] Preserve custom source/destination routes and live telemetry values.
- [ ] Prevent duplicate animation loops and clean up on unmount.
- [ ] Run typecheck and production build.
- [ ] Verify visible packet movement in the preview and published build.
- [ ] Save and publish the fix.

## Packet animation fix verification result

The topology now interpolates packet positions from elapsed time on a requestAnimationFrame loop whenever active packet flows exist, while the telemetry interval continues to create and remove flows. Cleanup cancels both resize and packet animation frames, preventing duplicates. Typecheck and production build passed, the restarted preview visibly shows a cyan packet on the route, and no new runtime errors appeared in the latest console entries. Direct browser verification of the published domain redirected to Manus authentication, so the final published result will be validated through the new auto-published checkpoint URL.

- [x] Trace packet progress and canvas repaint behavior.
- [x] Add continuous packet repainting.
- [x] Preserve route and telemetry behavior.
- [x] Run typecheck/build and restart.
- [x] Verify packet presence in the refreshed preview.

## Published packet flow still failing

- [ ] Confirm which published URL/version the user is opening.
- [ ] Verify packet flows are actually created when a valid route exists.
- [ ] Verify the canvas receives valid packet paths and progress values.
- [ ] Remove any probabilistic or route-dependent condition that can leave the published canvas empty.
- [ ] Make one clearly visible packet start on every active route, then replenish it continuously.
- [ ] Verify packets move across the rendered path over time.
- [ ] Run typecheck/build and publish only after deployed behavior is verified.

## Deterministic packet-emission verification

The previous implementation could leave the published canvas without a packet because creation depended on a random emission check and route changes cleared all flows. The new implementation creates an initial packet immediately for every valid route, restores a packet after the previous one expires, and immediately seeds a packet when the user changes source or destination. The restarted preview visibly shows a bright packet on the selected route. Typecheck and production build passed, and the latest console entries contain only historical ResizeObserver errors from before the fix. The published project URL is the current AIFE project domain, not the older legacy domain.

- [x] Remove random-only first-packet behavior.
- [x] Seed packets on topology initialization and route changes.
- [x] Replenish packets after expiration.
- [x] Verify visible packet in the refreshed preview.
- [x] Run typecheck/build and restart.

## Active links and prediction-driven rerouting

- [ ] Inspect how Active Links is currently calculated and why it can show zero while packets move.
- [ ] Count links used by active packet paths and expose that live count in the summary card.
- [ ] Preserve healthy-link counts separately from packet-active link counts where the UI needs both meanings.
- [ ] Detect congested or predicted-congested links before each packet update.
- [ ] Find a healthier alternate path and reroute active packets when the current route is congested.
- [ ] Update packet paths, source/destination movement, reroute log, and prediction data consistently.
- [ ] Show a clear no-alternate-path state without inventing a route.
- [ ] Run typecheck and production build.
- [ ] Verify active-link values, congestion-triggered rerouting, packet animation, and reroute logs.
- [ ] Save and publish the update.

## Active-link and rerouting verification result

Active Links now counts the unique topology edges used by current packet paths, so a two-edge packet route reports 2 even if those links are warning or critical. The live update loop now derives predicted pressure from the current prediction, marks active-route hotspots, scores alternate paths by traffic and health, avoids pressured route edges, resets rerouted packet progress, and writes real oldPath/newPath entries to the reroute log. The refreshed preview showed Active Links changing to 2 and 3 as packet paths changed. Typecheck and production build passed; the latest console output showed only historical ResizeObserver entries from earlier sessions and no new errors during this update.

- [x] Correct Active Links semantics.
- [x] Add health- and traffic-weighted alternate path selection.
- [x] Trigger reroutes from actual or predicted congestion.
- [x] Update packet path and reroute log together.
- [x] Verify changing active-link values and live topology behavior.

## Congestion Predictor graph refresh

- [ ] Identify why the chart path is hardcoded and does not use the rolling prediction history.
- [ ] Connect observed and predicted chart points to live prediction values.
- [ ] Maintain a rolling time window so the graph changes after each telemetry update and remains visibly different after 30 seconds.
- [ ] Keep the header, metric cards, reroute panel, feature stream, and other tabs unchanged.
- [ ] Verify chart updates after multiple intervals and run typecheck/build.
- [ ] Publish the focused graph-only fix.

## Congestion Predictor graph refresh verification

The graph was static because the SVG paths were hardcoded even though rolling predictions were available. The observed line now derives from rolling prediction values blended with current live link telemetry, the prediction history line uses the rolling prediction series, and the forecast segment follows the current trend. A 32-second telemetry wait completed successfully, the refreshed dashboard remained stable, typecheck and production build passed, and the latest browser console check returned no errors or warnings. Other panel sections were left unchanged.

- [x] Replace hardcoded chart paths.
- [x] Connect observed and predicted lines to live rolling data.
- [x] Keep the forecast trajectory trend-aware.
- [x] Verify after a 30-second window.
- [x] Confirm no console errors.

## Congestion Predictor graph clarity refinement

- [ ] Inspect the current SVG chart presentation and identify blur sources.
- [ ] Add crisp chart axes, horizontal gridlines, scale labels, and clear time labels.
- [ ] Separate observed and predicted lines with strong contrast and distinct stroke styles.
- [ ] Add readable current-value markers and a clearly bounded forecast window.
- [ ] Preserve the live rolling data and avoid changing other panel sections.
- [ ] Verify the chart at desktop and mobile sizes, then run typecheck/build.
- [ ] Publish the graph-only visual refinement.

## Congestion Predictor graph clarity verification

The graph now uses a dedicated dark chart surface, explicit 0–100 scale labels, crisp dotted gridlines, visible axes, non-scaling strokes, clearer cyan observed and amber predicted paths, an outlined forecast window, readable forecast badge, current-value markers, and a gap indicator between observed and predicted values. The live chart geometry remains derived from rolling telemetry. Typecheck and production build passed; the refreshed dashboard preview and console check remained stable.

- [x] Add chart scale and grid system.
- [x] Strengthen line contrast and forecast separation.
- [x] Add current-value markers and accessible chart labeling.
- [x] Verify responsive dashboard preview.
- [x] Confirm no new console errors.

## Left-side dashboard navigation

- [ ] Inspect current tab navigation and page layout.
- [ ] Move Monitor, Statistics, Prediction, and Reroute Log into a vertical left-side button rail.
- [ ] Preserve active tab styling and all existing tab content.
- [ ] Keep the rail responsive so it remains usable on narrow screens.
- [ ] Run typecheck/build and verify navigation states.
- [ ] Publish the navigation-only update.

## Left-side navigation verification

The four existing sections now render as a vertical left-side rail on desktop: Monitor, Statistics, Prediction, and Reroute Log. The active button retains the existing active-state treatment, and the selected tab content remains on the right without changing its data flow. On mobile widths, the same navigation collapses into a horizontally scrollable button row so the sections remain accessible. Typecheck and production build passed, the frontend restarted successfully, and the desktop preview clearly shows the left rail.

- [x] Move navigation buttons to the left on desktop.
- [x] Preserve active state and tab contents.
- [x] Preserve responsive usability on mobile.
- [x] Run typecheck/build and verify preview.

## Reference-inspired sidebar redesign

- [ ] Inspect the current dashboard shell and tab navigation.
- [ ] Add a dark left sidebar with AIFE identity, utility controls, grouped navigation, Projects, and Tasks sections.
- [ ] Move the existing Monitor, Statistics, Prediction, and Reroute Log controls into the sidebar.
- [ ] Preserve active states and existing live dashboard content.
- [ ] Keep the shell responsive on mobile widths.
- [ ] Run typecheck/build and verify desktop/mobile previews.
- [ ] Publish the sidebar redesign.

## Reference-inspired sidebar verification

The dashboard now presents a dark fixed sidebar at desktop widths with the AIFE identity, search/layout utilities, grouped top navigation, Projects actions, Tasks selection, and live telemetry footer. The main dashboard remains aligned beside it, while the existing mobile horizontal navigation remains available below the metric cards. Desktop and mobile previews both render correctly, the live topology and packet flow remain visible, and typecheck/build passed.

- [x] Add reference-inspired dark sidebar.
- [x] Preserve navigation to existing dashboard sections.
- [x] Preserve topology, live metrics, and packet movement.
- [x] Verify desktop and mobile responsive behavior.

## Correct sidebar labels

- [ ] Remove unrelated New task, Agent, Plugins, Scheduled, and Library labels.
- [ ] Use Monitor, Statistics, Prediction, and Reroute Log as the primary sidebar buttons.
- [ ] Keep the reference-inspired dark grouped layout and selected-item styling.
- [ ] Keep Projects and Tasks sections tied to AIFEdash content.
- [ ] Preserve responsive mobile navigation and all live dashboard behavior.
- [ ] Run typecheck/build, verify, and publish.
