const $ = (s) => document.querySelector(s);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Tema claro/escuro (o valor inicial é aplicado no <head>) */
const root = document.documentElement;
const themeBtn = $('#theme');
const syncThemeIcon = () => {
  const light = root.dataset.theme === 'light';
  themeBtn.firstElementChild.className = light ? 'fas fa-sun' : 'fas fa-moon';
  document.querySelector('meta[name="theme-color"]').content = light ? '#f6f8ff' : '#0b1020';
};
themeBtn.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  syncThemeIcon();
});
syncThemeIcon();

/* Menu mobile */
const nav = $('#nav');
const burger = $('#burger');
const menu = $('#menu');
const setMenu = (open) => {
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.firstElementChild.className = open ? 'fas fa-xmark' : 'fas fa-bars';
};
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

/* Navbar ganha fundo ao rolar */
const onScroll = () => nav.classList.toggle('scrolled', scrollY > 16);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Animação de entrada + barras de soft skills (IntersectionObserver) */
document.querySelectorAll('.skill').forEach((el) => el.style.setProperty('--v', el.dataset.level + '%'));
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

/* Carrossel: CSS scroll-snap + setas em loop + autoplay (pausa ao interagir) */
const track = $('#track');
const arrows = $('#arrows');
const step = () => track.querySelector('.slide').getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
const behavior = reduceMotion ? 'auto' : 'smooth';
const go = (dir) => {
  const max = track.scrollWidth - track.clientWidth;
  if (dir > 0 && track.scrollLeft >= max - 2) track.scrollTo({ left: 0, behavior });
  else if (dir < 0 && track.scrollLeft <= 2) track.scrollTo({ left: max, behavior });
  else track.scrollBy({ left: dir * step(), behavior });
};
$('#prev').addEventListener('click', () => go(-1));
$('#next').addEventListener('click', () => go(1));
const toggleArrows = () => { arrows.hidden = track.scrollWidth - track.clientWidth <= 2; }; // tudo cabe: sem setas
addEventListener('resize', toggleArrows);
toggleArrows();

let paused = false;
['pointerenter', 'focusin', 'touchstart'].forEach((ev) => track.addEventListener(ev, () => (paused = true), { passive: true }));
['pointerleave', 'focusout', 'touchend'].forEach((ev) => track.addEventListener(ev, () => (paused = false), { passive: true }));
if (!reduceMotion) setInterval(() => { if (!paused && !document.hidden && !arrows.hidden) go(1); }, 10000);
