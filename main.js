const c=document.getElementById('c'),cr=document.getElementById('cr');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;c.style.left=mx+'px';c.style.top=my+'px';});
(function a(){rx+=(mx-rx)*.09;ry+=(my-ry)*.09;cr.style.left=rx+'px';cr.style.top=ry+'px';requestAnimationFrame(a);})();
document.querySelectorAll('a,button,.bi,.fi-h,.fi-v,.gi').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cr.style.width='48px';cr.style.height='48px';c.style.opacity='.4';});
  el.addEventListener('mouseleave',()=>{cr.style.width='30px';cr.style.height='30px';c.style.opacity='1';});
});
window.addEventListener('scroll',()=>document.getElementById('hd').classList.toggle('scrolled',scrollY>30));

function playYT(thumbEl, src, ar) {
  const vf=thumbEl.closest('.vf');
  let frame=vf.querySelector('.yt-frame');
  if(!frame){frame=document.createElement('iframe');frame.className='yt-frame';frame.setAttribute('allow','autoplay; fullscreen; picture-in-picture');frame.setAttribute('allowfullscreen','');frame.style.cssText='position:absolute;inset:0;width:100%;height:100%;border:0;';vf.appendChild(frame);}
  frame.src=src;vf.classList.add('playing');
}

function setActiveNav(name){
  document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));
  const el=document.getElementById('nav-'+(name||'home'));if(el)el.classList.add('active');
}
let cur=null;
const hids=['home','hb','ha'];
function show(name){
  if(cur===name){goHome();return;}
  cur=name;
  hids.forEach(id=>{const el=document.getElementById(id);if(el)el.style.display='none';});
  document.querySelectorAll('.pg').forEach(s=>s.classList.remove('on'));
  document.querySelectorAll('.yt-frame').forEach(f=>{f.src='';f.closest('.vf').classList.remove('playing');});
  const t=document.getElementById('pg-'+name);
  if(t){t.classList.add('on');window.scrollTo({top:0,behavior:'smooth'});setTimeout(()=>t.querySelectorAll('.rv').forEach((el,i)=>setTimeout(()=>el.classList.add('on'),i*60)),80);}
  setActiveNav(name);
}
function goHome(){
  cur=null;
  document.querySelectorAll('.pg').forEach(s=>s.classList.remove('on'));
  document.querySelectorAll('.yt-frame').forEach(f=>{f.src='';f.closest('.vf').classList.remove('playing');});
  document.getElementById('home').style.display='flex';
  document.getElementById('hb').style.display='block';
  document.getElementById('ha').style.display='block';
  window.scrollTo({top:0,behavior:'smooth'});setActiveNav('home');
}
setActiveNav('home');
const ro=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');ro.unobserve(e.target);}}),{threshold:.1});
document.querySelectorAll('#hb .rv,#ha .rv').forEach(el=>ro.observe(el));

// ── LIGHTBOX ──
(function() {
  var lbEl    = document.getElementById('lb');
  var lbImg   = document.getElementById('lb-img');
  var lbCapEl = document.getElementById('lb-caption');

  function lbOpen(src, caption) {
    lbImg.src = src;
    lbCapEl.textContent = caption || '';
    lbEl.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  window.lbClose = function() {
    lbEl.classList.remove('open');
    setTimeout(function(){ lbImg.src = ''; }, 300);
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') window.lbClose();
  });

  function getCaption(el) {
    var t = el.querySelector('.binfo .t, .fc-t, .gi-t');
    return t ? t.textContent.trim() : '';
  }

  window.attachLightbox = function() {
    document.querySelectorAll('.bi, .fi-h, .fi-v, .gi').forEach(function(el) {
      if (el.dataset.lb) return;
      var imgEl = el.querySelector('img');
      if (!imgEl) return;
      el.dataset.lb = '1';
      el.addEventListener('click', function(e) {
        e.stopPropagation();
        lbOpen(imgEl.src, getCaption(el));
      });
    });
  };

  window.attachLightbox();
})();

// Patch show() per ri-attaccare lightbox dopo navigazione
var _showOrig = window.show;
window.show = function(name) {
  if (_showOrig) _showOrig(name);
  setTimeout(window.attachLightbox, 250);
};

// ── LIGHTBOX ──
(function() {
  var lbEl    = document.getElementById('lb');
  var lbImg   = document.getElementById('lb-img');
  var lbCapEl = document.getElementById('lb-caption');

  function lbOpen(src, caption) {
    lbImg.src = src;
    lbCapEl.textContent = caption || '';
    lbEl.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  window.lbClose = function() {
    lbEl.classList.remove('open');
    setTimeout(function(){ lbImg.src = ''; }, 300);
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') window.lbClose();
  });

  function getCaption(el) {
    var t = el.querySelector('.binfo .t, .fc-t, .gi-t');
    return t ? t.textContent.trim() : '';
  }

  window.attachLightbox = function() {
    document.querySelectorAll('.bi, .fi-h, .fi-v, .gi').forEach(function(el) {
      if (el.dataset.lb) return;
      var imgEl = el.querySelector('img');
      if (!imgEl) return;
      el.dataset.lb = '1';
      el.addEventListener('click', function(e) {
        e.stopPropagation();
        lbOpen(imgEl.src, getCaption(el));
      });
    });
  };

  window.attachLightbox();

  var _showOrig = window.show;
  window.show = function(name) {
    if (_showOrig) _showOrig(name);
    setTimeout(window.attachLightbox, 250);
  };
})();
