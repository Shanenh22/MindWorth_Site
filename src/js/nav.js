/*
  Navigation behavior
  Handles opening and closing of the mobile navigation drawer and
  overlay. Ensures accessible toggling using aria attributes.
*/

function toggleNav(open) {
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const navOverlay = document.getElementById('nav-overlay');
  if (!navToggle || !siteNav || !navOverlay) return;
  const isOpen = open !== undefined ? open : siteNav.classList.contains('is-open');
  if (isOpen) {
    // close nav
    siteNav.classList.remove('is-open');
    navOverlay.classList.remove('is-active');
    siteNav.setAttribute('hidden', '');
    navToggle.setAttribute('aria-expanded', 'false');
  } else {
    // open nav
    siteNav.classList.add('is-open');
    navOverlay.classList.add('is-active');
    siteNav.removeAttribute('hidden');
    navToggle.setAttribute('aria-expanded', 'true');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navOverlay = document.getElementById('nav-overlay');
  if (!navToggle || !navOverlay) return;
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    toggleNav(isExpanded);
  });
  navOverlay.addEventListener('click', () => {
    toggleNav(true);
  });
});