# Product claims verification index

- **Scope:** Resolve how the public project overview should describe capabilities that the current code does not yet implement.
- **Keywords:** README, capability claims, implementation status, CLI, generators, plugins, project file
- **Status:** horizon: idea
- **Updated:** 2026-10-29
- **Sources:** `../../../README.md`; `../../../README.json`; `../../../packages/cli/src/commands/generate.ts:14-26`; `../../../packages/cli/src/commands/init.ts:9-11`; `../../../packages/core/src/engine/structogen-engine.ts:15-16`; `../../../packages/core/src/plugin-system/plugin-discovery.ts:5-12`; `../../../packages/desktop/electron/plugin-manager.ts:6-12`; built-in generator sources under `../../../packages/generators/`


## What and why

During the Phase 1 inventory, the root `README.md` and tracked `README.json` were found to present project workflow, generation, plugin, and preview capabilities as available. At the Phase 1 inventory baseline (`4b143a7`), the CLI `generate` and `init` commands only log options, the core generation pipeline is a placeholder, plugin discovery/loading contains TODOs, built-in generators emit TODO content, and frontend application state is a placeholder. The README's present-tense capability claims appear at `../../../README.md:33-45`, `../../../README.md:74-78`, `../../../README.md:87-95`, `../../../README.md:127-161`, and `../../../README.md:164-197`; `README.json` repeats the same component claims. The overview files were left unchanged.

This topic records the discrepancy, not an implementation plan. The unresolved question is whether the overview is intended as a description of current capabilities or as an unlabeled target vision, and what documentation-only correction (if any) the owner wants.

## Origin and start conditions

- **Origin:** Found in the read-only documentation-lifecycle inventory on 2026-10-29; it was not deferred from an earlier lore or forge topic.
- **Owner authorization:** The owner approved adding this topic on 2026-10-29 (“Include the horizon topic”); this is bootstrap approval, not a work-transition sign-off.
- **Constraints:** Do not edit `README.md`, `README.json`, or source as part of this bootstrap. This topic does not authorize implementation of the listed features.
- **Needed to start:** The owner must decide whether these descriptions are current-product claims or future intent, then separately authorize any documentation change. Feature implementation requires its own explicit scope and authorization.

## Reading guide

Read the cited README passages and code anchors first. Verify each claim against the current tree before proposing any correction; do not assume all listed product vision is intended as a near-term workstream.
