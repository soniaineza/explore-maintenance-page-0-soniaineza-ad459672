import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'alt',
  },
  upload: {
    staticDir: path.resolve(dirname, '..', 'public', 'uploads', 'media'),
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
