/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["ui", "db", "core"],
  // Updated: moved from experimental.turbo to turbopack (Next.js 15.3.5+)
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/overview",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
