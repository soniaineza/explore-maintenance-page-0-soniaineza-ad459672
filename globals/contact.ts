import type { GlobalConfig } from 'payload'

export const contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact',
  fields: [
    { name: 'email', type: 'text', label: 'Email' },
    { name: 'phone', type: 'text', label: 'Phone' },
    { name: 'whatsapp', type: 'text', label: 'WhatsApp' },
    { name: 'address', type: 'text', label: 'Address' },
    { name: 'facebook', type: 'text', label: 'Facebook' },
    { name: 'instagram', type: 'text', label: 'Instagram' },
    { name: 'x', type: 'text', label: 'X' },
    { name: 'linkedin', type: 'text', label: 'LinkedIn' },
  ],
}
