/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://xtepnepal.com",
  generateRobotsTxt: true,
  exclude: [
    "/cart",
    "/checkout/*",
    "/profile/*",
    "/order/*",
    "/wishlist",
    "/auth/*",
  ],
  robotsTxtOptions: {
    additionalSitemaps: ["https://xtepnepal.com/sitemap.xml"],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
  },
};
