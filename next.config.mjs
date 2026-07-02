/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  webpack(config, { isServer }) {
    if (isServer) {
      const externalModules = [
        '@payloadcms/db-postgres',
        '@payloadcms/drizzle',
        'drizzle-kit',
        '@neondatabase/serverless',
        '@planetscale/database',
        '@vercel/postgres',
        '@esbuild/win32-x64',
      ]

      if (Array.isArray(config.externals)) {
        config.externals.push(...externalModules)
      } else if (typeof config.externals === 'function') {
        const originalExternals = config.externals
        config.externals = async (...args) => {
          const result = await originalExternals(...args)
          return Array.isArray(result) ? [...result, ...externalModules] : result
        }
      }
    }

    return config
  },
}

export default nextConfig
