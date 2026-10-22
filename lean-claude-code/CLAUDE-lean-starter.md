<!-- Lean Claude Code starter, from 5warm.ai/guides/lean-claude-code/
     Paste these two sections into the CLAUDE.md at the root of your repo.
     The ladder is adapted from ponytail by Dietrich Gebert (MIT licence), github.com/DietrichGebert/ponytail.
     The review step follows "How the Claude Code team does code review" (Anthropic, 15 October 2026). -->

## Simplicity ladder: walk before you write
After you understand the problem (read the code the change touches first, and never skimp on reading),
stop at the first rung that holds before writing any code:
1. Does this need to exist at all? If not, skip it.
2. Is it already in this codebase? Reuse it instead of rewriting it.
3. Does the standard library do it? Use it.
4. Is it a native platform feature? Use it.
5. Is it an already-installed dependency? Use it.
6. Can it be one readable line? Write one readable line. Readable beats clever.
7. Only then: write the minimum that actually works.

Never cut trust-boundary validation, error and data-loss handling, security or accessibility to reach a lower rung.
Be lazy about the solution and careful about everything else.

## Review before every pull request
- Run the checks you can (tests, build, lint) and show the output.
- Then have a subagent with fresh context review the diff against this file and REVIEW.md, and show its summary.
- Fix or answer every finding before you open the pull request.
