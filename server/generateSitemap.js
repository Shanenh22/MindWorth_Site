/*
  Sitemap Generator
  Builds an XML sitemap using provided page metadata. This function
  can be extended to generate priority values based on industry as
  required. For now it produces a basic sitemap including the root
  and key pages.
*/

function generateSitemap(pages, domain) {
  const priorities = {
    '/': 1.0,
    '/about.html': 0.8,
    '/services/': 0.9,
    '/contact.html': 0.7,
    '/blog/': 0.6
  };
  const urls = pages.map((page) => {
    return `
      <url>
        <loc>${domain}${page.url}</loc>
        <lastmod>${page.lastmod || new Date().toISOString()}</lastmod>
        <changefreq>${page.changefreq || 'weekly'}</changefreq>
        <priority>${priorities[page.url] || 0.5}</priority>
      </url>
    `;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

module.exports = generateSitemap;