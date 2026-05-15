// GowesFit Marketplace — seed data awal
// Dijalankan via: `npx prisma db seed` (config di prisma.config.ts)
// Idempotent: aman dijalankan berulang (pakai upsert by slug/email).

import { PrismaPg } from "@prisma/adapter-pg";
import { config as loadEnv } from "dotenv";
import { PrismaClient } from "../lib/generated/prisma/client";

loadEnv({ path: ".env.local" });

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

async function seedCategories() {
  // Hierarki sesuai PRD §5.2 + ERD §3.5.
  // Slug dibuat selaras dengan yang sudah dipakai UI (web/lib/mock/data.ts).

  const sepedaUtuh = await prisma.category.upsert({
    where: { slug: "sepeda-utuh" },
    update: { name: "Sepeda Utuh", sortOrder: 1 },
    create: { name: "Sepeda Utuh", slug: "sepeda-utuh", sortOrder: 1 },
  });

  const sepedaUtuhSubs = [
    { name: "Roadbike", slug: "roadbike", sortOrder: 1 },
    { name: "MTB", slug: "mtb", sortOrder: 2 },
    { name: "Gravel", slug: "gravel", sortOrder: 3 },
    { name: "Folding", slug: "folding", sortOrder: 4 },
    { name: "BMX", slug: "bmx", sortOrder: 5 },
    { name: "Sepeda Listrik", slug: "electric", sortOrder: 6 },
    { name: "Sepeda Anak", slug: "kids", sortOrder: 7 },
    { name: "Lainnya", slug: "lainnya", sortOrder: 99 },
  ];

  for (const sub of sepedaUtuhSubs) {
    await prisma.category.upsert({
      where: { slug: sub.slug },
      update: { name: sub.name, sortOrder: sub.sortOrder, parentId: sepedaUtuh.id },
      create: { ...sub, parentId: sepedaUtuh.id },
    });
  }

  const componentRoots = [
    { name: "Frame & Fork", slug: "frame", sortOrder: 2 },
    { name: "Groupset & Drivetrain", slug: "groupset", sortOrder: 3 },
    { name: "Wheelset & Ban", slug: "wheelset", sortOrder: 4 },
    { name: "Cockpit", slug: "cockpit", sortOrder: 5 },
    { name: "Aksesoris", slug: "accessory", sortOrder: 6 },
    { name: "Apparel", slug: "apparel", sortOrder: 7 },
  ];

  for (const root of componentRoots) {
    await prisma.category.upsert({
      where: { slug: root.slug },
      update: { name: root.name, sortOrder: root.sortOrder },
      create: root,
    });
  }

  const total = await prisma.category.count();
  console.log(`✅ Categories: ${total} tersimpan (1 root sepeda + 8 sub + 6 root komponen)`);
}

async function seedAdmin() {
  // Admin awal — `passwordHash` masih null karena auth belum di-wire (Fase 1).
  // Saat auth dibangun, admin set password lewat flow yang sama dengan user biasa.
  const admin = await prisma.user.upsert({
    where: { email: "admin@gowesfit.local" },
    update: { isAdmin: true },
    create: {
      email: "admin@gowesfit.local",
      fullName: "GowesFit Admin",
      isAdmin: true,
      kycStatus: "verified",
    },
  });
  console.log(`✅ Admin user: ${admin.email} (id: ${admin.id})`);
}

async function main() {
  console.log("🌱 Menjalankan seed...");
  await seedCategories();
  await seedAdmin();
  console.log("✨ Seed selesai");
}

main()
  .catch((e) => {
    console.error("❌ Seed gagal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
