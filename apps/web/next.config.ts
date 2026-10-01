import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
