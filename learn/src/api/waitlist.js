// Waitlist submission — posts to the same Google Apps Script backend used by
// the Velox landing page (see ../../../apps-script/SETUP.md). The Apps Script
// records a `Source` column, so DriveAruba signups are tagged distinctly and
// can share one sheet with other sources if desired.
//
// To go live, set the deployed Web App URL one of two ways:
//   1. Edit WAITLIST_URL below, OR
//   2. Define VITE_WAITLIST_URL at build time (e.g. in CI or a .env file).
// Until then the form runs in DEMO MODE (no network call, success simulated).

const WAITLIST_URL = 'YOUR_APPS_SCRIPT_URL';

const CONFIGURED_URL = import.meta.env.VITE_WAITLIST_URL || WAITLIST_URL;

export const isDemoMode = CONFIGURED_URL === 'YOUR_APPS_SCRIPT_URL';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Submit an email to the waitlist.
 * @param {string} email
 * @returns {Promise<{ ok: true, demo?: boolean }>}
 * @throws {Error} on a server-side or network failure
 */
export async function joinWaitlist(email) {
  if (isDemoMode) {
    await delay(700);
    return { ok: true, demo: true };
  }

  // text/plain avoids a CORS preflight that Apps Script web apps can't answer.
  const res = await fetch(CONFIGURED_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ email, source: 'drivearuba-landing' }),
  });

  const out = await res.json();
  if (out.result === 'success') return { ok: true };
  throw new Error(out.message || 'server error');
}
