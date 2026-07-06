import { and, asc, desc, eq, ne, sql } from "drizzle-orm"
import { db } from "@/lib/db"
import { destinations, tours, media } from "@/lib/db/schema"
import type { TourWithImage, DestinationWithImage } from "@/lib/db/schema"

function splitLines(val: string | null): string[] {
  if (!val) return []
  return val.split("\n").map((s) => s.trim()).filter(Boolean)
}

function withImageUrl(tour: typeof tours.$inferSelect): TourWithImage {
  return { ...tour, heroImageUrl: null }
}

function withDestImageUrl(dest: typeof destinations.$inferSelect): DestinationWithImage {
  return { ...dest, heroImageUrl: null }
}

export async function getAllTours(): Promise<TourWithImage[]> {
  const rows = await db
    .select({
      id: tours.id,
      title: tours.title,
      slug: tours.slug,
      destinationId: tours.destinationId,
      shortDescription: tours.shortDescription,
      fullDescription: tours.fullDescription,
      duration: tours.duration,
      price: tours.price,
      itinerary: tours.itinerary,
      highlights: tours.highlights,
      included: tours.included,
      excluded: tours.excluded,
      heroImageId: tours.heroImageId,
      featured: tours.featured,
      published: tours.published,
      createdAt: tours.createdAt,
      updatedAt: tours.updatedAt,
      heroImageUrl: media.url,
    })
    .from(tours)
    .leftJoin(media, eq(tours.heroImageId, media.id))
    .orderBy(asc(tours.duration))

  return rows.map((row) => ({
    ...row,
    heroImageUrl: row.heroImageUrl ?? null,
  }))
}

export async function getFeaturedTours(): Promise<TourWithImage[]> {
  const rows = await db
    .select({
      id: tours.id,
      title: tours.title,
      slug: tours.slug,
      destinationId: tours.destinationId,
      shortDescription: tours.shortDescription,
      fullDescription: tours.fullDescription,
      duration: tours.duration,
      price: tours.price,
      itinerary: tours.itinerary,
      highlights: tours.highlights,
      included: tours.included,
      excluded: tours.excluded,
      heroImageId: tours.heroImageId,
      featured: tours.featured,
      published: tours.published,
      createdAt: tours.createdAt,
      updatedAt: tours.updatedAt,
      heroImageUrl: media.url,
    })
    .from(tours)
    .leftJoin(media, eq(tours.heroImageId, media.id))
    .where(eq(tours.featured, true))
    .orderBy(asc(tours.price))

  return rows.map((row) => ({
    ...row,
    heroImageUrl: row.heroImageUrl ?? null,
  }))
}

export async function getTourBySlug(slug: string): Promise<TourWithImage | null> {
  const rows = await db
    .select({
      id: tours.id,
      title: tours.title,
      slug: tours.slug,
      destinationId: tours.destinationId,
      shortDescription: tours.shortDescription,
      fullDescription: tours.fullDescription,
      duration: tours.duration,
      price: tours.price,
      itinerary: tours.itinerary,
      highlights: tours.highlights,
      included: tours.included,
      excluded: tours.excluded,
      heroImageId: tours.heroImageId,
      featured: tours.featured,
      published: tours.published,
      createdAt: tours.createdAt,
      updatedAt: tours.updatedAt,
      heroImageUrl: media.url,
    })
    .from(tours)
    .leftJoin(media, eq(tours.heroImageId, media.id))
    .where(eq(tours.slug, slug))
    .limit(1)

  if (!rows[0]) return null
  return { ...rows[0], heroImageUrl: rows[0].heroImageUrl ?? null }
}

export async function getRelatedTours(slug: string, _category: string): Promise<TourWithImage[]> {
  const rows = await db
    .select({
      id: tours.id,
      title: tours.title,
      slug: tours.slug,
      destinationId: tours.destinationId,
      shortDescription: tours.shortDescription,
      fullDescription: tours.fullDescription,
      duration: tours.duration,
      price: tours.price,
      itinerary: tours.itinerary,
      highlights: tours.highlights,
      included: tours.included,
      excluded: tours.excluded,
      heroImageId: tours.heroImageId,
      featured: tours.featured,
      published: tours.published,
      createdAt: tours.createdAt,
      updatedAt: tours.updatedAt,
      heroImageUrl: media.url,
    })
    .from(tours)
    .leftJoin(media, eq(tours.heroImageId, media.id))
    .where(ne(tours.slug, slug))
    .limit(3)

  return rows.map((row) => ({
    ...row,
    heroImageUrl: row.heroImageUrl ?? null,
  }))
}

export async function getFeaturedDestinations(): Promise<DestinationWithImage[]> {
  const rows = await db
    .select({
      id: destinations.id,
      title: destinations.title,
      slug: destinations.slug,
      shortDescription: destinations.shortDescription,
      fullDescription: destinations.fullDescription,
      heroImageId: destinations.heroImageId,
      location: destinations.location,
      featured: destinations.featured,
      published: destinations.published,
      seoTitle: destinations.seoTitle,
      seoDescription: destinations.seoDescription,
      createdAt: destinations.createdAt,
      updatedAt: destinations.updatedAt,
      heroImageUrl: media.url,
    })
    .from(destinations)
    .leftJoin(media, eq(destinations.heroImageId, media.id))
    .where(eq(destinations.featured, true))
    .orderBy(desc(destinations.createdAt))

  return rows.map((row) => ({
    ...row,
    heroImageUrl: row.heroImageUrl ?? null,
  }))
}

export async function getAllDestinations(): Promise<DestinationWithImage[]> {
  const rows = await db
    .select({
      id: destinations.id,
      title: destinations.title,
      slug: destinations.slug,
      shortDescription: destinations.shortDescription,
      fullDescription: destinations.fullDescription,
      heroImageId: destinations.heroImageId,
      location: destinations.location,
      featured: destinations.featured,
      published: destinations.published,
      seoTitle: destinations.seoTitle,
      seoDescription: destinations.seoDescription,
      createdAt: destinations.createdAt,
      updatedAt: destinations.updatedAt,
      heroImageUrl: media.url,
    })
    .from(destinations)
    .leftJoin(media, eq(destinations.heroImageId, media.id))
    .orderBy(asc(destinations.title))

  return rows.map((row) => ({
    ...row,
    heroImageUrl: row.heroImageUrl ?? null,
  }))
}

export async function getDestinationBySlug(slug: string): Promise<DestinationWithImage | null> {
  const rows = await db
    .select({
      id: destinations.id,
      title: destinations.title,
      slug: destinations.slug,
      shortDescription: destinations.shortDescription,
      fullDescription: destinations.fullDescription,
      heroImageId: destinations.heroImageId,
      location: destinations.location,
      featured: destinations.featured,
      published: destinations.published,
      seoTitle: destinations.seoTitle,
      seoDescription: destinations.seoDescription,
      createdAt: destinations.createdAt,
      updatedAt: destinations.updatedAt,
      heroImageUrl: media.url,
    })
    .from(destinations)
    .leftJoin(media, eq(destinations.heroImageId, media.id))
    .where(eq(destinations.slug, slug))
    .limit(1)

  if (!rows[0]) return null
  return { ...rows[0], heroImageUrl: rows[0].heroImageUrl ?? null }
}

export async function getToursForDestination(destinationId: number): Promise<TourWithImage[]> {
  const rows = await db
    .select({
      id: tours.id,
      title: tours.title,
      slug: tours.slug,
      destinationId: tours.destinationId,
      shortDescription: tours.shortDescription,
      fullDescription: tours.fullDescription,
      duration: tours.duration,
      price: tours.price,
      itinerary: tours.itinerary,
      highlights: tours.highlights,
      included: tours.included,
      excluded: tours.excluded,
      heroImageId: tours.heroImageId,
      featured: tours.featured,
      published: tours.published,
      createdAt: tours.createdAt,
      updatedAt: tours.updatedAt,
      heroImageUrl: media.url,
    })
    .from(tours)
    .leftJoin(media, eq(tours.heroImageId, media.id))
    .where(eq(tours.destinationId, destinationId))
    .orderBy(asc(tours.price))

  return rows.map((row) => ({
    ...row,
    heroImageUrl: row.heroImageUrl ?? null,
  }))
}

export async function getTourOptions() {
  return db
    .select({ slug: tours.slug, title: tours.title })
    .from(tours)
    .orderBy(asc(tours.title))
}
