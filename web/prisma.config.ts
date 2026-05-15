// Konfigurasi Prisma 7 — GowesFit Marketplace
// Env dimuat dari .env.local (file yang sama dipakai Next.js runtime).
import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

loadEnv({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Prisma CLI (migrate / db push / studio) WAJIB pakai DIRECT connection Supabase
    // (port 5432), bukan pooled — pooler tidak mendukung operasi schema/migration.
    url: process.env["DIRECT_URL"],
  },
});
