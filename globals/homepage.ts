import type { GlobalConfig } from 'payload'

export const homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  fields: [
    { name: 'heroTitle', type: 'text', label: 'Hero Title', required: true },
    { name: 'heroSubtitle', type: 'text', label: 'Hero Subtitle' },
    { name: 'heroBackgroundImage', type: 'upload', label: 'Hero Background Image', relationTo: 'media' },
    { name: 'featuredDestinations', type: 'relationship', label: 'Featured Destinations', relationTo: 'destinations', hasMany: true },
    { name: 'featuredTours', type: 'relationship', label: 'Featured Tours', relationTo: 'tours', hasMany: true },
    { name: 'ctaTitle', type: 'text', label: 'CTA Title' },
    { name: 'ctaButtonLabel', type: 'text', label: 'CTA Button Label' },
    { name: 'ctaButtonLink', type: 'text', label: 'CTA Button Link' },
  ],
}
