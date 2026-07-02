import type { GlobalConfig } from 'payload'

export const about: GlobalConfig = {
  slug: 'about',
  label: 'About',
  fields: [
    { name: 'aboutTitle', type: 'text', label: 'About Title', required: true },
    { name: 'description', type: 'textarea', label: 'Description', required: true },
    { name: 'mission', type: 'textarea', label: 'Mission' },
    { name: 'vision', type: 'textarea', label: 'Vision' },
  ],
}
