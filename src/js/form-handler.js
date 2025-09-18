/*
  Form Handler
  Adds client-side validation and handles asynchronous submission to
  the server. Ensures accessibility by updating aria-live regions and
  displaying error messages inline. This script should be imported on
  pages that include forms.
*/

import AnalyticsManager from './analytics.js';

const analytics = new AnalyticsManager();

function validateField(input) {
  const value = input.value.trim();
  const errorEl = document.getElementById(`${input.id}-error`);
  let valid = true;
  let message = '';
  if (input.hasAttribute('required') && value === '') {
    valid = false;
    message = 'This field is required.';
  } else if (input.type === 'email' && value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
    valid = false;
    message = 'Please enter a valid email address.';
  }
  if (errorEl) {
    errorEl.textContent = valid ? '' : message;
  }
  return valid;
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const inputs = Array.from(form.querySelectorAll('input, textarea')).filter(input => input.name !== 'website');
  let isValid = true;
  inputs.forEach(input => {
    const fieldValid = validateField(input);
    if (!fieldValid) isValid = false;
  });
  const statusEl = document.getElementById('form-status');
  if (!isValid) {
    statusEl.textContent = 'Please correct the errors in the form.';
    analytics.trackFormSubmission(form.id || 'contact-form', false);
    return;
  }
  // Show spinner
  const button = form.querySelector('button[type="submit"]');
  const spinner = button.querySelector('.spinner');
  const buttonText = button.querySelector('.button-text');
  spinner.removeAttribute('hidden');
  buttonText.setAttribute('aria-hidden', 'true');
  // Prepare payload
  const formData = new FormData(form);
  fetch('/api/contact', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      statusEl.textContent = data.message || 'Your message has been sent successfully.';
      form.reset();
      analytics.trackFormSubmission(form.id || 'contact-form', true);
    })
    .catch(() => {
      statusEl.textContent = 'There was an error submitting the form. Please try again later.';
      analytics.trackFormSubmission(form.id || 'contact-form', false);
    })
    .finally(() => {
      spinner.setAttribute('hidden', '');
      buttonText.removeAttribute('aria-hidden');
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
});

export default handleSubmit;