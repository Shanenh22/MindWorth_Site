/*
  Analytics Manager
  Implements Google Analytics 4 with consent mode. This file provides
  methods for tracking events without loading analytics until consent
  is granted. Configuration values should be injected via .env
  variables during the build process.
*/

class AnalyticsManager {
  constructor() {
    this.consentGiven = false;
    this.gaId = import.meta.env ? import.meta.env.GA4_MEASUREMENT_ID : '';
    this.initConsentMode();
  }

  initConsentMode() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    // Default deny until consent
    gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'functionality_storage': 'denied'
    });
  }

  grantConsent() {
    this.consentGiven = true;
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
    // Load GA4 script lazily
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
    document.head.appendChild(script);
    window.gtag('js', new Date());
    window.gtag('config', this.gaId);
  }

  trackEvent(eventName, parameters = {}) {
    if (this.consentGiven && typeof window.gtag === 'function') {
      window.gtag('event', eventName, parameters);
    }
  }

  trackFormSubmission(formType, success) {
    this.trackEvent(success ? 'form_submit_success' : 'form_submit_error', {
      form_type: formType,
      success
    });
  }
}

export default AnalyticsManager;