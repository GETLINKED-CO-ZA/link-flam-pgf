const { parse, branded, sendMail, row, table, fs } = require('./_lib');

const handler = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { fields: f, files } = await parse(req);
    // Spam trap: real people never fill this hidden field
    if (f.website) return res.status(200).json({ ok: true });
    if (!f.full_name || !f.email || !f.display_name) return res.status(400).json({ error: 'Missing fields' });

    const photo = files.photo && files.photo[0];
    const doc = files.portfolio_file && files.portfolio_file[0];
    const hasPhoto = photo && photo.size > 0;
    const hasDoc = doc && doc.size > 0;   // an empty file box counts as "no document"
    if (hasDoc && !/\.(pdf|docx?|pptx?|jpe?g|png)$/i.test(doc.originalFilename || '')) {
      return res.status(400).json({ error: 'File type not allowed' });
    }
    const link = /^https?:\/\//i.test(f.portfolio_url || '') ? f.portfolio_url : '';

    const details = table([
      row('PRIVATE', ''), row('Full name', f.full_name), row('Phone', f.phone),
      row('Email', f.email), row('Rates', f.rates),
      row('PORTFOLIO', ''), row('Link', link || '-'),
      row('Document', hasDoc ? `${doc.originalFilename} (attached)` : '-'),
      row('PUBLIC', ''), row('Display name', f.display_name), row('Industry', f.industry),
      row('Description', f.bio), row('Location', f.location), row('Work style', f.remote),
      row('Privacy consent', f.consent ? 'Yes' : 'No')
    ]);

    const attachments = [];
    if (hasPhoto) attachments.push({ name: photo.originalFilename || 'photo.jpg', content: fs.readFileSync(photo.filepath).toString('base64') });
    if (hasDoc) attachments.push({ name: doc.originalFilename || 'portfolio.pdf', content: fs.readFileSync(doc.filepath).toString('base64') });

    // 1. To LINK, with the photo (and portfolio document) attached
    await sendMail({
      to: process.env.LINK_EMAIL,
      replyTo: f.email,
      subject: `New freelancer application: ${f.display_name}`,
      html: branded('New freelancer application', details),
      attachment: attachments.length ? attachments : undefined
    });
    // 2. Branded confirmation to the freelancer
    await sendMail({
      to: f.email,
      subject: 'Your LINK F.L.A.M application is in review',
      html: branded(`Thanks, ${f.full_name.split(' ')[0]}`,
        '<p>We have received your application. The LINK F.L.A.M team is reviewing your profile and will be in touch soon.</p><p>Remember: you keep 100% of your quoted rate.</p>')
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Could not send' });
  }
};
module.exports = handler;
module.exports.config = { api: { bodyParser: false } };
