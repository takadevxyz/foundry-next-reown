import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [process.env.DEV_ORIGIN || '127.0.0.1'],
};

export default nextConfig;
