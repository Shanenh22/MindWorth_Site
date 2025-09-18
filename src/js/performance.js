/*
  Performance Monitoring
  Placeholder for collecting performance metrics and sending them to
  analytics. This file can hook into web-vitals library in the
  future.
*/

export function reportWebVitals(callback) {
  if (typeof callback !== 'function') return;
  import('web-vitals').then(({getCLS, getFID, getLCP, getFCP, getTTFB}) => {
    getCLS(callback);
    getFID(callback);
    getLCP(callback);
    getFCP(callback);
    getTTFB(callback);
  });
}