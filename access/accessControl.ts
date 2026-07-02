import type { Access } from 'payload'

export const accessControl = {
  read: (): true => true,
  create: (): true => true,
  update: (): true => true,
  delete: (): true => true,
}
