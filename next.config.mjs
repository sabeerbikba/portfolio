/** @type {import('next').NextConfig} */
const nextConfig = {
   output: 'export', // Ensures Next.js will export the app as static HTML
   images: {
      unoptimized: true, // GitHub Pages doesn’t support optimized images
   },
};

export default nextConfig;
