// import { isVercel } from "@/constants/envexport"; // TODO: is working fine 
const isVercel = process.env.VERCEL === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
   // output: 'export',
   // images: {
   //    unoptimized: true,
   // },
   output: isVercel ? undefined : 'export',
   images: {
      unoptimized: isVercel ? true : false,
   },
};

export default nextConfig;
