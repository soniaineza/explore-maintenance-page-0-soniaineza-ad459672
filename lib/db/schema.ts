import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  region: text("region").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  bestTime: text("best_time"),
  highlights: text("highlights").array().notNull().default([]),
  imageUrl: text("image_url").notNull(),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export type ItineraryStep = {
  day: number
  title: string
  detail: string
}

export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  durationDays: integer("duration_days").notNull(),
  groupSize: text("group_size"),
  difficulty: text("difficulty"),
  priceUsd: integer("price_usd").notNull(),
  destinationSlug: text("destination_slug"),
  highlights: text("highlights").array().notNull().default([]),
  itinerary: jsonb("itinerary").$type<ItineraryStep[]>().notNull().default([]),
  included: text("included").array().notNull().default([]),
  imageUrl: text("image_url").notNull(),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  tourSlug: text("tour_slug"),
  travelDate: text("travel_date"),
  groupSize: integer("group_size"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export type Destination = typeof destinations.$inferSelect
export type Tour = typeof tours.$inferSelect
export type Inquiry = typeof inquiries.$inferSelect
