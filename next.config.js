/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable font optimization to prevent build failures
  optimizeFonts: false,
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

module.exports = nextConfig;