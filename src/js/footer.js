/*
  Footer Component
  Injects business information, navigation shortcuts and legal links
  into the #site-footer container. Updates the copyright year
  dynamically.
*/

class FooterComponent {
  constructor() {
    this.footerContainer = document.getElementById('site-footer');
  }

  generateMarkup() {
    const year = new Date().getFullYear();
    return `
      <div class="footer-content container">
        <div class="footer-columns">
          <div class="footer-column">
            <h3>Contact Us</h3>
            <p>Phone: <a href="tel:+12146935750">(214) 693‑5750</a></p>
            <p>Email: <a href="mailto:info@mindworth.com">info@mindworth.com</a></p>
          </div>
          <div class="footer-column">
            <h3>Navigate</h3>
            <ul class="footer-nav">
              <li><a href="/about.html">About</a></li>
              <li><a href="/services/">Services</a></li>
              <li><a href="/blog/">Blog</a></li>
              <li><a href="/contact.html">Contact</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Follow Us</h3>
            <ul class="social-links">
              <li><a href="https://www.linkedin.com" aria-label="LinkedIn">LinkedIn</a></li>
              <li><a href="https://www.youtube.com" aria-label="YouTube">YouTube</a></li>
              <li><a href="https://twitter.com" aria-label="Twitter">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-legal">
          <p>&copy; ${year} MindWorth. All rights reserved.</p>
          <ul class="legal-links">
            <li><a href="/privacy.html">Privacy Policy</a></li>
            <li><a href="/terms.html">Terms of Service</a></li>
            <li><a href="/cookie.html">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
    `;
  }

  init() {
    if (!this.footerContainer) return;
    this.footerContainer.innerHTML = this.generateMarkup();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const footer = new FooterComponent();
  footer.init();
});

export default FooterComponent;