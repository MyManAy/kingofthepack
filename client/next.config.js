/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  headers: () => [
    {
      source: "/_next/static/css/_app-client_src_app_globals_css.css",
      headers: [{ key: "Vary", value: "*" }],
    },
  ],
};

module.exports = nextConfig;
