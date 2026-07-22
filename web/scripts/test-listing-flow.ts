// E2E test untuk listing flow — create draft, upload foto, publish, browse.
// Jalankan: npx tsx scripts/test-listing-flow.ts
import { createClient } from "@supabase/supabase-js";
import { config as loadEnv } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { randomUUID } from "crypto";
import { readFileSync, writeFileSync, unlinkSync } from "fs";
import { join } from "path";

loadEnv({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const SERVICE_KEY = process.env.SUPABASE_SECRET_KEY!;
const APP_URL = "http://localhost:3000";
const BUCKET = "listing-photos";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DIRECT_URL }),
});
const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const log = (icon: string, msg: string) => console.log(`${icon} ${msg}`);
const fail = (msg: string) => {
  console.error(`❌ ${msg}`);
  process.exit(1);
};

// Tiny 1x1 px JPEG (~107 bytes). Cukup buat test upload tanpa generate image.
const TINY_JPEG = Buffer.from(
  "ffd8ffe000104a46494600010100000100010000ffdb004300080606070605080707070909080a0c140d0c0b0b0c1912130f141d1a1f1e1d1a1c1c20242e2720222c231c1c2837292c30313434341f27393d38323c2e333432ffc0000b080001000101011100ffc4001f0000010501010101010100000000000000000102030405060708090a0bffc400b5100002010303020403050504040000017d01020300041105122131410613516107227114328191a1082342b1c11552d1f02433627282090a161718191a25262728292a3435363738393a434445464748494a535455565758595a636465666768696a737475767778797a838485868788898a92939495969798999aa2a3a4a5a6a7a8a9aab2b3b4b5b6b7b8b9bac2c3c4c5c6c7c8c9cad2d3d4d5d6d7d8d9dae1e2e3e4e5e6e7e8e9eaf1f2f3f4f5f6f7f8f9faffda0008010100003f00fbe88a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a003ffd9",
  "hex"
);

async function cleanupByEmail(email: string) {
  const { data: list } = await admin.auth.admin.listUsers();
  const existing = list.users.find((u) => u.email === email);
  if (!existing) return;

  const listings = await prisma.listing.findMany({ where: { sellerId: existing.id } });
  for (const l of listings) {
    const photos = await prisma.listingPhoto.findMany({ where: { listingId: l.id } });
    const paths = photos.map((p) => p.url.replace(`${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`, ""));
    if (paths.length) await admin.storage.from(BUCKET).remove(paths);
    await prisma.listingPhoto.deleteMany({ where: { listingId: l.id } });
    await prisma.listing.delete({ where: { id: l.id } });
  }
  await prisma.user.deleteMany({ where: { id: existing.id } });
  await admin.auth.admin.deleteUser(existing.id);
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").slice(0, 100);
}

async function makeSession(email: string, password: string) {
  const client = createClient(SUPABASE_URL, ANON_KEY);
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) fail(`signIn: ${error.message}`);
  const sess = data.session!;
  const projectRef = SUPABASE_URL.match(/https:\/\/(.+?)\.supabase\.co/)?.[1] ?? "";
  const payload = JSON.stringify(sess);
  const encoded = "base64-" + Buffer.from(payload).toString("base64url");
  const MAX = 3180;
  const parts: { name: string; value: string }[] = [];
  if (encoded.length <= MAX) parts.push({ name: `sb-${projectRef}-auth-token`, value: encoded });
  else for (let i = 0, idx = 0; i < encoded.length; i += MAX, idx++) parts.push({ name: `sb-${projectRef}-auth-token.${idx}`, value: encoded.slice(i, i + MAX) });
  return parts.map((p) => `${p.name}=${p.value}`).join("; ");
}

async function main() {
  const ts = Date.now();
  const email = `test-list-${ts}@gowesfit.test`;
  const password = "TestPass1234";
  const name = "Test Seller";
  const phone = "+62811" + String(ts).slice(-8);

  await cleanupByEmail(email);
  log("🧪", `Test email: ${email}`);

  // ── 1. Sign up + bridge
  log("→", "Signup user...");
  const userClient = createClient(SUPABASE_URL, ANON_KEY);
  const { data: signUp, error: suErr } = await userClient.auth.signUp({ email, password });
  if (suErr) fail(`signUp: ${suErr.message}`);
  const userId = signUp.user!.id;
  await prisma.user.create({ data: { id: userId, email, fullName: name, phone } });
  log("✅", `User & bridge OK: ${userId}`);

  // ── 2. Phone verified (mimicking admin manual via WA)
  await prisma.user.update({
    where: { id: userId },
    data: { phoneVerifiedAt: new Date() },
  });
  log("✅", "Phone verified (admin manual step)");

  // ── 3. Upload 2 fotos ke Storage (bypassing server action)
  log("→", "Upload 3 foto ke Supabase Storage...");
  const photoUrls: string[] = [];
  for (let i = 0; i < 3; i++) {
    const path = `${userId}/${randomUUID()}.jpg`;
    const { error } = await admin.storage.from(BUCKET).upload(path, TINY_JPEG, { contentType: "image/jpeg" });
    if (error) fail(`Upload photo ${i}: ${error.message}`);
    const { data } = admin.storage.from(BUCKET).getPublicUrl(path);
    photoUrls.push(data.publicUrl);
  }
  log("✅", `3 foto ter-upload`);

  // ── 4. Bikin draft listing + link photos (mimicking createDraftListingAction)
  log("→", "Bikin draft listing...");
  const cat = await prisma.category.findUnique({ where: { slug: "roadbike" } });
  if (!cat) fail("Kategori 'roadbike' tidak ada di DB — apakah seed jalan?");
  const draft = await prisma.listing.create({
    data: {
      sellerId: userId,
      categoryId: cat!.id,
      title: `Test Listing ${ts}`,
      condition: "used_mint",
      price: BigInt(15000000),
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      brand: "Trek",
      model: "Domane SL5",
      year: 2022,
      frameSize: "54",
      frameMaterial: "carbon",
      groupset: "Shimano 105 R7000",
      isNegotiable: true,
      allowCod: true,
      description: "Test description.",
      status: "draft",
      photos: { create: photoUrls.map((url, i) => ({ url, sortOrder: i })) },
    },
  });
  log("✅", `Draft listing: ${draft.id}`);

  // ── 5. Publish (mimicking publishListingAction)
  log("→", "Publish listing...");
  let slug = slugify(draft.title);
  if (await prisma.listing.findUnique({ where: { slug } })) slug = `${slug}-${Date.now()}`;
  await prisma.listing.update({
    where: { id: draft.id },
    data: { status: "active", slug, publishedAt: new Date() },
  });
  log("✅", `Listing published — slug: ${slug}`);

  // ── 6. Hit /me/listings via HTTP dengan session
  log("→", "Verify /me/listings nampilin listing baru...");
  const cookie = await makeSession(email, password);
  const myRes = await fetch(`${APP_URL}/marketplace/me/listings?tab=active`, {
    headers: { Cookie: cookie },
    redirect: "manual",
  });
  if (myRes.status !== 200) fail(`/me/listings expected 200, got ${myRes.status}`);
  const myHtml = await myRes.text();
  if (!myHtml.includes(draft.title)) fail(`/me/listings tidak include title "${draft.title}"`);
  log("✅", `/me/listings nampilin listing baru`);

  // ── 7. Verify listing accessible via Storage URL (public bucket)
  log("→", "Verify foto bisa diakses via public URL...");
  const photoRes = await fetch(photoUrls[0]);
  if (photoRes.status !== 200) fail(`Foto URL ${photoUrls[0]} status ${photoRes.status}`);
  log("✅", `Foto accessible: ${photoRes.headers.get("content-type")}`);

  // ── 8. Cleanup
  log("→", "Cleanup...");
  await cleanupByEmail(email);
  log("✅", "Cleanup OK");

  console.log("\n🎉 LISTING FLOW TEST LOLOS!");
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error("\n❌ TEST GAGAL:", e);
  await prisma.$disconnect();
  process.exit(1);
});
