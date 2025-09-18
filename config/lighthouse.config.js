/* Lighthouse CI configuration
   Defines performance budgets and thresholds for automated testing.
*/
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      url: ['http://localhost:3000/']
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1.0 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }]
      }
    }
  }
};