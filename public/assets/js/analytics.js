/* Wrapper for Analytics Manager
   Automatically grants consent on page load so Google Analytics 4 events are tracked. */
import AnalyticsManager from '../../../src/js/analytics.js';
const analytics = new AnalyticsManager();
// Grant consent automatically once the DOM is ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  analytics.grantConsent();
} else {
  window.addEventListener('DOMContentLoaded', () => analytics.grantConsent());
}
export default analytics;