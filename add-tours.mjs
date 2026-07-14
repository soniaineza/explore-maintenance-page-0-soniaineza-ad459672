import { getPayload } from 'payload'
import config from './payload.config.ts'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MEDIA_DIR = path.resolve(__dirname, 'media')

/**
 * Upload a media file from the media/ directory and return its ID.
 */
async function uploadMedia(payload, alt, filename, mimeType) {
  const filePath = path.join(MEDIA_DIR, filename)
  if (!fs.existsSync(filePath)) {
    return null
  }
  const fileBuffer = fs.readFileSync(filePath)
  const created = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: fileBuffer,
      mimetype: mimeType,
      name: filename,
      size: fileBuffer.length,
    },
  })
  return created.id
}

/**
 * Find an existing media record by its alt text.
 */
async function findMediaByAlt(payload, alt) {
  const result = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
  })
  return result.docs.length > 0 ? result.docs[0].id : null
}

/**
 * Ensure a media record exists for the given alt/filename. Returns media ID.
 */
async function ensureMedia(payload, alt, filename, mimeType) {
  let mediaId = await findMediaByAlt(payload, alt)
  if (mediaId) return mediaId
  mediaId = await uploadMedia(payload, alt, filename, mimeType)
  if (mediaId) {
    console.log(`  Created media: ${alt} (id: ${mediaId})`)
  }
  return mediaId
}

async function addTours() {
  const payload = await getPayload({ config })

  // First, get all destinations
  const destinations = await payload.find({
    collection: 'destinations',
    where: { published: { equals: true } },
    depth: 0,
  })

  console.log('Destinations:')
  const destMap = {}
  for (const d of destinations.docs) {
    destMap[d.slug] = d.id
    console.log(`  - ${d.title} (id: ${d.id}, slug: ${d.slug})`)
  }

  console.log('\nEnsuring media files are uploaded...')

  const mediaDefs = [
    { alt: 'Akagera National Park', filename: 'akagera-safari.webp', mimeType: 'image/webp' },
    { alt: 'Volcanoes National Park', filename: 'volcanoes-national-park.webp', mimeType: 'image/webp' },
  ]

  const mediaIds = {}
  for (const m of mediaDefs) {
    const id = await ensureMedia(payload, m.alt, m.filename, m.mimeType)
    if (id) mediaIds[m.alt] = id
  }

  const tourData = [
    {
      title: '1 Day Akagera Wildlife Safari',
      slug: '1-day-akagera-wildlife-safari',
      destination: destMap['akagera-national-park'],
      shortDescription: 'A full-day safari adventure through Akagera National Park with game drives and lakeside lunch.',
      fullDescription: 'Experience the incredible wildlife of Akagera National Park in a single action-packed day. Starting early from Kigali, you\'ll journey east through the rolling hills to Rwanda\'s only Big Five reserve. The day includes a morning game drive, a scenic lunch at Mihindi Campsite Restaurant, and an afternoon game drive heading north before returning to Kigali.',
      duration: 1,
      price: 250,
      itinerary: `Pick up at your accommodation/hotel in Kigali at 4:45AM
Scenic drive to Akagera National Park
Morning Coffee at Imigongo art center
Check in at Akagera National Park South Gate
Akagera game drive
Lunch at Mihindi Campsite Restaurant
Afternoon game drive heading to North Gate
Checking out
Heading home to your accommodation/hotel`,
      highlights: `Big Five game viewing
Morning coffee at Imigongo art center
Scenic drive through eastern Rwanda
Expert professional guide`,
      included: `Morning Coffee
Juice
Water
Lunch
Transport
Professional Guide`,
      excluded: `Accommodation
Insurance
Visa
Anything else not mentioned in Inclusions`,
      heroImage: mediaIds['Akagera National Park'],
      featured: true,
      published: true,
    },
    {
      title: '2 Days Akagera Wildlife Safari',
      slug: '2-days-akagera-wildlife-safari',
      destination: destMap['akagera-national-park'],
      shortDescription: 'An immersive overnight safari with game drives and accommodation inside Akagera National Park.',
      fullDescription: 'Extend your safari experience with an overnight stay inside Akagera National Park. This two-day adventure offers more game viewing time, including afternoon and morning game drives. Stay overnight at Mantis Akagera Game Lodge with dinner included.',
      duration: 2,
      price: 700,
      itinerary: `Day 1:
Pick up at your accommodation/hotel in Kigali at 4:45AM
Scenic drive to Akagera National Park
Morning Coffee at Imigongo art center
Check in at Akagera National Park South Gate
Akagera game drive
Lunch and check in at Mantis Akagera Game Lodge
Afternoon game drive and heading back to hotel
Dinner at Akagera Game Lodge

Day 2:
Breakfast at Akagera Game Lodge
Morning game drive
Lunch at Akagera Game Lodge
Afternoon game drive and check out
Drive to Kigali and drop off at accommodation/hotel`,
      highlights: `Overnight at Mantis Akagera Game Lodge
Multiple game drives
Sunset dinner in the park
Maximum wildlife viewing`,
      included: `Breakfast
Juice
Water
Lunch
Transport
Professional Guide
1 Night Accommodation in Akagera National Park`,
      excluded: `Accommodation In Kigali City
Insurance
Visa
Anything else not mentioned in Inclusions`,
      heroImage: mediaIds['Akagera National Park'],
      featured: true,
      published: true,
    },
    {
      title: '1 Day Volcanoes Gorilla Trekking',
      slug: '1-day-volcanoes-gorilla-trekking',
      destination: destMap['volcanoes-national-park'],
      shortDescription: 'Trek mountain gorillas in Volcanoes National Park — the ultimate Rwandan wildlife encounter.',
      fullDescription: 'The quintessential Rwanda experience — an unforgettable encounter with mountain gorillas in their natural habitat. Departing early from Kigali, you\'ll drive north to Volcanoes National Park for a briefing before trekking through bamboo and montane forest to observe a gorilla family for one magical hour.',
      duration: 1,
      price: 1800,
      itinerary: `Pick up at your accommodation/hotel in Kigali at 4:45AM
Scenic drive to Volcanoes National Park
Morning Coffee
Check in at Volcanoes National Park
Gorilla trekking
Lunch in Musanze City
Heading back to Kigali to your accommodation/hotel`,
      highlights: `One-hour encounter with mountain gorillas
Guided trek through bamboo forest
Expert trackers and rangers
Scenic drive through the Virunga region`,
      included: `Morning Coffee
Juice
Water
Lunch
Transport
Professional Guide`,
      excluded: `Accommodation
Insurance
Visa
Anything else not mentioned in Inclusions`,
      heroImage: mediaIds['Volcanoes National Park'],
      featured: true,
      published: true,
    },
    {
      title: '2 Days Volcanoes Gorilla Trekking',
      slug: '2-days-volcanoes-gorilla-trekking',
      destination: destMap['volcanoes-national-park'],
      shortDescription: 'An extended gorilla trekking experience with overnight stay in Musanze and optional city tour.',
      fullDescription: 'Take your gorilla trekking experience further with an overnight stay at the historic Bishop\'s House Rwanda. After trekking, enjoy lunch and explore Musanze town. Day two offers a relaxed scenic drive back to Kigali with an optional Kigali city tour.',
      duration: 2,
      price: 2200,
      itinerary: `Day 1:
Pick up at pick up location
Scenic drive to Musanze
Check in at the Bishop's House Rwanda
Scenic drive to Volcanoes National Park
Check in at Volcanoes National Park
Gorilla trekking
Lunch at the Bishop's House Rwanda
Optional Musanze city tour / nightlife tour

Day 2:
Breakfast
Scenic drive to Kigali
Optional Kigali city tour
Drop off at pick up location, Accommodation`,
      highlights: `Overnight at the historic Bishop's House Rwanda
Gorilla trekking with expert guides
Optional Musanze nightlife tour
Optional Kigali city tour`,
      included: `Breakfast
Lunch
Transport
Professional Guide
1 Night Accommodation`,
      excluded: `Insurance
Visa
Anything else not mentioned in Inclusions`,
      heroImage: mediaIds['Volcanoes National Park'],
      featured: true,
      published: true,
    },
  ]

  console.log('\nAdding tours...')
  for (const tour of tourData) {
    if (!tour.destination) {
      console.log(`  SKIP: ${tour.title} - destination not found`)
      continue
    }
    if (!tour.heroImage) {
      console.log(`  SKIP: ${tour.title} - hero image not found`)
      continue
    }

    try {
      const existing = await payload.find({
        collection: 'tours',
        where: { slug: { equals: tour.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  EXISTS: ${tour.title}`)
        continue
      }

      const created = await payload.create({
        collection: 'tours',
        data: tour,
      })
      console.log(`  CREATED: ${tour.title} (id: ${created.id})`)
    } catch (error) {
      console.log(`  ERROR: ${tour.title} - ${error.message}`)
    }
  }

  console.log('\nDone!')
  process.exit(0)
}

addTours().catch((error) => {
  console.error('Failed:', error)
  process.exit(1)
})
