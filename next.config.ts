import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 31,
    remotePatterns: [{
      protocol: "https",
      hostname: "raw.githubusercontent.com",
      pathname: "/MiquelGomezCorral/**",
    }],
  },
}

export default nextConfig
