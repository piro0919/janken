const withPWA = require("next-pwa");
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  i18n,
  pwa: {
    dest: "public",
  },
  reactStrictMode: true,
});

module.exports = nextConfig;
