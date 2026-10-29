## Documentation and work tracking

<!-- Summary of the documentation convention. Full rules: docs/README.md
     ("Documentation conventions") and agent-docs/README.md. Update this section in
     place; never duplicate it. No verbatim copies. Private handoffs: read `.ref/README.md`
     and each handoff-folder README before use or deletion; only `.ref/README.md` is tracked. -->

Two trees, one boundary:

- **`docs/` holds settled facts.** Normative facts: rules, requirements, accepted
  decisions. Descriptive facts: what the code, tests and tooling do now. It never holds
  status, plans, proposals or open questions. Tiers, in authority order (planned; a tier
  folder exists only once it has content): `01-ground-truth/` (if any), `02-requirements/`,
  `03-architecture/`, `04-development/`, `05-testing/`, `06-user-guide/`,
  `07-decisions/`. A higher tier governs a lower one.
- **`agent-docs/` holds the work lifecycle.**
  - `01-lore/`: lessons, rationale and pitfalls. It is living: obsolete statements are
    replaced and dead ones deleted.
  - `02-forge/`: active work, one topic per workstream. Status lives only in the
    topic's progress file.
  - `03-horizon/`: future work.

Before a task:

1. Read `docs/README.md`, then the tier files the task touches.
2. Check `agent-docs/02-forge/00-forge-index.md` for an active topic covering the
   task. If one exists, continue it; never start a parallel one.
3. Check `agent-docs/01-lore/00-lore-index.md` for lessons in the subject area.

During and after a task:

- A behaviour change updates the matching `docs/` fact in the same change.
- Work on a forge topic updates its progress file in the same session.
- Topics move only as a consequence of the owner's sign-off on the work:
  - commencement → the topic moves into `02-forge/`;
  - acceptance → facts go to `docs/`, lessons to `01-lore/`, any deferred remainder to
    `03-horizon/`, and the forge topic is deleted;
  - deferral → `03-horizon/`;
  - cancellation → lessons go to `01-lore/`, the rest is shed.

  Record the sign-off in the topic index. Passing tests and your own judgement are not
  acceptance.

Naming in both trees:

- `NN-topic-slug.md` or `NN-topic-slug/`; within each directory, numbers are the
  reading order.
- Every subfolder has `00-<slug>-index.md`. Evidence goes in a `99-<slug>-evidence/`
  appendix.
- The slug names the topic (never a bare `plan.md`). No version or date suffixes.
- Every file opens with the Scope / Keywords / Status / Updated / Sources header.
- Neither tree holds runnable code or generated files.
