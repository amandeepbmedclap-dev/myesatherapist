import type { NextConfig } from "next";
import path from "path";

// Temporary pre-launch noindex. Set ALLOW_INDEXING=true in the Vercel
// production environment on launch day to lift it (no code change needed).
const allowIndexing = process.env.ALLOW_INDEXING === "true";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    // Before launch everything is noindex. After launch only the real domain is
    // indexable; staging and *.vercel.app hosts stay noindex.
    if (!allowIndexing) return [{ source: "/:path*", headers: noindex }];
    return [
      {
        source: "/:path*",
        missing: [{ type: "host", value: "myesatherapist.com" }],
        headers: noindex,
      },
    ];
  },
  onDemandEntries: {
    maxInactiveAge: 10 * 60 * 1000,
    pagesBufferLength: 60,
  },
  async redirects() {
    return [
      // Old WordPress booking page now lives on the intake survey.
      {
        source: "/booking",
        destination: "https://survey.myesatherapist.com/v1",
        statusCode: 301,
      },
      {
        source: "/booking/",
        destination: "https://survey.myesatherapist.com/v1",
        statusCode: 301,
      },
      {
        source: "/esa-doctors/dr-robert-staff",
        destination: "/esa-doctors/dr-robert-staaf/",
        statusCode: 301,
      },
      {
        source: "/esa-doctors/dr-robert-staff/",
        destination: "/esa-doctors/dr-robert-staaf/",
        statusCode: 301,
      },
      {
        source: "/esa-doctors/robert-staaf",
        destination: "/esa-doctors/dr-robert-staaf/",
        statusCode: 301,
      },
      {
        source: "/esa-doctors/robert-staaf/",
        destination: "/esa-doctors/dr-robert-staaf/",
        statusCode: 301,
      },
      {
        source: "/author/allyson-valley",
        destination: "/contributors/allyson-valley/",
        statusCode: 301,
      },
      {
        source: "/author/allyson-valley/",
        destination: "/contributors/allyson-valley/",
        statusCode: 301,
      },
      {
        source: "/author/mohammed-ziauddin",
        destination: "/contributors/mohammed-ziauddin/",
        statusCode: 301,
      },
      {
        source: "/author/mohammed-ziauddin/",
        destination: "/contributors/mohammed-ziauddin/",
        statusCode: 301,
      },
    ];
  },
  compress: false,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.module.rules.push({
        test: /app-router-utils\.js$/,
        enforce: "pre" as const,
        use: [path.join(__dirname, "tools/dev-prefetch-loader.cjs")],
      });
    }
    return config;
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    qualities: [85, 90, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
};

export default nextConfig;
