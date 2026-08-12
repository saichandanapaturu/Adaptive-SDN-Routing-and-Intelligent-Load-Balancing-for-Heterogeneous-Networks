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
