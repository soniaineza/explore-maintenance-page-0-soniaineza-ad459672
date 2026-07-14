import { getPayload } from 'payload'
import config from '../../payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MEDIA_DIR = path.resolve(__dirname, '..', '..', 'media')

async function seed() {
  const payload = await getPayload({ config })

  /**
   * Find an existing media record by its alt text to avoid duplicates on re-run.
   */
  async function findMediaByAlt(payload: any, alt: string): Promise<number | null> {
    try {
      const result = await payload.find({
        collection: 'media',
        where: { alt: { equals: alt } },
        limit: 1,
      })
      return result.docs.length > 0 ? result.docs[0].id : null
    } catch {
      return null
    }
  }

  console.log('Uploading media files...')

  const mediaFiles = [
    { alt: 'Akagera National Park', filename: 'akagera-safari.webp', mimeType: 'image/webp' },
    { alt: 'Volcanoes National Park', filename: 'volcanoes-national-park.webp', mimeType: 'image/webp' },
    { alt: 'Nyungwe Forest National Park', filename: 'nyungwe-forest.webp', mimeType: 'image/webp' },
    { alt: 'Kigali City', filename: 'kigali-city.webp', mimeType: 'image/webp' },
  ]

  const mediaIds: Record<string, number> = {}
  for (const m of mediaFiles) {
    // Check if media already exists by alt text (idempotent re-runs)
    const existingId = await findMediaByAlt(payload, m.alt)
    if (existingId) {
      mediaIds[m.filename] = existingId
      console.log(`  EXISTS: ${m.alt} (id: ${existingId})`)
      continue
    }

    const filePath = path.join(MEDIA_DIR, m.filename)
    if (!fs.existsSync(filePath)) {
      console.log(`  SKIP: ${m.filename} - file not found at ${filePath}`)
      continue
    }

    const fileBuffer = fs.readFileSync(filePath)

    try {
      const created = await payload.create({
        collection: 'media',
        data: {
          alt: m.alt,
        },
        file: {
          data: fileBuffer,
          mimetype: m.mimeType,
          name: m.filename,
          size: fileBuffer.length,
        },
      })
      mediaIds[m.filename] = created.id
      console.log(`  Created media: ${m.alt} (id: ${created.id})`)
    } catch (error) {
      console.log(`  ERROR creating media ${m.filename}:`, error)
    }
  }

  if (Object.keys(mediaIds).length === 0) {
    console.error('No media files were uploaded. Aborting seed.')
    process.exit(1)
  }

  console.log('Creating destinations...')

  const destData = [
    {
      title: 'Akagera National Park',
      slug: 'akagera-national-park',
      shortDescription: "Rwanda's Big Five safari destination — savanna, lakes, and incredible wildlife.",
      fullDescription: 'Akagera National Park is Rwanda\'s premiere savanna national park, covering 1,122 square kilometers in the east of the country. Established in 1934, it has undergone an incredible conservation revival, reintroducing lion, black rhino, and other species in recent years. Today it is one of the most accessible parks in Africa, offering classic game drives through diverse landscapes of acacia woodland, swamp, and open plains. Lake Ihema is the largest of several lakes within the park and provides excellent boat safaris where visitors can spot hippos, crocodiles, and abundant waterbirds.',
      location: 'Eastern Province',
      featured: true,
      heroImage: mediaIds['akagera-safari.webp'],
    },
    {
      title: 'Volcanoes National Park',
      slug: 'volcanoes-national-park',
      shortDescription: 'Home to the magnificent mountain gorillas and the Virunga volcanoes.',
      fullDescription: 'Volcanoes National Park is a breathtaking protected area in northwestern Rwanda, part of the Virunga Mountains. It is world-famous for its population of endangered mountain gorillas, which were brought to global attention by primatologist Dian Fossey. The park features five of the eight volcanoes in the Virunga range, including Mount Karisimbi — the highest at 4,507 meters. Visitors can trek through dense bamboo forests to observe gorilla families in their natural habitat, hike volcanoes, and visit the Dian Fossey Grave and research center.',
      location: 'Musanze',
      featured: true,
      heroImage: mediaIds['volcanoes-national-park.webp'],
    },
    {
      title: 'Nyungwe National Park',
      slug: 'nyungwe-national-park',
      shortDescription: 'One of Africa\'s oldest rainforests — chimpanzees, canopy walks, and stunning biodiversity.',
      fullDescription: 'Nyungwe Forest National Park is a sprawling montane rainforest in southwestern Rwanda, one of the oldest in Africa. Spanning over 1,000 square kilometers, it is a biodiversity hotspot with over 1,000 plant species, 300 bird species, and 13 species of primates — including chimpanzees, colobus monkeys, and L\'Hoest\'s monkeys. The park is famous for its canopy walkway suspended 50 meters above the forest floor, offering panoramic views of the lush greenery.',
      location: 'Southwest',
      featured: true,
      heroImage: mediaIds['nyungwe-forest.webp'],
    },
    {
      title: 'Kigali City',
      slug: 'kigali-city',
      shortDescription: 'Africa\'s cleanest and most welcoming capital — hills, culture, and warm hospitality.',
      fullDescription: 'Kigali is the vibrant capital city of Rwanda, nestled among rolling hills and known for its cleanliness, safety, and warm hospitality. As the economic and cultural heart of the nation, Kigali offers a fascinating blend of modern development and traditional Rwandan culture. The city is home to world-class restaurants, a burgeoning arts scene, the moving Kigali Genocide Memorial, and excellent craft markets. Kigali also serves as the gateway to the rest of the country, with easy access to all major national parks.',
      location: 'Kigali Province',
      featured: true,
      heroImage: mediaIds['kigali-city.webp'],
    },
  ] satisfies { title: string; slug: string; shortDescription: string; fullDescription: string; location: string; featured: boolean; heroImage: number }[]

  const destMap: Record<string, number> = {}
  for (const d of destData) {
    // Check if destination already exists
    const existing = await payload.find({
      collection: 'destinations',
      where: { slug: { equals: d.slug } },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      destMap[d.slug] = existing.docs[0].id
      console.log(`  EXISTS: ${d.title} (id: ${existing.docs[0].id})`)
      continue
    }
    const created = await payload.create({ collection: 'destinations', data: { ...d, published: true } })
    destMap[d.slug] = created.id
    console.log(`  Created destination: ${d.title} (id: ${created.id})`)
  }

  console.log('Creating tours...')

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
      heroImage: mediaIds['akagera-safari.webp'],
      featured: true,
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
      heroImage: mediaIds['akagera-safari.webp'],
      featured: true,
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
      heroImage: mediaIds['volcanoes-national-park.webp'],
      featured: true,
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
      heroImage: mediaIds['volcanoes-national-park.webp'],
      featured: true,
    },
  ] satisfies { title: string; slug: string; destination: number; shortDescription: string; fullDescription: string; duration: number; price: number; itinerary: string; highlights: string; included: string; excluded: string; heroImage: number; featured: boolean }[]

  for (const t of tourData) {
    // Check if tour already exists
    const existing = await payload.find({
      collection: 'tours',
      where: { slug: { equals: t.slug } },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      console.log(`  EXISTS: ${t.title} (id: ${existing.docs[0].id})`)
      continue
    }
    const created = await payload.create({ collection: 'tours', data: { ...t, published: true } })
    console.log(`  Created tour: ${t.title} (id: ${created.id})`)
  }

  console.log('Seeding globals...')

  await payload.updateGlobal({
    slug: 'about',
    data: {
      aboutTitle: 'About TruRwanda',
      description: 'TruRwanda is a Rwandan-owned travel company dedicated to showcasing the beauty, diversity, and warmth of Rwanda to the world. Founded by local travel experts who know every corner of the country, we craft personalized journeys that go beyond the typical tourist trail.\n\nFrom the misty bamboo forests of Volcanoes National Park where mountain gorillas roam, to the sweeping savannas of Akagera where lions and elephants roam free, from the ancient rainforest of Nyungwe to the tranquil shores of Lake Kivu — we bring Rwanda to life through authentic, responsible travel experiences.',
      mission: 'To provide unforgettable, responsible travel experiences that showcase Rwanda\'s natural beauty while supporting local communities and conservation efforts.',
      vision: 'A world where every traveler discovers the heart of Rwanda — its people, its landscapes, and its extraordinary wildlife — through journeys that leave a positive impact.',
    },
  })
  console.log('  Updated About global')

  await payload.updateGlobal({
    slug: 'contact',
    data: {
      email: 'hello@trurwanda.com',
      phone: '+250 795 581 177',
      whatsapp: '+250795581177',
      address: 'Norrsken Kigali House, KN 78 St, Kigali, Rwanda',
    },
  })
  console.log('  Updated Contact global')

  console.log('Creating admin user...')

  try {
    const existingAdmins = await payload.find({
      collection: 'admins',
      limit: 1,
    })

    if (existingAdmins.totalDocs === 0) {
      await payload.create({
        collection: 'admins',
        data: {
          email: 'admin@trurwanda.com',
          password: 'Admin123!',
          name: 'Admin',
        },
      })
      console.log('  Created admin user: admin@trurwanda.com / Admin123!')
    } else {
      console.log('  Admin user already exists')
    }
  } catch (error) {
    console.log('  Could not create admin user (may already exist):', error)
  }

  console.log('\n========================================')
  console.log('  Seed complete!')
  console.log('  Data seeded: 4 destinations, 4 tours')
  console.log('  Admin login: admin@trurwanda.com / Admin123!')
  console.log('  Admin URL: http://localhost:3000/admin')
  console.log('========================================')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
