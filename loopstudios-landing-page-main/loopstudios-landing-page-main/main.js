const navOpen = document.getElementById('navOpen');
const navClose = document.getElementById('navClose');
const mobileNav = document.getElementById('mobileNav');

navOpen.addEventListener('click', () => {
  mobileNav.classList.add('is-open');
  mobileNav.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
});

navClose.addEventListener('click', () => {
  mobileNav.classList.remove('is-open');
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});
