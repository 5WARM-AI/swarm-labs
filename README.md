# Swarm Labs

Free workflows, templates and tools from [Swarm](https://5warm.ai), the ones we actually run. Each folder has a `README.md` that says what it does and how to set it up.

## What's here

| Folder | What it does | Guide |
|---|---|---|
| [morning-brief](morning-brief/) | n8n workflow. Every weekday morning, Claude reads your Gmail and Google Calendar and emails you a one-page brief with drafted replies. | [Guide](https://5warm.ai/guides/ai-morning-brief/) |
| [lean-claude-code](lean-claude-code/) | Two text files for your repo: a simplicity ladder for `CLAUDE.md` and a `REVIEW.md` template, so Claude Code writes less and reviews harder. | [Guide](https://5warm.ai/guides/lean-claude-code/) |

## How to use an n8n workflow

1. Download the folder's `workflow.json`.
2. In n8n, open a new workflow and choose **Import from file**.
3. Add your own credentials where the workflow asks for them. Every account, ID and key in these files is a placeholder.
4. Follow the folder's README to test it, then switch it to active.

## Want this done for you?

We set these up on your accounts and hand them over running. [Book a call](https://calendar.app.google/6AfUX9o53wDxtQs9A).

## Licence

MIT License

Copyright (c) 2026 Swarm (5warm.ai)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
