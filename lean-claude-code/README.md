# Lean Claude Code

Two plain text files that make Claude Code write less code and review its own work harder.

Full guide: https://5warm.ai/guides/lean-claude-code/

## What's in it

- **`CLAUDE-lean-starter.md`**: two sections to paste into the `CLAUDE.md` at the root of your repo. The first is the simplicity ladder: before writing code, Claude stops at the first rung that holds (does this need to exist, is it already here, standard library, native feature, installed dependency, one readable line, then the minimum). The second asks for a review before every pull request.
- **`REVIEW.md`**: a template for the house rules your AI reviewer checks the diff against: what failure looks like in your repo, a cap on nits, and a `file:line` for every finding.

## Set it up (about 10 minutes)

1. Paste both sections of `CLAUDE-lean-starter.md` into the `CLAUDE.md` at your repo root. Create the file if you don't have one.
2. Copy `REVIEW.md` to your repo root and change the rules to fit your code.
3. Before you open a pull request, ask Claude Code for a fresh-context subagent review of the diff against both files.
4. Have the reviewer read both files from your base branch, and list them in CODEOWNERS so a rule change needs an owner's approval.

## Where the ideas come from

- The ladder is adapted from [ponytail](https://github.com/DietrichGebert/ponytail) by Dietrich Gebert, used under the MIT licence. Its licence is in `LICENSE-ponytail`.
- The review step follows Anthropic's post "How the Claude Code team does code review" (15 October 2026).
