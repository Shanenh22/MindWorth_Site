# MindWorth Website

This repository contains the source code for **MindWorth**, an AI business consulting website tailored for small and medium businesses. The project is built following modern web development standards for performance, accessibility and SEO.

## Project Structure

```
├── public/            # Production-ready static files
│   ├── index.html     # Homepage
│   ├── about.html     # About page
│   ├── contact.html   # Contact page
│   ├── services/      # Services section
│   ├── blog/          # Blog index
│   └── assets/
│       ├── css/       # Compiled CSS
│       ├── js/        # Compiled JS
│       ├── images/    # Images
│       └── icons/     # Icons
├── src/               # Source files
│   ├── css/           # CSS (theme, base, utilities)
│   ├── js/            # ES modules for components and features
│   ├── content/       # JSON files for industry data and schema templates
│   └── templates/     # Reusable HTML templates (future)
├── server/            # Express server and utilities
├── config/            # Configuration files (.env, ESLint, Prettier, Lighthouse)
└── README.md          # Project documentation
```

## Development

1. Install dependencies (if using a build tool).
2. Copy `.env.example` to `.env` and fill in your credentials and configuration values.
3. Run the Express server:

```bash
node server/app.js
```

This will serve the static files from the `public/` directory at `http://localhost:3000/` by default (depending on your environment configuration).

## Scripts

- `src/js/header.js` – Injects the header markup with navigation and CTA.
- `src/js/nav.js` – Handles mobile navigation behavior.
- `src/js/footer.js` – Injects the footer markup with contact info and legal links.
- `src/js/form-handler.js` – Provides client-side validation and handles form submissions.
- `src/js/analytics.js` – Manages Google Analytics 4 with consent mode.
- `server/sendMail.js` – Processes contact form submissions and sends emails via Nodemailer.

## Accessibility & Performance

The website adheres to WCAG 2.2 AA guidelines. It includes semantic HTML, skip links, keyboard navigation, proper color contrast and ARIA attributes. Performance is optimized through a CSS and JavaScript loading strategy, image optimization and the use of modern web standards.

## License

This project is provided for demonstration purposes and does not include a license. You may adapt it for your own use as required.