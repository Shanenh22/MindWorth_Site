/*
  Header Component
  Injects the site header into the #site-header container. Provides
  navigation structure and a call-to-action tailored for AI consulting.
*/

class HeaderComponent {
  constructor() {
    this.headerContainer = document.getElementById('site-header');
  }

  generateMarkup() {
    return `
      <div class="navbar">
        <a class="logo" href="/">MindWorth</a>
        <button id="nav-toggle" aria-controls="site-nav" aria-expanded="false" aria-label="Open menu">
          <span class="sr-only">Toggle navigation</span>
          <!-- Simple hamburger icon -->
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <nav id="site-nav" class="site-nav" aria-label="Primary" hidden>
          <ul class="menu-links">
            <li><a href="/about.html">About</a></li>
            <li><a href="/services/">Services</a></li>
            <li><a href="/industries.html">Industries</a></li>
            <li><a href="/resources.html">Resources</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/contact.html">Contact</a></li>
          </ul>
          <a class="cta" href="/book.html">Schedule Your Free AI Strategy Call</a>
        </nav>
      </div>
      <div id="nav-overlay" class="nav-overlay" hidden></div>
    `;
  }

  init() {
    if (!this.headerContainer) return;
    this.headerContainer.innerHTML = this.generateMarkup();
  }
}

// Initialize header on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const header = new HeaderComponent();
  header.init();
});

export default HeaderComponent;