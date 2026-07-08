import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'
import { media } from './collections/media'
import { destinations } from './collections/destinations'
import { tours } from './collections/tours'
import { gallery } from './collections/gallery'
import { homepage } from './globals/homepage'
import { about } from './globals/about'
import { contact } from './globals/contact'
import { admins } from './collections/admins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generatedTypesPath = path.resolve(dirname, 'payload-types.ts')
const typescriptConfig = process.env.NODE_ENV === 'production' ? undefined : { outputFile: generatedTypesPath }

const config = buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  secret: process.env.PAYLOAD_SECRET || 'CHANGE_ME',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    push: false,
  }),
  plugins: [
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: {
              media: {
                clientUploads: true,
              },
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
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

export default config
