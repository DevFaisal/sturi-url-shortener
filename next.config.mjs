/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedForwardedHosts: ["my-forwarded-host.com"],
    },
  },
};

export default nextConfig;
