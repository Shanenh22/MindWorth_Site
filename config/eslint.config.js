/* ESLint configuration for MindWorth project */
module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-undef': 'error',
    'prefer-const': 'warn'
  }
};