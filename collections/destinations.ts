import type { CollectionConfig } from 'payload'
import { validateSlug } from '@/hooks/validateSlug'

export const destinations: CollectionConfig = {
  slug: 'destinations',
  labels: {
    singular: 'Destination',
    plural: 'Destinations',
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [validateSlug],
  },
  fields: [
    { name: 'title', type: 'text', label: 'Title', required: true },
    { name: 'slug', type: 'text', label: 'Slug', required: true, admin: { description: 'Unique URL slug' } },
    { name: 'shortDescription', type: 'textarea', label: 'Short Description', required: true },
    { name: 'fullDescription', type: 'textarea', label: 'Full Description', required: true },
    { name: 'heroImage', type: 'upload', label: 'Hero Image', relationTo: 'media', required: true },
    { name: 'galleryImages', type: 'relationship', label: 'Gallery Images', relationTo: 'media', hasMany: true },
    { name: 'location', type: 'text', label: 'Location', required: true },
    { name: 'featured', type: 'checkbox', label: 'Featured', defaultValue: false },
    { name: 'published', type: 'checkbox', label: 'Published', defaultValue: false },
    { name: 'seoTitle', type: 'text', label: 'SEO Title' },
    { name: 'seoDescription', type: 'textarea', label: 'SEO Description' },
  ],
}
