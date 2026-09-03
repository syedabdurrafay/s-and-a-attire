/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",

  basePath: "/s-and-a-attire-",

  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

module.exports = nextConfig;