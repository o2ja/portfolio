import type { NextConfig } from "next";

/**
 * The browser always talks to the API through this origin, at /api/*, which
 * the rewrite forwards to FastAPI. Same-origin is deliberate: the admin
 * session cookie is SameSite=Lax, so a cross-origin call would not carry it,
 * and keeping one origin means no CORS preflight on every request.
 *
 * Server Components skip the rewrite and call BACKEND_URL directly.
 */
const backendUrl = process.env.BACKEND_URL ?? "http://127.0.0.1:8000";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async rewrites() {
    return [{ source: "/api/:path*", destination: `${backendUrl}/api/:path*` }];
  },

  images: {
    // Product images are whatever URL an admin saves, so remote hosts must be
    // allowed explicitly rather than wildcarded.
    remotePatterns: [
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "**.cloudfront.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=(), payment=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
