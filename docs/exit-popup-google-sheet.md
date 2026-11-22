# Exit popup → Google Sheet (setup, about 5 minutes)

Each signup from the exit popup becomes a row in a Google Sheet, and the same
script emails the person The Renter's ESA Kit (PDF) from your Google account.
Until this is set up the popup still works: people can open the PDF straight
away, and the email copy is simply skipped.

## 1. Create the sheet

1. Create a Google Sheet, for example "My ESA Therapist: Renter's Kit signups".
2. Rename the first tab to `Signups`.
3. Row 1 headers: `Date` · `Email` · `Wants updates` · `Page` · `Source` · `Emailed`

## 2. Add the script

1. In the sheet: **Extensions → Apps Script**.
2. Replace everything with the script below.
3. Change `SECRET` to a long random string. Keep it; it also goes into Vercel.
4. Save.

```javascript
const SECRET = "CHANGE-ME-to-a-long-random-string";
const PDF_URL = "https://myesatherapist.com/downloads/renters-esa-kit-2026.pdf";
const FROM_NAME = "My ESA Therapist";
const REPLY_TO = "info@myesatherapist.com";

function doPost(e) {
  const data = JSON.parse(e.postData.contents || "{}");
  if (data.secret !== SECRET) return out({ ok: false, error: "forbidden" });
  const email = String(data.email || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return out({ ok: false, error: "email" });

  const sheet = SpreadsheetApp.getActive().getSheetByName("Signups");
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    let emailed = "yes";
    try {
      MailApp.sendEmail({
        to: email,
        name: FROM_NAME,
        replyTo: REPLY_TO,
        subject: "Your Renter's ESA Kit (2026 edition)",
        htmlBody:
          "<p>Hi,</p>" +
          "<p>Here is your free <b>Renter's ESA Kit</b>: what HUD changed in May 2026, the seven marks of a landlord-ready ESA letter, " +
          "a fill-in request message for your landlord, calm answers to common landlord questions, and a request tracker.</p>" +
          '<p><a href="' + PDF_URL + '" style="display:inline-block;background:#1A3D4F;color:#ffffff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:bold">Open the kit (PDF)</a></p>' +
          '<p>When you are ready, you can check if you qualify for free at <a href="https://myesatherapist.com/">myesatherapist.com</a>, ' +
          "or call us at +1 (888) 412-4041.</p>" +
          "<p>My ESA Therapist</p>" +
          '<p style="color:#888;font-size:12px">You received this because you asked for the kit on myesatherapist.com. ' +
          'Reply "unsubscribe" and we will remove you. This kit is general information, not legal or medical advice.</p>',
      });
    } catch (err) {
      emailed = "failed: " + err;
    }
    sheet.appendRow([new Date(), email, data.updates ? "yes" : "no", data.page || "", data.source || "", emailed]);
  } finally {
    lock.releaseLock();
  }
  return out({ ok: true });
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Publish it

1. **Deploy → New deployment → Web app**.
2. Execute as: **Me**. Who has access: **Anyone**.
3. Deploy and approve the permissions (Sheets, and send email as you).
4. Copy the **Web app URL** (ends in `/exec`).

## 4. Connect it to the site

Vercel → project **myesatherapist** → Settings → Environment Variables (Production):

| Name | Value |
|---|---|
| `SHEET_WEBHOOK_URL` | the Web app URL from step 3 |
| `SHEET_WEBHOOK_SECRET` | the same secret as in the script |

Redeploy. Then test with `https://myesatherapist.com/#exit-preview`: submit your
own email, and check that a row appears and the email arrives.

## Tracking (GTM)

The popup pushes these `dataLayer` events:

| Event | When |
|---|---|
| `exit_popup_view` | The popup opens (`trigger`: `mouse_exit` or `scroll_up`) |
| `generate_lead` | Email submitted (`lead_source: exit_popup`, `lead_magnet: renters_esa_kit_2026`) |
| `file_download` | "Open the kit" clicked |
| `exit_popup_eligibility` | "Check if you qualify" clicked |

## Rules

- Shown at most once every 10 days per browser, never again after a signup.
- Not shown on policy pages or Contact, or while another dialog or the phone menu is open.
- Desktop: when the pointer leaves through the top of the window, after 10 seconds on the page.
- Phones: on a fast scroll back up after reading half the page.
- Only the email is collected. Do not add health questions to this form.

## Updating the PDF

Source: `docs/renters-esa-kit/kit.html`. Edit the HTML, then render with
Chromium (Playwright `page.pdf`, Letter size, print backgrounds) to
`public/downloads/renters-esa-kit-2026.pdf`, and re-export the cover and page
thumbnails used by the popup (`renters-esa-kit-2026-cover.webp`, `-p4.webp`, `-p5.webp`).
