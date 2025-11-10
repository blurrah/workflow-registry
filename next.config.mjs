/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/r/:path((?!.*\\.json$).*)',
        destination: '/r/:path.json',
      },
    ];
  },
}

export default nextConfig