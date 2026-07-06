import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  alt: text("alt").notNull(),
  caption: text("caption"),
  url: text("url"),
  thumbnailURL: text("thumbnail_u_r_l"),
  filename: text("filename"),
  mimeType: text("mime_type"),
  filesize: integer("filesize"),
  width: integer("width"),
  height: integer("height"),
  sizesCardUrl: text("sizes_card_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  heroImageId: integer("hero_image_id"),
  location: text("location").notNull(),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(false),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  destinationId: integer("destination_id").notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  duration: integer("duration").notNull(),
  price: integer("price").notNull(),
  itinerary: text("itinerary"),
  highlights: text("highlights"),
  included: text("included"),
  excluded: text("excluded"),
  heroImageId: integer("hero_image_id"),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
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

export type Media = typeof media.$inferSelect
export type Destination = typeof destinations.$inferSelect
export type Tour = typeof tours.$inferSelect
export type Inquiry = typeof inquiries.$inferSelect

export type TourWithImage = Tour & { heroImageUrl: string | null }
export type DestinationWithImage = Destination & { heroImageUrl: string | null }
