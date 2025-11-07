import { withContentlayer } from 'next-contentlayer'

const repoBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? ''
const normalizedBasePath = repoBasePath
  ? repoBasePath.startsWith('/')
    ? repoBasePath.replace(/\/$/, '')
    : `/${repoBasePath.replace(/\/$/, '')}`
  : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  ...(normalizedBasePath
    ? {
        basePath: normalizedBasePath,
        assetPrefix: normalizedBasePath,
      }
    : {}),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
}

export default withContentlayer(nextConfig)
