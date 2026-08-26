import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis/+esm'

gsap.registerPlugin(ScrollTrigger);

// Smooth scroll (Lenis)
const lenis = new Lenis({lerp:0.08, smooth: true});
function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// Keep the navigation responsive to the user's position on the page.
const progressBar = document.querySelector('.scroll-progress span');
const navLinks = [...document.querySelectorAll('.site-nav nav a')];
const navSections = navLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
const cursorGlow = document.querySelector('.cursor-glow');
if(cursorGlow && window.matchMedia('(pointer:fine)').matches){
  window.addEventListener('pointermove', event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    cursorGlow.style.opacity = '1';
  }, {passive:true});
}
window.addEventListener('scroll', () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  if(progressBar){
    progressBar.style.width = `${scrollableHeight ? (window.scrollY / scrollableHeight) * 100 : 0}%`;
  }
}, {passive:true});
navSections.forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onToggle: self => {
      if(self.isActive){
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`));
      }
    }
  });
});

document.querySelectorAll('.site-nav a, .cta').forEach(control => {
  control.addEventListener('click', () => {
    control.animate([{transform:'scale(.96)'},{transform:'scale(1)'}], {duration:220,easing:'cubic-bezier(.2,.8,.2,1)'});
  });
});

if(window.matchMedia('(pointer:fine)').matches){
  document.querySelectorAll('.split .media, .h-scroll .item').forEach(card => {
    card.addEventListener('pointermove', event => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      card.style.transform = `perspective(900px) rotateX(${y * -3}deg) rotateY(${x * 3}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

// Helper: split text into spans for stagger
function splitChars(el){
  const txt = el.textContent.trim();
  el.innerHTML = '';
  txt.split('').forEach(ch => { const s = document.createElement('span'); s.textContent = ch; s.style.display='inline-block'; el.appendChild(s); });
}

// Preloader (fast ~1.2s) then reveal
const pre = document.getElementById('preloader');
const preText = document.getElementById('pre-text');
preText.textContent = 'CHAI THEORY - Built By Mahima'.split('').join('');
gsap.to('.pre-bar-fill',{width:'100%',duration:1.1,ease:'power2.out'});
gsap.to('.pre-text span',{opacity:1,duration:0.01});
setTimeout(()=>{gsap.to(pre,{autoAlpha:0,display:'none',duration:0.6});},1250);

// Hero title split and animate
const brand = document.getElementById('brandTitle');
splitChars(brand);
gsap.from('#brandTitle span',{y:30,opacity:0,stagger:0.04,duration:0.7,ease:'back.out(1.2)',delay:0.4});

gsap.utils.toArray('.section:not(.hero)').forEach(section => {
  gsap.from(section.querySelectorAll('.section-title, .copy, .media, .sweets-gallery'), {
    y:28,
    opacity:0,
    duration:0.8,
    stagger:0.08,
    ease:'power2.out',
    scrollTrigger:{trigger:section,start:'top 78%',once:true}
  });
});

// Keep the hero copy over the footage, revealing it as the video reaches its close-up.
const heroTimeline = gsap.timeline({
  scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom bottom',scrub:1}
});
heroTimeline
  .to('#heroVideo',{scale:1.22,ease:'none',duration:1})
  .fromTo('.hero-inner',{opacity:0,y:36},{opacity:1,y:0,ease:'power2.out',duration:0.28},0.68)
  .to('.scroll-indicator',{opacity:0,ease:'none',duration:0.12},0.72);

// Coffee video subtle parallax
gsap.to('#coffeeVideo',{yPercent:-6, ease:'none', scrollTrigger:{trigger:'#coffee',start:'top bottom',end:'bottom top',scrub:1}});

// Exploded thali: pinned scrub controlling video currentTime + labels
function makeScrubVideo(videoEl, triggerEl, labelList){
  const vid = videoEl && videoEl.tagName === 'VIDEO' ? videoEl : null;
  if(!videoEl || (vid && !vid.querySelector('source'))){
    // placeholder: mark as missing
    const ph = document.createElement('div'); ph.className='placeholder'; ph.textContent='Video missing'; triggerEl.querySelector('.exploded-wrap').appendChild(ph); return;
  }
  let duration = 1;
  let activeLabelIndex = -1;
  if(vid){
    vid.pause();
    vid.currentTime = 0;
    vid.addEventListener('loadedmetadata', ()=>{ duration = vid.duration || 1; });
  }

  const st = ScrollTrigger.create({
    trigger: triggerEl,
    start: 'top top',
    // tightened length so the thali interaction is reachable quickly on capture
    end: '+=900',
    pin: true,
      scrub: 0.6,
      snap: Array.isArray(labelList) && labelList.length > 1 ? {snapTo: 1 / (labelList.length - 1), duration: 0.35, ease: 'power2.out'} : false,
    onUpdate(self){
      const t = Math.min(1,Math.max(0,self.progress));
      if(vid){
        try{ vid.currentTime = t * duration; }catch(e){}
      }
      // Show exactly one ingredient for each scroll stage.
      if(Array.isArray(labelList) && labelList.length){
        const stageSize = 1 / labelList.length;
        const nextLabelIndex = Math.min(labelList.length - 1, Math.floor(self.progress / stageSize));
        if(nextLabelIndex !== activeLabelIndex){
          activeLabelIndex = nextLabelIndex;
          labelList.forEach((lbl, i) => {
            const isActive = i === activeLabelIndex;
            gsap.killTweensOf(lbl.el);
            if(isActive){
              gsap.fromTo(lbl.el,{y:10,opacity:0,scale:0.96},{y:0,opacity:1,scale:1,duration:0.35,ease:'back.out(1.1)'});
              lbl.el.classList.add('visible');
            } else {
              gsap.set(lbl.el,{y:6,opacity:0,scale:0.96});
              lbl.el.classList.remove('visible');
            }
          });
        }
      }
    }
  });
}

const thaliVid = document.getElementById('thaliVid');
const thaliSection = document.getElementById('exploded');
// prepare saffron labels
const thaliLabels = ['MASALA DOSA','SAMBAR','MEDU VADA','COCONUT CHUTNEY'].map((txt, i)=>{
  const el = document.createElement('div'); el.className='thali-label'; el.textContent = txt; el.style.position='absolute'; el.style.left = (12 + i*18) + '%'; el.style.top = (20 + i*10) + '%'; el.style.background = 'var(--saffron, #E38A2C)'; el.style.color='#fff'; el.style.padding='8px 12px'; el.style.borderRadius='10px'; el.style.fontWeight='800'; el.style.opacity='0'; el.style.transform='translateY(8px)'; el.style.pointerEvents='none';
  thaliSection.querySelector('.exploded-wrap').appendChild(el);
  return {el, at: 0.15 + i*0.18};
});
makeScrubVideo(thaliVid, thaliSection, thaliLabels);
gsap.fromTo(thaliVid,{scale:1},{scale:1.2,ease:'none',scrollTrigger:{trigger:thaliSection,start:'top top',end:'+=900',scrub:0.6}});

const samosaVid = document.getElementById('samosaVid');
if(samosaVid){
  samosaVid.muted = true;
  samosaVid.play().catch(()=>{});
}

// Reel playback helper: controlled scroll timeline for recording (trigger with ?reel=1)
async function runReelPlayback(){
  const secs = s=> new Promise(res=>setTimeout(res, s*1000));
  const sections = ['hero','coffee','exploded','exploded-samosa','sweets','gallery','finale'];
  // small helper to get Y for element top
  const scrollToEl = (id,dur=0.9)=>{
    const el = document.getElementById(id);
    if(!el) return Promise.resolve();
    return new Promise(resolve=>{
      gsap.to(window,{duration:dur,scrollTo:{y:el,offsetTop:40},ease:'power2.inOut',onComplete:resolve});
    });
  }

  // sequence tuned for 1920x1080 capture: quick beats and a 2s thali payoff
  await secs(0.4);
  await scrollToEl('hero',0.9); await secs(0.6);
  await scrollToEl('coffee',0.9); await secs(0.5);
  // move to thali and slowly scrub through pinned area
  await scrollToEl('exploded',0.8); await scrollToEl('exploded',1.8); // triggers scrub
  await secs(0.4);
  await scrollToEl('exploded-samosa',1.0); await secs(0.6);
  await scrollToEl('sweets',0.9); await secs(0.5);
  await scrollToEl('gallery',1.0); await secs(0.5);
  await scrollToEl('finale',1.0); await secs(0.8);
}

// Auto-run playback when URL contains ?reel=1
if(location.search.indexOf('reel=1')!==-1){
  // wait a moment for media to be ready
  setTimeout(()=>{ runReelPlayback().catch(()=>{}); }, 800);
}

// Sweets gallery scrub (horizontal translation)
const sweetsVid = document.getElementById('sweetsVid');
if(sweetsVid){
  sweetsVid.muted = true;
  sweetsVid.play().catch(()=>{});
}
gsap.to('#sweetsVid',{scale:1.03,ease:'none',scrollTrigger:{trigger:'#sweets',start:'top center',end:'bottom top',scrub:1}});

// Horizontal ingredient gallery using ScrollTrigger horizontal pin
const hscroll = document.getElementById('hscroll');
if(hscroll){
  const total = hscroll.scrollWidth - document.documentElement.clientWidth;
  gsap.to(hscroll,{x: -total, ease: 'none', scrollTrigger:{trigger:'#gallery',start:'top top',end: () => `+=${total+window.innerHeight}`,pin:true,scrub:0.8}});
}

// Micro interactions: magnetic CTA
const btn = document.getElementById('reserve');
if(btn){
  btn.addEventListener('mousemove', (e)=>{
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2; const y = e.clientY - r.top - r.height/2;
    gsap.to(btn,{x:x*0.15,y:y*0.12,duration:0.25});
  });
  btn.addEventListener('mouseleave', ()=>{ gsap.to(btn,{x:0,y:0,duration:0.4}); });
}

const reservationModal = document.getElementById('reservationModal');
const reservationForm = document.getElementById('reservationForm');
const reservationStatus = document.getElementById('reservationStatus');
const reservationToast = document.getElementById('reservationToast');
const openReservation = event => {
  event.preventDefault();
  reservationModal?.classList.add('is-open');
  reservationModal?.setAttribute('aria-hidden','false');
  reservationModal?.querySelector('input')?.focus();
};
const closeReservation = () => {
  reservationModal?.classList.remove('is-open');
  reservationModal?.setAttribute('aria-hidden','true');
};
document.querySelectorAll('#reserve, .nav-action').forEach(control => control.addEventListener('click', openReservation));
reservationModal?.querySelectorAll('[data-close-reservation]').forEach(control => control.addEventListener('click', closeReservation));
document.addEventListener('keydown', event => { if(event.key === 'Escape') closeReservation(); });
reservationForm?.addEventListener('submit', event => {
  event.preventDefault();
  const reservation = Object.fromEntries(new FormData(reservationForm).entries());
  reservation.createdAt = new Date().toISOString();
  const savedReservations = JSON.parse(localStorage.getItem('ctCafeReservations') || '[]');
  savedReservations.push(reservation);
  localStorage.setItem('ctCafeReservations', JSON.stringify(savedReservations));
  reservationStatus.textContent = 'Reservation request received.';
  if(reservationToast){
    reservationToast.textContent = `Thanks, ${reservation.name}. Your CT. Cafe request was received.`;
    reservationToast.classList.add('is-visible');
    setTimeout(() => reservationToast.classList.remove('is-visible'), 4500);
  }
  reservationForm.reset();
  setTimeout(closeReservation, 900);
});

// Accessibility: pause videos in reduced-motion
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){ document.querySelectorAll('video').forEach(v=>v.pause()); }

// Small fallback: show placeholder text for missing images
document.querySelectorAll('#hscroll img').forEach(img=>{
  img.addEventListener('error', ()=>{ const p=document.createElement('div'); p.className='img-placeholder'; p.textContent='Image missing'; img.replaceWith(p); });
});

// Resize refresh ScrollTrigger when Lenis settles
ScrollTrigger.addEventListener('refreshInit', ()=>{/* no-op */});
requestAnimationFrame(()=>ScrollTrigger.refresh());
