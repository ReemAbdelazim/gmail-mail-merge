# Gmail Mail Merge

Send **individual, personalized emails**, each with its own private link, from **your own Gmail account**, using a CSV.

**Use it here → https://reemabdelazim.github.io/gmail-mail-merge/**

Built for things like event access links, personal sign-up links, or anything else where every recipient needs a different URL. Each person gets their own email: no group sends, no BCC, so links never leak to other recipients.

## Features

- **Sign in with Google.** Mail is sent from your own Gmail or Google Workspace account via the Gmail API.
- **Import any CSV** and match its columns to First name, Last name, Email and Personal link (auto-detected where possible).
- **Template with merge fields.** Use `{{FirstName}}`, `{{LastName}}`, `{{Email}}`, `{{Link}}`, `{{SenderName}}`, or **any CSV column** like `{{Company}}`.
- **`{{Button}}`** renders a styled call-to-action button with that person's own link. Button text, colour and an optional header are configurable.
- **Live preview** of every recipient's email before sending.
- **Safety checks:** invalid or duplicate emails, missing links, links that don't match an expected prefix, and test addresses (`.test`, `example.com`) are flagged and skipped.
- **Send a test to yourself first**, then a bulk send behind a typed `SEND` confirmation.
- Sends about 1 email per second with automatic retry. You can stop at any time and re-run to retry only failed or unsent rows.
- **Downloadable send log** (without links).

## Privacy & security

- **Runs 100% in your browser.** There's no backend. Your CSV and emails only ever go to Google's Gmail API.
- The CSV is held in memory only and is never uploaded or saved. Close the tab and it's gone.
- Only the `gmail.send` scope is requested: the page **cannot read your inbox**.
- Only harmless settings (Client ID, subject, template, button style) are remembered in your browser's local storage.
- If your links log people in, treat the CSV as a password file.

## Setup (one time, about 5 minutes, free)

You use **your own** Google OAuth Client ID, so nobody else's app is ever involved.

1. Go to [Google Cloud Console](https://console.cloud.google.com/) and create a project (e.g. "My Mail Merge").
2. **APIs & Services → Library →** enable **Gmail API**.
3. **APIs & Services → OAuth consent screen →** External → enter an app name and your email → add your Gmail address under **Test users**.
4. **Credentials → Create credentials → OAuth client ID →** Application type **Web application**.
5. Under **Authorized JavaScript origins** add:
   - `https://reemabdelazim.github.io` (to use the hosted version), and/or
   - `http://localhost:5173` (to run it locally)
6. Create, then paste the Client ID into the tool.

When you sign in, Google will say *"Google hasn't verified this app"*. That's expected, because it's your own private app. Click **Continue**.

## Run locally (optional)

```bash
git clone https://github.com/ReemAbdelazim/gmail-mail-merge.git
cd gmail-mail-merge
node serve.mjs
# open http://localhost:5173
```

Requires Node 18+. No dependencies.

## CSV format

Any column names work. You match them in the tool. See [`example.csv`](example.csv):

```csv
First name,Last name,Email,Company,Personal link
Ada,Lovelace,ada@example.com,Analytical Engines,https://example.com/invite?t=abc123
```

## Sending limits

Gmail allows roughly **500 emails/day** on personal accounts and **2,000/day** on Google Workspace. If you hit the limit, the tool stops and you can send the rest the next day. Already-sent rows are skipped while the tab stays open.

## License

[MIT](LICENSE)
