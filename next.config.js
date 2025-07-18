const createNextIntlPlugin = require('next-intl/plugin')

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
}

const withNextIntl = createNextIntlPlugin()
module.exports = withNextIntl(nextConfig)
