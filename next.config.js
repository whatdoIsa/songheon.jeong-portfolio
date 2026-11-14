/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/songheon.jeong-portfolio' : '',
  assetPrefix: isProd ? '/songheon.jeong-portfolio/' : '',
};

module.exports = nextConfig;
