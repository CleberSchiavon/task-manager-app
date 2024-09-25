/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  experimental: {
    serverActions: true,
  },
};
