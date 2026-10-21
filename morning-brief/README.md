# AI morning brief

Every weekday morning, this n8n workflow reads the last day of your Gmail and today's Google Calendar. Claude writes a one-page brief, and n8n emails it to you before you start work.

Full guide: https://5warm.ai/guides/ai-morning-brief/

## What's in the brief

- **Urgent:** anything that needs action today.
- **Today's meetings:** time, title, who's coming, and one thing to prepare.
- **Emails to reply to:** who wrote and what they want, with a short draft reply for each. Newsletters, receipts, alerts and marketing are left out.

## You need

- n8n, cloud or self-hosted. We built and tested it on n8n 2.26.
- A Google account with Gmail and Google Calendar.
- A Claude API key from the [Anthropic Console](https://console.anthropic.com/), or an [OpenRouter](https://openrouter.ai/) key if you'd rather use that. Both bill API use separately from a Claude.ai subscription.

## Set it up (about 30 minutes)

1. **Import the workflow.** In n8n, open a new workflow, choose **Import from file** and pick `workflow.json`.
2. **Connect Google.** Open **Recent emails**, create a Gmail credential and sign in with Google. Pick that same credential in **Email me the brief**. Then open **Today's calendar**, create a Google Calendar credential and sign in again. On n8n Cloud this is one click each. Self-hosted n8n first needs a Google OAuth client; n8n's Google credentials docs walk through it.
3. **Paste your Claude API key.** Open **Claude**, create an Anthropic credential and paste the key. It's set to Claude Sonnet 5.5 (`claude-sonnet-5-5`).
   **Using OpenRouter instead?** Delete the **Claude** node, add an **OpenRouter Chat Model** and connect it to **Write the brief**. Create an OpenRouter credential with your key, pick a model such as `anthropic/claude-sonnet-5.5`, and set Maximum Number of Tokens to 4000 so the brief has room to finish.
4. **Add your details.** Open **Your settings** and put in the email address the brief should go to and your first name.
5. **Set the send time.** Open **Every weekday morning** and pick the days and hour. Then open the workflow settings and set your timezone, so "today" and the send time match your day.
6. **Test it.** Click **Execute workflow** and check your inbox for "Your morning brief".
7. **Turn it on.** Switch the workflow to active.

## How it works

`Every weekday morning` → `Your settings` → `Recent emails` (Gmail, last day, inbox only) → `Today's calendar` → `Pack emails and meetings` (Code) → `Write the brief` (Claude) → `Turn brief into email` (Code) → `Email me the brief` (Gmail).

To change what the brief covers, edit the prompt in **Write the brief**. To read more or fewer emails, change the limit or the search in **Recent emails**.

## Your data

The workflow reads your email and calendar, and sends them to Anthropic's API to write the brief. Nothing goes anywhere else. n8n keeps each run's data in its execution log unless you turn that off in the workflow settings.

## Want this done for you?

[Book a call](https://calendar.app.google/6AfUX9o53wDxtQs9A) and we'll set it up on your accounts.
