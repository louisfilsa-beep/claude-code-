# Waitlist setup — Google Sheets backend

This wires the landing-page waitlist form to a Google Sheet you own. Free, no
third-party form service, no submission limits beyond Google's normal quotas.

## One-time setup (~5 minutes)

1. **Create the sheet.** Go to <https://sheets.new> and name it e.g. `Velox Waitlist`.

2. **Open the script editor.** In that sheet: **Extensions → Apps Script**.
   (Creating it from the sheet is important — it binds the script to this sheet
   so it can write rows.)

3. **Paste the code.** Delete the default `function myFunction() {}`, then paste
   the entire contents of [`Code.gs`](./Code.gs). Click the **Save** icon.

4. **Deploy as a Web App.**
   - Click **Deploy → New deployment**.
   - Click the gear ⚙ next to "Select type" → choose **Web app**.
   - Set:
     - **Execute as:** `Me`
     - **Who has access:** `Anyone`
   - Click **Deploy**, then **Authorize access** and approve the permissions
     (you may need to click "Advanced → Go to … (unsafe)" — that's normal for
     your own scripts).

5. **Copy the Web App URL.** It ends in `/exec`. Open it in a browser to
   confirm — you should see `{"result":"ok","message":"Velox AI waitlist endpoint is live"}`.

6. **Plug it into the site.** In [`../index.html`](../index.html), find:
   ```js
   const SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL';
   ```
   Replace `YOUR_APPS_SCRIPT_URL` with the `/exec` URL, then commit & push.
   GitHub Pages will redeploy automatically.

7. **Test it.** Open the live site, submit your email, and watch a new row
   appear in the sheet (with a timestamp).

## Updating the script later

If you edit `Code.gs`, redeploy a new version:
**Deploy → Manage deployments → ✏️ edit → Version: New version → Deploy.**
The URL stays the same.

## What gets stored

| Timestamp | Email | Source |
|-----------|-------|--------|
| 2026-06-16T17:40:00Z | you@company.com | velox-landing |

Duplicate emails are ignored automatically.
