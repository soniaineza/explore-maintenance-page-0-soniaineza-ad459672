import type { Config, SanitizedConfig } from 'payload'
import path from 'path'
import { media } from './collections/media'
import { destinations } from './collections/destinations'
import { tours } from './collections/tours'
import { gallery } from './collections/gallery'
import { homepage } from './globals/homepage'
import { about } from './globals/about'
import { contact } from './globals/contact'
import { admins } from './collections/admins'
const generatedTypesPath = path.resolve(__dirname, 'payload-types.ts')
const typescriptConfig = process.env.NODE_ENV === 'production' ? undefined : { outputFile: generatedTypesPath }

export async function getPayloadConfig(): Promise<SanitizedConfig> {
  const payloadPackage = 'payload'
  const dbPackage = '@payloadcms/' + 'db-postgres'
  const { buildConfig } = await import(payloadPackage)
  const { postgresAdapter } = await import(dbPackage)

  return buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    secret: process.env.PAYLOAD_SECRET || 'CHANGE_ME',
    db: postgresAdapter({
      pool: {
        connectionString: process.env.DATABASE_URL,
      },
    }),
    routes: {
      api: '/api/payload',
      admin: '/admin',
    },
    collections: [media, destinations, tours, gallery, admins],
    globals: [homepage, about, contact],
    admin: {
      user: 'admins',
      disable: false,
    },
    ...(typescriptConfig ? { typescript: typescriptConfig } : {}),
  })
}
