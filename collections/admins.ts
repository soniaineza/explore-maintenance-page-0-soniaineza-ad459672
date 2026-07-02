import type { CollectionConfig } from 'payload'

export const admins: CollectionConfig = {
  slug: 'admins',
  auth: {
    tokenExpiration: 60 * 60 * 24,
    verify: true,
  },
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Admin',
    plural: 'Admins',
  },
  fields: [
    { name: 'name', type: 'text', label: 'Name', required: true },
  ],
}
