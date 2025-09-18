/*
  sendMail Handler
  Processes contact form submissions: validates input, sanitizes
  content, and sends an email using nodemailer. Sensitive
  configuration should be loaded via environment variables.
*/

const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

// Validation rules for incoming form fields
const validationRules = [
  body('name').trim().isLength({ min: 2 }).escape(),
  body('email').isEmail().normalizeEmail(),
  body('message').trim().isLength({ min: 10 }).escape(),
  body('website').isEmpty() // honeypot field should be empty
];

const sendMail = async (req, res) => {
  // Run validation
  await Promise.all(validationRules.map((rule) => rule.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { name, email, message } = req.body;
  // Basic sanitization (strip HTML)
  const sanitizedMessage = sanitizeHtml(message, { allowedTags: [], allowedAttributes: {} });
  try {
    // Configure transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.example.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || ''
      }
    });
    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: process.env.BUSINESS_EMAIL || 'info@example.com',
      subject: 'New contact form submission',
      text: sanitizedMessage,
      html: `<p>${sanitizedMessage}</p>`
    });
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
};

module.exports = sendMail;