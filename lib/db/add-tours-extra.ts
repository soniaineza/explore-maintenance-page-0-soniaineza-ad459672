import { getPayload } from 'payload'
import config from '../../payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const MEDIA_DIR = path.resolve(__dirname, '..', '..', 'media')

async function run() {
  const payload = await getPayload({ config })

  // ── Helper: find media by alt ──────────────────────────
  async function findMediaByAlt(alt: string): Promise<number | null> {
    try {
      const r = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
      return r.docs.length > 0 ? r.docs[0].id : null
    } catch { return null }
  }

  // ── Helper: upload a media file ────────────────────────
  async function uploadMedia(alt: string, filename: string, mimeType: string): Promise<number | null> {
    const existing = await findMediaByAlt(alt)
    if (existing) { console.log(`  EXISTS media: ${alt} (id: ${existing})`); return existing }

    const fp = path.join(MEDIA_DIR, filename)
    if (!fs.existsSync(fp)) { console.log(`  SKIP media: ${filename} not found`); return null }

    const buf = fs.readFileSync(fp)
    const created = await payload.create({
      collection: 'media',
      data: { alt },
      file: { data: buf, mimetype: mimeType, name: filename, size: buf.length },
    })
    console.log(`  CREATED media: ${alt} (id: ${created.id})`)
    return created.id
  }

  // ── Helper: get destination by slug ────────────────────
  async function getDest(slug: string): Promise<number | null> {
    const r = await payload.find({ collection: 'destinations', where: { slug: { equals: slug } }, limit: 1 })
    return r.docs.length > 0 ? r.docs[0].id : null
  }

  // ── Helper: check / create destination ──────────────────
  async function ensureDest(data: {
    title: string; slug: string; shortDescription: string; fullDescription: string;
    location: string; heroImage: number; featured?: boolean
  }): Promise<number | null> {
    const existing = await getDest(data.slug)
    if (existing) { console.log(`  EXISTS destination: ${data.title} (id: ${existing})`); return existing }
    const created = await payload.create({ collection: 'destinations', data: { ...data, published: true } })
    console.log(`  CREATED destination: ${data.title} (id: ${created.id})`)
    return created.id
  }

  // ── Helper: check / create tour ────────────────────────
  async function ensureTour(data: {
    title: string; slug: string; destination: number; shortDescription: string; fullDescription: string;
    duration: number; price: number; itinerary: string; highlights: string; included: string; excluded: string;
    heroImage: number; featured?: boolean
  }): Promise<void> {
    const r = await payload.find({ collection: 'tours', where: { slug: { equals: data.slug } }, limit: 1 })
    if (r.docs.length > 0) { console.log(`  EXISTS tour: ${data.title} (id: ${r.docs[0].id})`); return }
    const created = await payload.create({ collection: 'tours', data: { ...data, published: true } })
    console.log(`  CREATED tour: ${data.title} (id: ${created.id})`)
  }

  // ═══════════════════════════════════════════════════════
  //  1. Upload media for Nyungwe & Lake Kivu
  // ═══════════════════════════════════════════════════════
  console.log('\n── Uploading media ──\n')

  const nyungweImg = await uploadMedia('Nyungwe Forest National Park', 'nyungwe-forest.webp', 'image/webp')
  const nyungweBirdImg = await uploadMedia('Nyungwe Forest Bird', 'nyungwe-bird.webp', 'image/webp')
  const kivuLakeImg = await uploadMedia('Lake Kivu', 'lake-kivu.webp', 'image/webp')
  const kivuSunsetImg = await uploadMedia('Lake Kivu Sunset', 'lake-kivu-sunset.webp', 'image/webp')

  if (!nyungweImg || !kivuLakeImg) {
    console.error('Missing required media – aborting')
    process.exit(1)
  }

  // ═══════════════════════════════════════════════════════
  //  2. Create Lake Kivu destination (Nyungwe already exists)
  // ═══════════════════════════════════════════════════════
  console.log('\n── Creating destinations ──\n')

  const nyungweDest = await getDest('nyungwe-national-park')
  const kivuDest = await ensureDest({
    title: 'Lake Kivu',
    slug: 'lake-kivu',
    shortDescription: 'Tranquil lakeside escapes — beaches, islands, and Rwanda\'s serene inland sea.',
    fullDescription: 'Lake Kivu is one of Africa\'s Great Lakes, stretching along the western border of Rwanda between lush green hills and the towering peaks of the Congo-Nile Divide. Its calm, crocodile-free waters make it one of the few African lakes where swimming and watersports are safe. The lake is dotted with stunning islands and framed by dramatic scenery. Visitors can relax on sandy beaches, kayak to islands, sample fresh tilapia at lakeside restaurants, or take a boat to visit communities on the lake\'s many islands. The resort towns of Gisenyi, Kibuye, and Cyangugu offer a range of accommodations from budget guesthouses to lakeside lodges.',
    location: 'Western Province',
    featured: true,
    heroImage: kivuLakeImg,
  })

  if (!nyungweDest || !kivuDest) {
    console.error('Missing destination – aborting')
    process.exit(1)
  }

  // ═══════════════════════════════════════════════════════
  //  3. Nyungwe Forest tours
  // ═══════════════════════════════════════════════════════
  console.log('\n── Creating Nyungwe tours ──\n')

  await ensureTour({
    title: '1 Day Nyungwe Forest Canopy & Chimpanzee Trek',
    slug: '1-day-nyungwe-forest-canopy-chimpanzee',
    destination: nyungweDest,
    shortDescription: 'Walk Africa\'s highest canopy walkway and track chimpanzees in the ancient rainforest.',
    fullDescription: 'Discover one of Africa\'s oldest rainforests on this action-packed day trip from Kigali. Journey southwest through rolling tea plantations to Nyungwe National Park. Start with a guided chimpanzee tracking experience through dense montane forest — listen for their calls and watch these incredible primates swing through the trees. After lunch, walk the famous canopy suspension bridge suspended 50 metres above the forest floor for breathtaking panoramic views. Return to Kigali in the evening.',
    duration: 1,
    price: 350,
    itinerary: `Pick up at your accommodation in Kigali at 4:30AM
Scenic drive through tea plantations to Nyungwe
Briefing at Nyungwe National Park headquarters
Guided chimpanzee tracking in the rainforest
Lunch at Uwinka Visitor Centre
Walk the canopy suspension bridge (70m high)
Scenic drive back to Kigali
Drop off at your accommodation`,
    highlights: `Chimpanzee tracking in ancient rainforest
Africa's highest canopy walkway
Scenic drive through tea plantations
Expert forest guide with binoculars provided`,
    included: `Morning Coffee
Water
Lunch
Transport
Professional Guide
Park entrance fees
Canopy walkway ticket`,
    excluded: `Accommodation
Insurance
Visa
Anything else not mentioned in Inclusions`,
    heroImage: nyungweBirdImg || nyungweImg,
    featured: true,
  })

  await ensureTour({
    title: '2 Days Nyungwe Forest Primate & Canopy Adventure',
    slug: '2-days-nyungwe-primate-canopy-adventure',
    destination: nyungweDest,
    shortDescription: 'An overnight rainforest escape — chimpanzees, colobus monkeys, and the canopy walkway.',
    fullDescription: 'Immerse yourself in the biodiversity of Nyungwe National Park with an overnight stay near the forest. Day one begins with a morning chimpanzee trek followed by lunch and an afternoon canopy walk. Spend the night at a forest-edge lodge. On day two, explore the Colobus Monkey trail where troops of Angolan colobus monkeys leap through the canopy, then visit a tea plantation before returning to Kigali.',
    duration: 2,
    price: 800,
    itinerary: `Day 1:
Pick up in Kigali at 4:30AM
Scenic drive to Nyungwe
Briefing and chimpanzee tracking
Lunch at Uwinka Visitor Centre
Canopy walkway experience
Check in at forest-edge lodge
Dinner and overnight

Day 2:
Breakfast at lodge
Colobus Monkey trail walk
Visit a tea plantation
Lunch
Scenic drive back to Kigali
Drop off at accommodation`,
    highlights: `Chimpanzee tracking
Canopy walkway
Colobus monkey troops
Tea plantation visit
Overnight in the rainforest`,
    included: `Breakfast
Lunch
Dinner
Water
Transport
Professional Guide
Park entrance fees
1 Night Accommodation`,
    excluded: `Insurance
Visa
Anything else not mentioned in Inclusions`,
    heroImage: nyungweImg,
    featured: true,
  })

  // ═══════════════════════════════════════════════════════
  //  4. Lake Kivu tours
  // ═══════════════════════════════════════════════════════
  console.log('\n── Creating Lake Kivu tours ──\n')

  await ensureTour({
    title: '1 Day Lake Kivu Beach & Island Escape',
    slug: '1-day-lake-kivu-beach-island-escape',
    destination: kivuDest,
    shortDescription: 'A relaxing day on the shores of Lake Kivu — kayaking, swimming, and island exploration.',
    fullDescription: 'Escape the city for a day of relaxation on the shores of Lake Kivu. Drive west to the resort town of Gisenyi, where you\'ll find sandy volcanic beaches and crystal-clear waters. Spend the morning kayaking along the coast and swimming in the safe, crocodile-free lake. After a fresh tilapia lunch at a lakeside restaurant, take a boat to visit one of the lake\'s islands, where you can meet local communities and enjoy panoramic views of the surrounding hills.',
    duration: 1,
    price: 200,
    itinerary: `Pick up in Kigali at 6:00AM
Scenic drive to Gisenyi on Lake Kivu
Arrival and welcome coffee on the beach
Kayaking along the lake shore
Swimming in Lake Kivu
Lunch at a lakeside restaurant (fresh tilapia)
Boat trip to an island
Scenic drive back to Kigali
Drop off at accommodation`,
    highlights: `Kayaking on Africa's Great Lake
Swimming in crocodile-free waters
Fresh tilapia lakeside lunch
Island boat trip
Stunning sunset drive home`,
    included: `Morning Coffee
Water
Lunch
Kayak rental
Boat trip
Transport
Professional Guide`,
    excluded: `Accommodation
Insurance
Visa
Anything else not mentioned in Inclusions`,
    heroImage: kivuSunsetImg || kivuLakeImg,
    featured: true,
  })

  await ensureTour({
    title: '2 Days Lake Kivu Coastal & Islands Retreat',
    slug: '2-days-lake-kivu-coastal-islands-retreat',
    destination: kivuDest,
    shortDescription: 'An overnight lakeside retreat — island hopping, coffee plantations, and sunset on the lake.',
    fullDescription: 'Experience the best of Lake Kivu over two days. Start with a scenic drive to the lakeside, then spend the day kayaking, swimming, and visiting islands. Stay overnight at a beachfront lodge and watch the sunset over the Congo mountains. Day two includes a visit to a local coffee plantation where you can see how Rwanda\'s world-famous coffee is grown and processed, followed by an optional visit to the hot springs before returning to Kigali.',
    duration: 2,
    price: 500,
    itinerary: `Day 1:
Pick up in Kigali at 6:00AM
Scenic drive to Lake Kivu
Kayaking and swimming
Lunch at lakeside restaurant
Boat trip to Napoleon Island
Check in at beachfront lodge
Sunset over the Congo mountains
Dinner at lodge

Day 2:
Breakfast at lodge
Visit a local coffee plantation
Lunch
Optional hot springs visit
Scenic drive back to Kigali
Drop off at accommodation`,
    highlights: `Overnight at beachfront lodge
Island hopping by boat
Coffee plantation tour
Sunset over the Virunga mountains
Safe swimming in the lake`,
    included: `Breakfast
Lunch
Dinner
Water
Transport
Professional Guide
Kayak rental
Boat trip
1 Night Accommodation`,
    excluded: `Insurance
Visa
Hot springs entry fee
Anything else not mentioned in Inclusions`,
    heroImage: kivuLakeImg,
    featured: true,
  })

  // ═══════════════════════════════════════════════════════
  console.log('\n========================================')
  console.log('  Added: Lake Kivu destination')
  console.log('  Added: 2 Nyungwe Forest tours')
  console.log('  Added: 2 Lake Kivu tours')
  console.log('  Total: 8 tours across 5 destinations')
  console.log('  Admin: http://localhost:3000/admin')
  console.log('========================================')
  process.exit(0)
}

run().catch((err) => { console.error('Failed:', err); process.exit(1) })
