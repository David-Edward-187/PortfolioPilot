
import type {NextConfig} from 'next';

const isProd = process.env.NODE_ENV === 'production';
// IMPORTANT: Replace 'portfolio-pilot' with your actual GitHub repository name if it's different.
const repositoryName = 'portfolio-pilot'; 

const nextConfig: NextConfig = {
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
    ],
    // When outputting to static export, image optimization via Vercel is not available.
    // unoptimized: true is necessary for images to work correctly on GitHub Pages.
    unoptimized: true,
  },

  // Configuration for deploying to GitHub Pages
  // Sets the base path for the application. This is necessary if your Next.js app
  // is deployed to a subdirectory on GitHub Pages (e.g., https://<username>.github.io/<repositoryName>/).
  basePath: isProd ? `/${repositoryName}` : '',

  // Sets the asset prefix. This tells Next.js to load assets (JS, CSS, images)
  // from this path. It's also needed for subdirectory deployments on GitHub Pages.
  // Note the trailing slash.
  assetPrefix: isProd ? `/${repositoryName}/` : '',

  // Enables static HTML export. GitHub Pages serves static files, so this is required.
  // This will generate an `out` folder that can be deployed to GitHub Pages.
  output: 'export',
};

export default nextConfig;
