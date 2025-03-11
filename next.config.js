/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: [],
    },
    // Uncomment this if deploying to GitHub Pages
    // basePath: process.env.NODE_ENV === 'production' ? '/blockbuster-vhs-generator' : '',
  };
  
  module.exports = nextConfig;