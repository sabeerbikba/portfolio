/** @type {import('next').NextConfig} */
const nextConfig = {
   output: 'export', // Ensures Next.js will export the app as static HTML
   images: {
      unoptimized: true, // GitHub Pages doesn’t support optimized images
   },
   basePath: '', // Use an empty string for the default base path
   assetPrefix: './', // This helps in loading the assets correctly
};

export default nextConfig;
