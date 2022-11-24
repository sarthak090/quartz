module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.quartzstonedirect.com/',
  generateRobotsTxt: true,
  sitemapSize: 1000,
  exclude: ['/cart', '/checkout', '/wishlist'],
};
