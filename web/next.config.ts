import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Foto listing dikompresi client-side jadi ~300-500KB,
      // tapi kasih ruang sampai 5MB sebagai safety net.
      bodySizeLimit: "5mb",
    },
  },
  // Izinkan Next/Image memuat foto dari Supabase Storage (public bucket).
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yhpisnppfwhfeypebkws.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
