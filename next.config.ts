import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '1xoi7lid5j.ufs.sh',
        port: '',
        pathname: '/f/**'
      }
    ]
  }
};

export default nextConfig;
