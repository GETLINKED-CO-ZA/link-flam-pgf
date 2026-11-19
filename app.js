// Shared header, footer and form handling for every page.
const PAGES=[['index.html','Home'],['marketplace.html','Find talent'],['get-listed.html','Get listed'],['about.html','About']];
const here=location.pathname.split('/').pop()||'index.html';
document.getElementById('site-header').innerHTML=`<div class="wrap"><a class="logo" href="index.html"><svg viewBox="0 0 24 24" fill="#e8a923"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-4 3-6 1 1 1 2 2 2 1-2 1-5 1-8z"/></svg>LINK <b>F.L.A.M</b></a><nav aria-label="Main">${PAGES.map(([h,t])=>`<a href="${h}"${h===here?' aria-current="page"':''}>${t}</a>`).join('')}</nav></div>`;
document.getElementById('site-footer').innerHTML=`<div class="wrap"><span>LINK F.L.A.M is operated by LINK PTY LTD · <a href="https://www.getlinked.co.za">www.getlinked.co.za</a></span><span>Advance Your World</span></div>`;

// Posts a form to a Vercel serverless function that relays it through Brevo.
// Endpoints: /api/booking and /api/apply (see README note in chat).
async function submitForm(form,endpoint,okText){
  const msg=form.querySelector('.msg'),btn=form.querySelector('button[type=submit]');
  btn.disabled=true;msg.className='msg';
  try{
    const r=await fetch(endpoint,{method:'POST',body:new FormData(form)});
    if(!r.ok)throw 0;
    msg.className='msg ok';msg.textContent=okText;form.reset();
  }catch(e){msg.className='msg err';msg.textContent='We could not send your form. Check your connection and try again, or email us directly.';}
  btn.disabled=false;
}
