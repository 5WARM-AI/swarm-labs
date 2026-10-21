# AI morning brief

Every weekday morning, this n8n workflow reads your Gmail since the last brief it sent and today's Google Calendar. Claude writes a one-page brief, and n8n emails it to you before you start work.

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
2. **Connect Google.** Open **Who am I**, choose **Create new credential** for Gmail and sign in with Google. Pick that same Gmail credential in **Find recent emails**, **Recent emails** and **Email me the brief**. Then open **Today's calendar**, create a Google Calendar credential and sign in again. On n8n Cloud this is one click each. Self-hosted n8n first needs a Google OAuth client; n8n's Google credentials docs walk through it.
3. **Paste your Claude API key.** Open **Claude**, create an Anthropic credential and paste the key. It's set to Claude Sonnet 5.5 (`claude-sonnet-5-5`).
   **Using OpenRouter instead?** Delete the **Claude** node, add an **OpenRouter Chat Model** and connect it to **Write the brief**. Create an OpenRouter credential with your key, pick a model such as `anthropic/claude-sonnet-5.5`, and set Maximum Number of Tokens to 4000 so the brief has room to finish.
4. **Add your name.** Open **Your settings** and put in your first name. The brief goes to the Gmail account you signed in with, so leave `your_email` empty. To send it somewhere else, put that address in `your_email` and switch on `allow_other_recipient`. If `your_email` differs from your Gmail account and the switch is off, the workflow stops with an error, so a typo can't send your inbox summary to a stranger.
5. **Set the send time.** Open **Every weekday morning** and pick the days and hour. Then open the workflow settings and set your timezone, so "today" and the send time match your day.
6. **Test it.** Click **Execute workflow** and check your inbox for "Your morning brief".
7. **Turn it on.** Switch the workflow to active.

## How it works

`Every weekday morning` → `Your settings` → `Who am I` (your Gmail address) → `Work out the window` (Code: picks the recipient and the start time) → `Find recent emails` (Gmail search: inbox since the last brief, your own mail skipped, up to 21) → `One item per email` (Code) → `Any new emails?` → `Recent emails` (each email's text, fetched from the Gmail API) → `Today's calendar` → `Pack emails and meetings` (Code) → `Write the brief` (Claude) → `Turn brief into email` (Code) → `Email me the brief` (Gmail) → `Remember this brief` (Code: saves where this run stopped).

**Which emails it reads.** Each scheduled run starts where the last brief it sent stopped, so a missed day, a failed run or a custom schedule leaves no gap. The first run, and any manual test run, reads the last 3 days on a Monday and the last day otherwise. It never reads more than 7 days back. If more than 20 emails arrived, the brief says so at the top so you can check your inbox for the rest. If Gmail can't return one of the emails, the workflow carries on without it, and the brief says at the top how many couldn't be read. The next brief then starts from the same point as this one, so those emails are read again.

To change what the brief covers, edit the prompt in **Write the brief**. To show more or fewer emails, change `SHOW` in **Pack emails and meetings** and set `maxResults` in **Find recent emails** to one more than `SHOW` (the extra one is how the workflow spots overflow). To change which emails count, edit the `q` search in **Find recent emails**. The workflow reads at most the first 20,000 characters of each email body (starting at the HTML `<body>` when there is one) and the first 500 characters of each sender, subject and invite field, so a huge email can't stall the clean-up step. The AI sees the first 1,500 characters of each email's new text (quoted history is dropped); change `BODY_CAP` in **Pack emails and meetings** to adjust it. Twenty emails at that length is about 8,000 tokens a day. Emails are fetched in Gmail's `full` format, where attachments arrive as ids only, so a large PDF never passes through n8n.

## Your data

The workflow reads your email and calendar and sends them to the AI provider you connect: Anthropic, or OpenRouter, which passes them on to the model provider you pick. Nothing is sent to Swarm. The workflow is set not to save successful scheduled runs or any manual test run in n8n's execution log, so your email text isn't stored there. Scheduled runs that fail are still saved, so you can see what went wrong, and they can include the email text that run read.

## Narrower Google access (self-hosted n8n)

n8n's built-in Gmail credential asks Google for full access to your mailbox (`https://mail.google.com/`, plus modify and compose), and the Google Calendar credential asks for full calendar access. Neither lets you change that. The workflow only needs to read mail, send one email and read today's calendar, so on self-hosted n8n you can narrow it with your own Google OAuth client:

- **Reading mail:** **Who am I**, **Find recent emails** and **Recent emails** are plain HTTP requests to the Gmail API. Switch each one to a generic OAuth2 credential for Google with the scope `https://www.googleapis.com/auth/gmail.readonly`.
- **Sending:** replace **Email me the brief** with an HTTP request to Gmail's `messages/send` endpoint, using a credential with only `https://www.googleapis.com/auth/gmail.send`.
- **Calendar:** replace **Today's calendar** with an HTTP request to the Calendar API's `events` list, using a credential with only `https://www.googleapis.com/auth/calendar.readonly`.

On n8n Cloud, the one-click Google sign-in uses the built-in credentials and can't be narrowed. We build and test the workflow with the built-in credentials.

## Email text is treated as data

Anyone can email you, so the workflow treats every email and invite as untrusted:

- Each one goes to the AI inside tags whose name changes on every run (`untrusted_email_` plus a random code), so an email can't guess the tag and fake its end. The words `untrusted_email` and `untrusted_event` are removed from the email text, and `<` `>` are swapped out. The instructions sit in a separate system message that says text inside the tags must never be obeyed.
- Every link, bare web address (including non-Latin and `xn--` domains), IP address and `mailto:` is replaced with `[link: domain[.]com]` before the AI sees it. A link with a `user@` part, which can hide the real site, becomes `[link: suspicious]`. In HTML-only emails the real address behind each link is checked, not just the link text. File names like `report.pdf` are left alone.
- Before the brief is emailed, any link the AI wrote is removed, and any domain name or IP address left has its dots broken (`example[.]com`), so mail apps can't turn it into a clickable link.
- The AI is told to use only the email each draft answers; check drafts for codes or details from other emails before sending.
- An email that gives the AI instructions, or pushes an urgent payment or login, is listed under **Urgent** as suspicious, with no draft reply.

Still read each draft before you send it.

## Tests

`node tests/run.js` runs the workflow's own Code nodes against test emails: fake and look-alike closing tags, braces, every kind of link (including `user@` links, `xn--` and non-Latin domains and IP addresses), file names, HTML-only and attachment emails, timed meetings, the Monday and Tuesday windows, the 20-email cap, an empty inbox, very large hostile HTML emails, long style blocks, over-long headers, emails Gmail couldn't return (including where the next brief starts) and the recipient rules. It also checks the Gmail calls, that a failed fetch doesn't stop the run, that successful and manual runs aren't saved, and that every credential is a placeholder. It exits with an error if any check fails.

## Want this done for you?

[Book a call](https://calendar.app.google/6AfUX9o53wDxtQs9A) and we'll set it up on your accounts.
