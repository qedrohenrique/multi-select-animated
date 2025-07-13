/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://multi-select-animated.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
};
