// One entry per freelancer folder in GitHub. Add a new object (or folder) to go live.
// photo: paste the Vercel Blob link. rating: 1-5. remote: true = Remote, false = Local / On-site.
const FREELANCERS=[
 {id:'thandi-m',name:'Thandi M.',industry:'Graphic Design',bio:'Brand identities, social media kits and print-ready artwork for growing businesses.',location:'Remote',remote:true,rating:5,photo:''},
 {id:'sipho-n',name:'Sipho N.',industry:'Web Development',bio:'Fast, mobile-first websites and online stores built on modern tools.',location:'Remote',remote:true,rating:4,photo:''},
 {id:'lerato-k',name:'Lerato K.',industry:'Photography',bio:'Event, product and portrait photography across Mpumalanga and Gauteng.',location:'Mbombela (On-site)',remote:false,rating:5,photo:''},
 {id:'johan-v',name:'Johan V.',industry:'Bookkeeping',bio:'Monthly bookkeeping, VAT and payroll support for small businesses.',location:'Remote',remote:true,rating:4,photo:''},
 {id:'naledi-p',name:'Naledi P.',industry:'Copywriting',bio:'Website copy, newsletters and proposals that sound like you, only sharper.',location:'Remote',remote:true,rating:3,photo:''},
 {id:'ayanda-z',name:'Ayanda Z.',industry:'Videography',bio:'Short promo videos, event coverage and editing, shot on location.',location:'Nelspruit (On-site)',remote:false,rating:5,photo:''}
];
const initialsPhoto=n=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#262626"/><text x="50" y="62" font-size="38" text-anchor="middle" fill="#e8a923" font-family="sans-serif" font-weight="700">${n.split(' ').map(w=>w[0]).join('').slice(0,2)}</text></svg>`);
