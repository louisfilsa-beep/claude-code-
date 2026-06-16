/**
 * Velox AI — Waitlist backend (Google Apps Script)
 *
 * Receives waitlist signups from the landing page and appends them to the
 * bound Google Sheet. Deploy as a Web App. See SETUP.md for full steps.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Prevent two simultaneous signups from clobbering each other.
    lock.waitLock(10000);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // The landing page sends the body as text/plain JSON to avoid a CORS
    // preflight (which Apps Script web apps cannot answer).
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    var email = (data.email || '').toString().trim().toLowerCase();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ result: 'error', message: 'Invalid email' });
    }

    // Make sure a header row exists.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Email', 'Source']);
    }

    // Skip duplicates.
    var lastRow = sheet.getLastRow();
    if (lastRow >= 2) {
      var existing = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      for (var i = 0; i < existing.length; i++) {
        if (String(existing[i][0]).trim().toLowerCase() === email) {
          return json({ result: 'success', message: 'Already on the list' });
        }
      }
    }

    sheet.appendRow([new Date(), email, (data.source || 'landing-page')]);
    return json({ result: 'success' });
  } catch (err) {
    return json({ result: 'error', message: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

// Visiting the Web App URL in a browser hits this — handy for a quick health check.
function doGet() {
  return json({ result: 'ok', message: 'Velox AI waitlist endpoint is live' });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
