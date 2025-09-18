/*
  Express Application
  Serves static files from the public directory and exposes API
  endpoints for form submissions. Applies security headers and rate
  limiting to protect the application.
*/

const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const securityHeaders = require('./security');
const sendMail = require('./sendMail');

const app = express();

// Apply security headers to all responses
app.use((req, res, next) => {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  next();
});

// Serve static assets from the public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Parse incoming form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rate limiter for API endpoints
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per window
  message: { success: false, message: 'Too many form submissions, please try again later.' }
});

// Form submission endpoint
app.post('/api/contact', formLimiter, sendMail);

// Fallback: serve index.html for unknown routes (useful for SPA-style navigation)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;