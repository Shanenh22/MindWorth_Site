/*
  Accessibility Enhancements
  Provides utility functions to improve keyboard navigation and focus
  management across the site. Future enhancements may include focus
  trapping for modals and live region updates.
*/

export function trapFocus(container) {
  const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const focusableElements = Array.from(container.querySelectorAll(focusableSelectors));
  const firstEl = focusableElements[0];
  const lastEl = focusableElements[focusableElements.length - 1];
  function handleTab(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  }
  container.addEventListener('keydown', handleTab);
  return () => container.removeEventListener('keydown', handleTab);
}