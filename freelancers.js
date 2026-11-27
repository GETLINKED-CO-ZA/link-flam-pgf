// One entry per freelancer folder in GitHub. Add a new object (or folder) to go live.
// photo: paste the Vercel Blob link. rating: 1-5. remote: true = Remote, false = Local / On-site.

const FREELANCERS = [
  {
    id: 'berto-v',
    name: 'Berto v L.',
    industry: 'Health and Safety',
    bio: 'Pr.Chasa. Grad. Saiosh PHD. Ergo Auditor and Accredited Trainer',
    location: 'Mbombela',
    remote: true,
    rating: 5,
    photo: 'images/berto.jpg'
  },
  {
    id: 'sasha-v',
    name: 'Sasha v D.',
    industry: 'Hair Stylist',
    bio: 'Mobile hair stylist, for men, woman, and special occasions.',
    location: 'Nelspruit',
    remote: false,
    rating: 4,
    photo: 'images/sasha.jpg'
  },
    {
    id: 'marindav',
    name: 'Marinda v d B.',
    industry: 'Catering & Sewing',
    bio: 'Savoury platters and homemade favourites for every occasion! From custom cakes and koeksisters to cheesecakes, plus all your sewing needs, from buttons to bespoke outfits.',
    location: 'Nelspruit',
    remote: false,
    rating: 3,
    photo: 'images/marindavdb.jpg'
  },
  {
    id: 'willem-henri',
    name: 'Willem Henri v L.',
    industry: 'Website Creator',
    bio: 'I create launch-ready websites for your brand.',
    location: 'Remote',
    remote: true,
    rating: 5,
    photo: 'images/willemhenrivanloo.jpg'
  },
  {
    id: 'diederik-n',
    name: 'Diederik N.',
    industry: 'Automotive',
    bio: 'Automotive Specialist delivering precision diagnostics, preventative maintenance, and high-caliber mechanical repairs. Committed to maximizing vehicle safety, efficiency, and longevity with unmatched expertise.',
    location: 'Mbombela',
    remote: false,
    rating: 4,
    photo: 'images/diederik.jpg'
  },
  {
    id: 'template',
    name: 'Your Name Here.',
    industry: 'What you do',
    bio: 'Serious about your craft? Apply to join our human-approved roster of elite pros.',
    location: 'Nelspruit (On-site)',
    remote: false,
    rating: 5,
    photo: 'images/elite.jpg'
  }
];

const initialsPhoto = (n) =>
  'data:image/svg+xml,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="#262626" />
    <text x="50" y="62" font-size="38" text-anchor="middle" fill="#e8a923"
      font-family="sans-serif" font-weight="700">
      ${n
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)}
    </text>
  </svg>`);
