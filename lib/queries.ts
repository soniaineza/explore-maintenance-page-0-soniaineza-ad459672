import { and, asc, desc, eq, ne } from "drizzle-orm"
import { db } from "@/lib/db"
import { destinations, tours } from "@/lib/db/schema"

export async function getFeaturedTours() {
  return db
    .select()
    .from(tours)
    .where(eq(tours.featured, true))
    .orderBy(asc(tours.priceUsd))
}

export async function getAllTours() {
  return db.select().from(tours).orderBy(asc(tours.durationDays))
}

export async function getToursByCategory(category: string) {
  return db
    .select()
    .from(tours)
    .where(eq(tours.category, category))
    .orderBy(asc(tours.priceUsd))
}

export async function getTourBySlug(slug: string) {
  const rows = await db.select().from(tours).where(eq(tours.slug, slug)).limit(1)
  return rows[0] ?? null
}

export async function getRelatedTours(slug: string, category: string) {
  return db
    .select()
    .from(tours)
    .where(and(eq(tours.category, category), ne(tours.slug, slug)))
    .limit(3)
}

export async function getFeaturedDestinations() {
  return db
    .select()
    .from(destinations)
    .where(eq(destinations.featured, true))
    .orderBy(desc(destinations.createdAt))
}

export async function getAllDestinations() {
  return db.select().from(destinations).orderBy(asc(destinations.name))
}

export async function getDestinationBySlug(slug: string) {
  const rows = await db
    .select()
    .from(destinations)
    .where(eq(destinations.slug, slug))
    .limit(1)
  return rows[0] ?? null
}

export async function getToursForDestination(destinationSlug: string) {
  return db
    .select()
    .from(tours)
    .where(eq(tours.destinationSlug, destinationSlug))
    .orderBy(asc(tours.priceUsd))
}

export async function getTourOptions() {
  return db
    .select({ slug: tours.slug, title: tours.title })
    .from(tours)
    .orderBy(asc(tours.title))
}
