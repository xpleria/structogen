# `.ref` collaboration area

`.ref/` is a private, git-ignored exchange area for the project owner and AI agents to share working files, results, and assets. **Only this root `README.md` is intended to be tracked.** Do not add handoff contents to commits.

## Organizing shared files

- Put each related handoff in its own descriptive, lowercase-hyphenated folder.
- Add an ignored `README.md` inside every handoff folder. It must explain the files, their purpose, how long they are needed, and the condition for deletion.
- Keep files together with their handoff README; avoid loose files at the `.ref/` root.
- Preserve useful source files; never put secrets or credentials here.
- Read the handoff README before using or deleting its files. A prompt or proposal is reference material, not authorization to execute it.

## Current handoffs

- `docs-lifecycle/` (inside `.ref/`) — reusable lifecycle prompt and Structogen's approved bootstrap record. Phase 3 completed under the owner's approval; the record contains Phase 0–4 findings. The prompt is guidance, not standalone authorization for future migrations or feature work.
