import type { CollectionConfig } from 'payload'

export const tours: CollectionConfig = {
  slug: 'tours',
  labels: {
    singular: 'Tour',
    plural: 'Tours',
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', label: 'Title', required: true },
    { name: 'slug', type: 'text', label: 'Slug', required: true, admin: { description: 'Unique URL slug' } },
    { name: 'destination', type: 'relationship', label: 'Destination', relationTo: 'destinations', required: true },
    { name: 'shortDescription', type: 'textarea', label: 'Short Description', required: true },
    { name: 'fullDescription', type: 'textarea', label: 'Full Description', required: true },
    { name: 'duration', type: 'number', label: 'Duration (days)', required: true },
    { name: 'price', type: 'number', label: 'Price', required: true },
    { name: 'itinerary', type: 'textarea', label: 'Itinerary' },
    { name: 'highlights', type: 'textarea', label: 'Highlights' },
    { name: 'included', type: 'textarea', label: 'Included' },
    { name: 'excluded', type: 'textarea', label: 'Excluded' },
    { name: 'heroImage', type: 'upload', label: 'Hero Image', relationTo: 'media', required: true },
    { name: 'galleryImages', type: 'relationship', label: 'Gallery Images', relationTo: 'media', hasMany: true },
    { name: 'featured', type: 'checkbox', label: 'Featured', defaultValue: false },
    { name: 'published', type: 'checkbox', label: 'Published', defaultValue: false },
  ],
}
