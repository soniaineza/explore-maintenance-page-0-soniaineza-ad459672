import { getPayload } from 'payload'
import config from '../../payload.config'
import { put } from '@vercel/blob'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const MEDIA_DIR = path.resolve(__dirname, '..', '..', 'media')

/**
 * Upload all locally-stored media files to Vercel Blob using the SDK.
 * After uploading, update each Payload media record's `url` field to
 * point to the Blob CDN URL.
 *
 * Prerequisite:
 *   BLOB_READ_WRITE_TOKEN must be set in .env.local or environment.
 *
 * Usage:
 *   npx tsx -r dotenv/config lib/db/migrate-to-blob.ts dotenv_config_path=.env.local
 */

// ── Map alt text → source filename ──────────────────────────────────
// These map the alt text stored in Payload media records to the actual
// source files available in the `media/` directory.
const ALT_TO_FILE: Record<string, string> = {
  'Gorilla Trekking Close-up':  'gorilla-trekking.webp',
  'Akagera Zebra Safari':      'akagera-zebra.webp',
  'Lake Kivu Sunset':          'lake-kivu-sunset.webp',
  'Lake Kivu':                 'lake-kivu.webp',
  'Nyungwe Forest Bird':       'nyungwe-bird.webp',
  'Nyungwe Forest National Park': 'nyungwe-bird.webp',
  'Volcanoes National Park':   'gorilla-trekking.webp',
  'Kigali City':               'kigali-street.webp',
  'Akagera National Park':     'akagera-zebra.webp',
}

async function run() {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    console.error('❌ BLOB_READ_WRITE_TOKEN is not set!')
    console.error('  1. Go to https://vercel.com/dashboard/stores/blob')
    console.error('  2. Copy the BLOB_READ_WRITE_TOKEN')
    console.error('  3. Add it to .env.local')
    process.exit(1)
  }

  const payload = await getPayload({ config })

  // Fetch all media records
  const allMedia = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 100,
  })

  console.log(`Found ${allMedia.totalDocs} media records\n`)

  let migrated = 0
  let skipped = 0

  for (const media of allMedia.docs) {
    const record = media as any
    const currentUrl: string | undefined = record.url
    const alt = (record.alt || record.filename || `media-${record.id}`) as string

    // Skip if already a Blob URL
    if (currentUrl && currentUrl.includes('.public.blob.vercel-storage.com')) {
      console.log(`  SKIP  ${alt}: already on Blob`)
      skipped++
      continue
    }

    // Determine which source file to upload
    let sourceFile = ALT_TO_FILE[alt]
    if (!sourceFile) {
      // Fallback: try the record filename directly
      sourceFile = record.filename
    }
    if (!sourceFile) {
      console.log(`  SKIP  ${alt}: no matching source file`)
      skipped++
      continue
    }

    const srcPath = path.join(MEDIA_DIR, sourceFile)
    if (!fs.existsSync(srcPath)) {
      console.log(`  SKIP  ${alt}: source file "${sourceFile}" not found at ${srcPath}`)
      skipped++
      continue
    }

    try {
      const fileBuffer = fs.readFileSync(srcPath)
      const contentType = record.mimeType || 'image/webp'

      // Upload to Vercel Blob using the SDK
      const blob = await put(sourceFile, fileBuffer, {
        access: 'public',
        contentType,
        addRandomSuffix: true,
      })

      // Update the media record's url field with the Blob CDN URL
      await payload.update({
        collection: 'media',
        id: record.id,
        data: { url: blob.url },
      })

      console.log(`  ✅ ${alt}: uploaded to Blob`)
      console.log(`     ${blob.url}`)
      migrated++
    } catch (error) {
      console.log(`  ❌ ${alt}: upload failed - ${(error as Error).message}`)
    }
  }

  console.log(`\n========================================`)
  console.log(`  Migration complete!`)
  console.log(`  Migrated: ${migrated}`)
  console.log(`  Skipped:  ${skipped}`)
  console.log(`========================================`)
  console.log(`\n✅ All image URLs updated in the database.`)
  console.log(`   The next time you deploy to Vercel, images will load`)
  console.log(`   from Vercel's Blob CDN. The ${migrated} migrated URLs`)
  console.log(`   are already pointing to the CDN.\n`)

  // Verify
  console.log(`── Verifying migrated URLs ──\n`)
  const verified = await payload.find({ collection: 'media', depth: 0, limit: 100 })
  for (const v of verified.docs) {
    const r = v as any
    if (r.url && r.url.includes('public.blob.vercel-storage.com')) {
      console.log(`  ✅ ${r.alt || r.filename}: ${r.url}`)
    }
  }

  process.exit(0)
}

run().catch((err) => { console.error('Migration failed:', err); process.exit(1) })
