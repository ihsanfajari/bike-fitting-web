// E2E test untuk browse flow — listing aktif muncul di homepage, detail, kategori.
// Jalankan: npx tsx scripts/test-browse-flow.ts
import { createClient } from "@supabase/supabase-js";
import { config as loadEnv } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { randomUUID } from "crypto";

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

const log = (i: string, m: string) => console.log(`${i} ${m}`);
const fail = (m: string) => { console.error(`❌ ${m}`); process.exit(1); };

const TINY_JPEG = Buffer.from(
  "ffd8ffe000104a46494600010100000100010000ffdb004300080606070605080707070909080a0c140d0c0b0b0c1912130f141d1a1f1e1d1a1c1c20242e2720222c231c1c2837292c30313434341f27393d38323c2e333432ffc0000b080001000101011100ffc4001f0000010501010101010100000000000000000102030405060708090a0bffc400b5100002010303020403050504040000017d01020300041105122131410613516107227114328191a1082342b1c11552d1f02433627282090a161718191a25262728292a3435363738393a434445464748494a535455565758595a636465666768696a737475767778797a838485868788898a92939495969798999aa2a3a4a5a6a7a8a9aab2b3b4b5b6b7b8b9bac2c3c4c5c6c7c8c9cad2d3d4d5d6d7d8d9dae1e2e3e4e5e6e7e8e9eaf1f2f3f4f5f6f7f8f9faffda0008010100003f00fbe88a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a003ffd9",
  "hex"
);

async function cleanup(email: string) {
  const { data } = await admin.auth.admin.listUsers();
  const u = data.users.find((x) => x.email === email);
  if (!u) return;
  const listings = await prisma.listing.findMany({ where: { sellerId: u.id } });
  for (const l of listings) {
    const photos = await prisma.listingPhoto.findMany({ where: { listingId: l.id } });
    const paths = photos.map((p) => p.url.replace(`${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`, ""));
    if (paths.length) await admin.storage.from(BUCKET).remove(paths);
    await prisma.listingPhoto.deleteMany({ where: { listingId: l.id } });
    await prisma.listing.delete({ where: { id: l.id } });
  }
  await prisma.user.deleteMany({ where: { id: u.id } });
  await admin.auth.admin.deleteUser(u.id);
}

function slugify(t: string): string {
  return t.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").slice(0, 100);
}

async function main() {
  const ts = Date.now();
  const email = `browse-${ts}@gowesfit.test`;
  const uniqueMarker = `BrowseTestBike${ts}`;
  await cleanup(email);
  log("🧪", `Marker title: "${uniqueMarker}"`);

  // Setup user + listing
  const { data: su, error } = await createClient(SUPABASE_URL, ANON_KEY).auth.signUp({ email, password: "TestPass1234" });
  if (error) fail(error.message);
  const userId = su.user!.id;
  await prisma.user.create({
    data: { id: userId, email, fullName: "Browse Tester", phone: "+62811" + String(ts).slice(-8), phoneVerifiedAt: new Date() },
  });

  const cat = await prisma.category.findUnique({ where: { slug: "roadbike" } });
  if (!cat) fail("Kategori roadbike tidak ada");

  // Upload 3 foto
  const photoUrls: string[] = [];
  for (let i = 0; i < 3; i++) {
    const path = `${userId}/${randomUUID()}.jpg`;
    await admin.storage.from(BUCKET).upload(path, TINY_JPEG, { contentType: "image/jpeg" });
    photoUrls.push(admin.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
  }

  // Bikin & publish listing
  const slug = `${slugify(uniqueMarker)}-${ts}`;
  await prisma.listing.create({
    data: {
      sellerId: userId,
      categoryId: cat!.id,
      title: uniqueMarker,
      condition: "used_mint",
      price: BigInt(12345678),
      city: "Bandung",
      province: "Jawa Barat",
      brand: "TestBrand",
      model: "TestModel",
      year: 2024,
      frameSize: "M",
      frameMaterial: "carbon",
      isNegotiable: true,
      description: "Test bike for browse flow.",
      status: "active",
      slug,
      publishedAt: new Date(),
      photos: { create: photoUrls.map((url, i) => ({ url, sortOrder: i })) },
    },
  });
  log("✅", `Listing dibuat dengan slug: ${slug}`);

  // ── Test 1: Homepage menampilkan listing baru
  log("→", "Test: homepage /marketplace nampilin listing");
  const home = await fetch(`${APP_URL}/marketplace`, { cache: "no-store" });
  if (home.status !== 200) fail(`/marketplace status ${home.status}`);
  const homeHtml = await home.text();
  if (!homeHtml.includes(uniqueMarker)) fail(`Homepage tidak nampilin "${uniqueMarker}"`);
  log("✅", "Homepage nampilin listing");

  // ── Test 2: Listing detail page
  log("→", `Test: detail page /marketplace/listing/${slug}`);
  const detail = await fetch(`${APP_URL}/marketplace/listing/${slug}`, { cache: "no-store" });
  if (detail.status !== 200) fail(`Detail status ${detail.status}`);
  const detailHtml = await detail.text();
  if (!detailHtml.includes(uniqueMarker)) fail("Detail tidak nampilin title");
  if (!detailHtml.includes("12.345.678")) fail("Detail tidak nampilin harga IDR format");
  if (!detailHtml.includes("Bandung")) fail("Detail tidak nampilin lokasi");
  if (!detailHtml.includes("TestBrand")) fail("Detail tidak nampilin brand");
  log("✅", "Detail page render lengkap (title, harga, lokasi, brand)");

  // ── Test 3: Category page
  log("→", "Test: kategori page /marketplace/kategori/roadbike");
  const cat1 = await fetch(`${APP_URL}/marketplace/kategori/roadbike`, { cache: "no-store" });
  if (cat1.status !== 200) fail(`Kategori status ${cat1.status}`);
  const catHtml = await cat1.text();
  if (!catHtml.includes(uniqueMarker)) fail("Kategori page tidak nampilin listing");
  log("✅", "Kategori page nampilin listing");

  // ── Test 4: View count increment
  log("→", "Test: view count naik setelah hit detail page");
  const before = await prisma.listing.findFirst({ where: { slug } });
  await fetch(`${APP_URL}/marketplace/listing/${slug}`, { cache: "no-store" });
  // Beri waktu utk fire-and-forget increment
  await new Promise((r) => setTimeout(r, 500));
  const after = await prisma.listing.findFirst({ where: { slug } });
  if (after!.viewCount <= before!.viewCount) fail(`View count tidak naik: ${before!.viewCount} → ${after!.viewCount}`);
  log("✅", `View count naik: ${before!.viewCount} → ${after!.viewCount}`);

  // ── Test 5: 404 untuk slug yg gak ada
  log("→", "Test: slug tidak valid → 404");
  const notFound = await fetch(`${APP_URL}/marketplace/listing/slug-yang-tidak-ada-xyz`, { cache: "no-store", redirect: "manual" });
  if (notFound.status !== 404) fail(`Expected 404, got ${notFound.status}`);
  log("✅", "404 OK untuk slug tidak valid");

  // Cleanup
  log("→", "Cleanup...");
  await cleanup(email);
  log("✅", "Cleanup OK");

  console.log("\n🎉 BROWSE FLOW TEST LOLOS!");
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error("\n❌ GAGAL:", e);
  await prisma.$disconnect();
  process.exit(1);
});
