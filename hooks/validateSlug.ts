import type { CollectionBeforeValidateHook } from 'payload'

export const validateSlug: CollectionBeforeValidateHook = async ({ data, originalDoc, operation, req, collection }) => {
  if (!data?.slug) return
  const slug = String(data.slug).trim()

  const existing = await req.payload.find({
    collection: collection.slug,
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (existing.totalDocs > 0 && existing.docs[0].id !== originalDoc?.id) {
    throw new Error('Slug must be unique')
  }
}
