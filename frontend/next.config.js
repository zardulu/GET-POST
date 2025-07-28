/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['localhost'],
    },
    env: {
      CUSTOM_KEY: process.env.CUSTOM_KEY,
    },
    // Fix for Material-UI CSS-in-JS
    compiler: {
      emotion: true,
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      return config;
    },
  }
  
  module.exports = nextConfig