
/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    // When outputting to static export, image optimization via Vercel is not available.
    // unoptimized: true is necessary for images to work correctly on many static hosts.
    unoptimized: true,
  },

  // Enables static HTML export. This is required for many static hosting platforms.
  // This will generate an `out` folder that can be deployed.
  output: 'export',
};

module.exports = nextConfig;
