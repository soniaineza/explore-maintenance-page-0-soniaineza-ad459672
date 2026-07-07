import { mkdirSync } from 'fs'
import path from 'path'
import type { CollectionConfig } from 'payload'

const uploadDir = path.resolve(process.cwd(), 'public/uploads')

mkdirSync(uploadDir, { recursive: true })

export const media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  admin: {
    useAsTitle: 'alt',
  },
  upload: {
    staticDir: uploadDir,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    imageSizes: [
      {
        name: 'card',
        width: 1200,
        height: 800,
      },
    ],
  },
  fields: [
    { name: 'alt', type: 'text', label: 'Alt text', required: true },
    { name: 'caption', type: 'text', label: 'Caption' },
  ],
}
