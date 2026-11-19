(function(){
  var body=document.body;

  // Floating WhatsApp button
  if(!document.querySelector('.wa')){
    var a=document.createElement('a');
    a.className='wa';
    a.href='https://wa.me/27745718332?text=Hi%20LINK%2C%20I%27d%20like%20to%20know%20more%20about%20your%20partnerships.';
    a.target='_blank';
    a.rel='noopener noreferrer';
    a.setAttribute('aria-label','Chat with LINK on WhatsApp');
    a.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C9 3 3.3 8.600 3.300 15.600c0 2.300.6 4.400 1.700 6.300L3 29l7.300-1.900c1.800 1 3.800 1.500 5.700 1.500 7 0 12.700-5.700 12.700-12.700S23 3 16 3zm0 23.200c-1.800 0-3.600-.5-5.100-1.400l-.4-.2-4.300 1.100 1.200-4.200-.3-.4a10.400 10.400 0 1 1 8.900 5.100zm5.700-7.800c-.3-.2-1.900-.9-2.200-1s-.5-.2-.7.200-.8 1-1 1.200-.4.200-.7.100a8.500 8.500 0 0 1-4.200-3.700c-.3-.6.300-.5.900-1.700.1-.2 0-.4 0-.5l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6a1.200 1.200 0 0 0-.9.400 3.800 3.800 0 0 0-1.200 2.800c0 1.700 1.200 3.300 1.400 3.500s2.400 3.700 5.800 5.100c2.100.9 2.900 1 3.900.8.600-.1 1.900-.8 2.200-1.500s.3-1.400.2-1.500-.3-.2-.6-.4z"/></svg>';
    body.appendChild(a);
  }

  // Back-to-top button
  if(!document.getElementById('top-btn')){
    var t=document.createElement('button');
    t.className='top';
    t.id='top-btn';
    t.type='button';
    t.setAttribute('aria-label','Back to top');
    t.innerHTML='&uarr;';
    body.appendChild(t);
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    t.onclick=function(){window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});};
    var check=function(){t.classList.toggle('show',window.scrollY>400);};
    window.addEventListener('scroll',check,{passive:true});
    check();
  }

  // Privacy Notice link in the footer
  var f=document.getElementById('site-footer');
  if(f&&!f.querySelector('a[href="privacy.html"]')){
    var w=f.querySelector('.wrap')||f;
    var l=document.createElement('a');
    l.href='privacy.html';
    l.textContent='Privacy Notice';
    w.appendChild(l);
  }
})();
