/* Wrapper for Header component in the public assets directory. */
import HeaderComponent from '../../../src/js/header.js';
document.addEventListener('DOMContentLoaded', () => {
  const header = new HeaderComponent();
  header.init();
});