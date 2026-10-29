# Documentation

This tree holds Structogen's settled facts: normative requirements and accepted decisions, plus descriptive facts verified against the current implementation. It is not a status, plan, proposal, or open-question area.

## Map and reading order

Tiers are listed in authority order. Create a tier directory and its `00-<slug>-index.md` only when it has content; do not create empty tier stubs. These are the available tiers:

| Tier | Holds | State |
| --- | --- | --- |
| `01-ground-truth/` | The domain rules or external specification Structogen implements, if any. | Use only if an authoritative external specification exists. |
| `02-requirements/` | What the software must do. | Planned; create when there are settled requirements to record. |
| `03-architecture/` | How the software is built. | Planned; create when there are verified architecture facts. |
| `04-development/` | How code is written, built, run, and released. | Planned; create when there is settled developer guidance. |
| `05-testing/` | How correctness is shown. | Planned; create when there is verified test guidance. |
| `06-user-guide/` | How the product is used. | Planned; create when user-facing workflows are implemented and verified. |
| `07-decisions/` | Accepted decisions with permanent IDs. | Planned; create when accepted decision records exist. |

A higher tier governs a lower one, and a lower tier never changes a higher tier's meaning. A glossary, if needed, is a numbered entry at this tree's root in its reading order.

## Documentation conventions

### Boundary and authority

- Normative facts include requirements, rules, accepted decisions, and conventions; they remain settled even if implementation is incomplete. Descriptive facts state what code, tests, tooling, and the product do now.
- Keep status, progress, plans, to-do lists, proposals, open questions, and deploy records out of this facts tree. Implementation status for a normative fact belongs in the separate work-lifecycle records; the requirement itself stays here.
- A proposed decision is not settled. Add it here only after owner acceptance. Never infer a normative fact from code when an authoritative document exists. If code and an authoritative document disagree, record the conflict in the work-lifecycle records and do not change either side as part of a documentation migration.
- A claim enters this tree only after verification against current code, tests, or an owner ruling. Record claims that cannot yet be verified as “to verify” in the work-lifecycle records.
- Links point inward: facts may link to other fact files, but not to lifecycle records whose paths or status can change.

### Names, order, and hierarchy

- Use lowercase-hyphen names with a two-digit prefix: `NN-topic-slug.md` or `NN-topic-slug/`. The slug names the topic, not only the role. Root `README.md` files and root agent-instruction files keep their conventional names.
- Numbers are local to each directory, shared by files and folders, and express suggested reading order (dependencies first, then importance), never chronology. Allocate with gaps; `00` is reserved for an index and `99` for an evidence appendix. Do not encode a parent's number into a child's prefix.
- Within each tree, a name minus its number is unique. Use no version, status, or date suffixes. A file promoted to a folder keeps its number and slug; its children start a fresh sequence.
- Every subfolder has `00-<folder-slug>-index.md`. An index states the folder's scope, gives a reading guide, and lists each child with a link, the question it answers, and status where relevant. Keep indexes to summaries; do not duplicate substantive content.

### Headers and retrieval

- Every Markdown file except a tree-root entry file starts with an H1 topic title, then `Scope`, `Keywords`, `Status`, `Updated` (ISO date), and `Sources`. Use `Status: docs: current` for current facts; the lifecycle literals are `lore`, `forge: active|paused|blocked`, and `horizon: deferred|idea`. Omit a field only when it genuinely does not apply.
- `Sign-off` is required on every forge topic index and on a lore or horizon topic index created by a lifecycle transition. It is omitted from generic tier indexes and from topic indexes not created by a transition.
- One file answers one question. Use headings with the disambiguating nouns, define terms once, and cross-link rather than duplicate. Use relative links that resolve from the file containing them. Cite code as `path:line` or `path` plus symbol, and re-check anchors when cited files change.

### Evidence, helpers, and generated files

- Keep evidence only while a live statement cites it. Place it in the owning topic's `99-<topic-slug>-evidence/` appendix, with `00-<topic-slug>-evidence-index.md` describing every file, the statement it supports, and how it was produced. Evidence files are descriptive lowercase-hyphen names and are exempt from reading-order numbering.
- Do not put runnable code, generated files, sidecars, or caches in either documentation tree. Reusable helpers belong in the project's tooling location and are cited by path and command; delete throwaway helpers once their output is captured. Exclude engine/framework caches using that tool's mechanism and ignore sidecars in version control.

### Split, group, and collapse defaults

- Split a file when it answers multiple separable questions, mixes statement kinds, or exceeds about 300 lines (unless its index records why no split seam exists).
- Promote a file to a folder when a split yields at least three related subtopics or the parts need their own evidence. Group related siblings when a folder has more than about 12 numbered entries, excluding `00` and `99`.
- Collapse a folder with at most one content file besides its index; merge files that must always be read together and total under about 150 lines; delete empty files/folders and update the parent index.
- A folder normally needs at least two content children. Case A's three required lifecycle tier folders are the explicit exception: keep each required folder and index even while empty; do not fabricate topics to satisfy the threshold. A required horizon topic folder may contain only its required index, and a horizon tier may contain a single owner-approved topic; keep these prompt-required structures rather than inventing placeholder work. Documentation tier folders remain content-driven as described above.
