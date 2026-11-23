const { parse, branded, sendMail, row, table } = require('./_lib');

// Turns 2026-11-28 into "Saturday, 28 November 2026"
const niceDate = d => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d || '')) return '-';
  const x = new Date(d + 'T12:00:00Z');
  if (isNaN(x)) return d;
  try { return x.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }); }
  catch (e) { return d; }
};
const niceTime = t => (/^\d{2}:\d{2}$/.test(t || '') ? t + ' (South African time)' : '-');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { fields: f } = await parse(req);
    // Spam trap: real people never fill this hidden field
    if (f.website) return res.status(200).json({ ok: true });
    if (!f.name || !f.email || !f.phone || !f.brief || !f.freelancer_name) return res.status(400).json({ error: 'Missing fields' });

    const details = table([
      row('Freelancer', `${f.freelancer_name} (${f.freelancer_industry})`),
      row('Freelancer ID', f.freelancer_id),
      row('Seeker', f.name), row('Company', f.company || '-'),
      row('Email', f.email), row('Phone', f.phone),
      row('Preferred date', niceDate(f.date)),
      row('Preferred time', niceTime(f.time)),
      row('Project brief', f.brief),
      row('Privacy consent', f.consent ? 'Yes' : 'No')
    ]);

    // 1. To LINK
    await sendMail({
      to: process.env.LINK_EMAIL,
      replyTo: f.email,
      subject: `New booking request: ${f.freelancer_name}`,
      html: branded('New booking request', details + '<p>Next: confirm the freelancer is available, then connect them.</p>')
    });
    // 2. Branded copy to the Seeker
    await sendMail({
      to: f.email,
      subject: 'We received your LINK F.L.A.M booking request',
      html: branded(`Thanks, ${f.name.split(' ')[0]}`,
        `<p>We have your request for <b style="color:#ffffff">${f.freelancer_name}</b>. LINK will confirm their availability and then connect you both.</p>${details}`)
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Could not send' });
  }
};
module.exports.config = { api: { bodyParser: false } };
