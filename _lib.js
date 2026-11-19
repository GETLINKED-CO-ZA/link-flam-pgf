// Shared helpers. Files starting with "_" are not exposed as public URLs by Vercel.
const formidable = require('formidable');
const fs = require('fs');

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

async function parse(req) {
  const form = formidable({ maxFileSize: 3 * 1024 * 1024 });
  const [f, files] = await form.parse(req);
  const fields = {};
  for (const k in f) fields[k] = f[k][0];
  return { fields, files };
}

// Dark-and-gold branded email wrapper
function branded(title, bodyHtml) {
  return `<div style="background:#141414;padding:32px 16px;font-family:Arial,Helvetica,sans-serif">
<div style="max-width:560px;margin:0 auto;background:#1c1c1c;border:1px solid #333;border-radius:14px;padding:32px;color:#ffffff">
<div style="font-size:22px;font-weight:700">LINK <span style="color:#e8a923">F.L.A.M</span></div>
<h1 style="font-size:22px;margin:24px 0 12px;color:#ffffff">${esc(title)}</h1>
<div style="font-size:15px;line-height:1.6;color:#d8d2c6">${bodyHtml}</div>
<p style="margin-top:28px;color:#e8a923;font-weight:700">Advance Your World</p>
<p style="font-size:12px;color:#8a8478">LINK PTY LTD · www.getlinked.co.za</p>
</div></div>`;
}

async function sendMail({ to, subject, html, replyTo, attachment }) {
  const body = {
    sender: { name: 'LINK F.L.A.M', email: process.env.SENDER_EMAIL },
    to: [{ email: to }],
    subject,
    htmlContent: html
  };
  if (replyTo) body.replyTo = { email: replyTo };
  if (attachment) body.attachment = [attachment];
  const r = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': process.env.BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error('Brevo ' + r.status + ' ' + await r.text());
}

const row = (k, v) => `<tr><td style="padding:6px 12px 6px 0;color:#e8a923;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;color:#ffffff">${esc(v).replace(/\n/g,'<br>')}</td></tr>`;
const table = rows => `<table style="border-collapse:collapse;font-size:15px">${rows.join('')}</table>`;

module.exports = { parse, branded, sendMail, row, table, esc, fs };
