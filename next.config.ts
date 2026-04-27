import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.18"],
  transpilePackages: ["react-leaflet", "@react-leaflet/core", "leaflet"],
};

export default nextConfig;
