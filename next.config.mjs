/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },

  // Performance optimizations
  compiler: {
    // Remove console logs in production
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  // Optimize images
  images: {
    unoptimized: true, // Required for static export
  },

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Optimize bundle
  experimental: {
    optimizePackageImports: ["@mui/material", "@mui/icons-material", "react-icons"],
  },
};

export default nextConfig;
