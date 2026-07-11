import { getPayload } from '@/lib/payload'
import type { Tour, Destination, Media } from '@/payload-types'

export interface TourWithImage extends Omit<Tour, 'heroImage' | 'destination'> {
  heroImageUrl: string | null
  destination: number | (Destination & { heroImageUrl?: string | null })
}

export interface DestinationWithImage extends Omit<Destination, 'heroImage'> {
  heroImageUrl: string | null
}

function resolveMediaUrl(media: number | Media | undefined | null): string | null {
  if (!media || typeof media === 'number') return null
  return (media as Media).url ?? null
}

export async function getAllTours(): Promise<TourWithImage[]> {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'tours',
    where: { published: { equals: true } },
    depth: 1,
    sort: 'duration',
  })
  return result.docs.map((t) => ({
    ...t,
    heroImageUrl: resolveMediaUrl(t.heroImage),
    heroImage: typeof t.heroImage === 'number' ? t.heroImage : (t.heroImage as Media)?.id,
  })) as unknown as TourWithImage[]
}

export async function getFeaturedTours(): Promise<TourWithImage[]> {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'tours',
    where: { featured: { equals: true }, published: { equals: true } },
    depth: 1,
    sort: 'price',
  })
  return result.docs.map((t) => ({
    ...t,
    heroImageUrl: resolveMediaUrl(t.heroImage),
    heroImage: typeof t.heroImage === 'number' ? t.heroImage : (t.heroImage as Media)?.id,
  })) as unknown as TourWithImage[]
}

export async function getTourBySlug(slug: string): Promise<TourWithImage | null> {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'tours',
    where: { slug: { equals: slug }, published: { equals: true } },
    depth: 1,
    limit: 1,
  })
  if (!result.docs[0]) return null
  const t = result.docs[0]
  return {
    ...t,
    heroImageUrl: resolveMediaUrl(t.heroImage),
    heroImage: typeof t.heroImage === 'number' ? t.heroImage : (t.heroImage as Media)?.id,
  } as unknown as TourWithImage
}

export async function getRelatedTours(slug: string, destinationId?: number): Promise<TourWithImage[]> {
  const payload = await getPayload()
  const where: Record<string, unknown> = {
    slug: { not_equals: slug },
    published: { equals: true },
  }
  if (destinationId) {
    where.destination = { equals: destinationId }
  }
  const result = await payload.find({
    collection: 'tours',
    where,
    depth: 1,
    limit: 3,
  })
  return result.docs.map((t) => ({
    ...t,
    heroImageUrl: resolveMediaUrl(t.heroImage),
    heroImage: typeof t.heroImage === 'number' ? t.heroImage : (t.heroImage as Media)?.id,
  })) as unknown as TourWithImage[]
}

export async function getFeaturedDestinations(): Promise<DestinationWithImage[]> {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'destinations',
    where: { featured: { equals: true }, published: { equals: true } },
    depth: 1,
    sort: '-createdAt',
  })
  return result.docs.map((d) => ({
    ...d,
    heroImageUrl: resolveMediaUrl(d.heroImage),
    heroImage: typeof d.heroImage === 'number' ? d.heroImage : (d.heroImage as Media)?.id,
  })) as unknown as DestinationWithImage[]
}

export async function getAllDestinations(): Promise<DestinationWithImage[]> {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'destinations',
    where: { published: { equals: true } },
    depth: 1,
    sort: 'title',
  })
  return result.docs.map((d) => ({
    ...d,
    heroImageUrl: resolveMediaUrl(d.heroImage),
    heroImage: typeof d.heroImage === 'number' ? d.heroImage : (d.heroImage as Media)?.id,
  })) as unknown as DestinationWithImage[]
}

export async function getDestinationBySlug(slug: string): Promise<DestinationWithImage | null> {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'destinations',
    where: { slug: { equals: slug }, published: { equals: true } },
    depth: 1,
    limit: 1,
  })
  if (!result.docs[0]) return null
  const d = result.docs[0]
  return {
    ...d,
    heroImageUrl: resolveMediaUrl(d.heroImage),
    heroImage: typeof d.heroImage === 'number' ? d.heroImage : (d.heroImage as Media)?.id,
  } as unknown as DestinationWithImage
}

export async function getToursForDestination(destinationId: number): Promise<TourWithImage[]> {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'tours',
    where: { destination: { equals: destinationId }, published: { equals: true } },
    depth: 1,
    sort: 'price',
  })
  return result.docs.map((t) => ({
    ...t,
    heroImageUrl: resolveMediaUrl(t.heroImage),
    heroImage: typeof t.heroImage === 'number' ? t.heroImage : (t.heroImage as Media)?.id,
  })) as unknown as TourWithImage[]
}

export async function getTourOptions(): Promise<{ slug: string; title: string }[]> {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'tours',
    where: { published: { equals: true } },
    select: { slug: true, title: true },
    sort: 'title',
  })
  return result.docs as { slug: string; title: string }[]
}
