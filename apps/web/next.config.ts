import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '/operus',
  transpilePackages: ['@operus/types'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xnrdqvxktuwucukohbzm.supabase.co',
      },
    ],
  },
};

export default nextConfig;
