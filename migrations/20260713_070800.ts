import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "hero_image_id" integer;
  ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "hero_image_id" integer;
  ALTER TABLE "about" ADD CONSTRAINT "about_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX IF NOT EXISTS "about_hero_image_idx" ON "about" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "contact_hero_image_idx" ON "contact" USING btree ("hero_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about" DROP CONSTRAINT IF EXISTS "about_hero_image_id_media_id_fk";
  ALTER TABLE "contact" DROP CONSTRAINT IF EXISTS "contact_hero_image_id_media_id_fk";
  DROP INDEX IF EXISTS "about_hero_image_idx";
  DROP INDEX IF EXISTS "contact_hero_image_idx";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "hero_image_id";
  ALTER TABLE "contact" DROP COLUMN IF EXISTS "hero_image_id";`)
}
