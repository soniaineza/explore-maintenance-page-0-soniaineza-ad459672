import type { CollectionConfig } from 'payload'

export const gallery: CollectionConfig = {
  slug: 'gallery',
  labels: {
    singular: 'Gallery Image',
    plural: 'Gallery',
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'image', type: 'upload', label: 'Image', relationTo: 'media', required: true },
    { name: 'title', type: 'text', label: 'Title' },
    { name: 'caption', type: 'text', label: 'Caption' },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        { label: 'Nature', value: 'nature' },
        { label: 'Culture', value: 'culture' },
        { label: 'Wildlife', value: 'wildlife' },
        { label: 'Adventure', value: 'adventure' },
      ],
    },
    { name: 'featured', type: 'checkbox', label: 'Featured', defaultValue: false },
  ],
}
