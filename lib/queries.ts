import { getPayload } from '@/lib/payload'
import type { Tour, Destination, Media } from '@/payload-types'

export interface TourWithImage extends Omit<Tour, 'heroImage' | 'destination'> {
  heroImageUrl: string | null
  destination: number | (Destination & { heroImageUrl?: string | null })
}

export interface DestinationWithImage extends Omit<Destination, 'heroImage'> {
  heroImageUrl: string | null
}

export function resolveMediaUrl(media: number | Media | undefined | null): string | null {
  if (!media || typeof media === 'number') return null
  const url = (media as Media).url
  if (!url) return null
  if (url.startsWith('/')) return url
  try {
    const parsed = new URL(url)
    if (parsed.pathname.startsWith('/api/payload/')) {
      return parsed.pathname
    }
    return url
  } catch {
    return url
  }
}

export async function getAllTours(): Promise<TourWithImage[]> {
  try {
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
  } catch (error) {
    console.error('Failed to fetch tours:', error)
    return []
  }
}

export async function getFeaturedTours(): Promise<TourWithImage[]> {
  try {
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
  } catch (error) {
    console.error('Failed to fetch featured tours:', error)
    return []
  }
}

export async function getTourBySlug(slug: string): Promise<TourWithImage | null> {
  try {
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
  } catch (error) {
    console.error(`Failed to fetch tour by slug "${slug}":`, error)
    return null
  }
}

export async function getRelatedTours(slug: string, destinationId?: number): Promise<TourWithImage[]> {
  try {
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
  } catch (error) {
    console.error('Failed to fetch related tours:', error)
    return []
  }
}

export async function getFeaturedDestinations(): Promise<DestinationWithImage[]> {
  try {
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
  } catch (error) {
    console.error('Failed to fetch featured destinations:', error)
    return []
  }
}

export async function getAllDestinations(): Promise<DestinationWithImage[]> {
  try {
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
  } catch (error) {
    console.error('Failed to fetch destinations:', error)
    return []
  }
}

export async function getDestinationBySlug(slug: string): Promise<DestinationWithImage | null> {
  try {
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
  } catch (error) {
    console.error(`Failed to fetch destination by slug "${slug}":`, error)
    return null
  }
}

export async function getToursForDestination(destinationId: number): Promise<TourWithImage[]> {
  try {
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
  } catch (error) {
    console.error(`Failed to fetch tours for destination ${destinationId}:`, error)
    return []
  }
}

export async function getTourOptions(): Promise<{ slug: string; title: string }[]> {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'tours',
      where: { published: { equals: true } },
      select: { slug: true, title: true },
      sort: 'title',
    })
    return result.docs as { slug: string; title: string }[]
  } catch (error) {
    console.error('Failed to fetch tour options:', error)
    return []
  }
}
