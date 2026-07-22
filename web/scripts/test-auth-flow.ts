// Manual E2E test untuk flow auth + bridge + protected pages.
// Jalankan: npx tsx scripts/test-auth-flow.ts
import { createClient } from "@supabase/supabase-js";
import { config as loadEnv } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

loadEnv({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const SERVICE_KEY = process.env.SUPABASE_SECRET_KEY!;
const APP_URL = "http://localhost:3000";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DIRECT_URL }),
});

const adminSupabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const log = (icon: string, msg: string) => console.log(`${icon} ${msg}`);
const fail = (msg: string) => {
  console.error(`❌ ${msg}`);
  process.exit(1);
};

async function cleanup(email: string) {
  // Cleanup test user dari sebelumnya
  const { data: list } = await adminSupabase.auth.admin.listUsers();
  const existing = list.users.find((u) => u.email === email);
  if (existing) {
    await adminSupabase.auth.admin.deleteUser(existing.id);
    await prisma.user.deleteMany({ where: { id: existing.id } });
  }
}

async function main() {
  const ts = Date.now();
  const testEmail = `test-${ts}@gowesfit.test`;
  const testPassword = "TestPass1234";
  const testName = "Test User Otomatis";
  // HP unik berbasis timestamp untuk hindari unique constraint
  const testPhone = "+62811" + String(ts).slice(-8);

  log("🧪", `Test email: ${testEmail}`);

  // ── 1. SIGN UP (mimicking signUpAction)
  log("→", "Signup via Supabase Auth...");
  const userClient = createClient(SUPABASE_URL, ANON_KEY);
  const { data: signUpData, error: signUpError } = await userClient.auth.signUp({
    email: testEmail,
    password: testPassword,
  });
  if (signUpError) fail(`signUp error: ${signUpError.message}`);
  if (!signUpData.user) fail("signUp: no user returned");
  const authUserId = signUpData!.user!.id;
  log("✅", `auth.users row created — id: ${authUserId}`);

  // Bridge — bikin public.users (mimicking action behavior)
  await prisma.user.create({
    data: {
      id: authUserId,
      email: testEmail,
      fullName: testName,
      phone: testPhone,
    },
  });
  log("✅", "public.users row created (bridge)");

  // Verify both rows
  const dbUser = await prisma.user.findUnique({ where: { id: authUserId } });
  if (!dbUser) fail("public.users tidak ditemukan setelah create");
  if (dbUser!.fullName !== testName) fail("fullName tidak cocok");
  if (dbUser!.email !== testEmail) fail("email tidak cocok");
  log("✅", `Bridge OK: id sama (${authUserId}), data sinkron`);

  // ── 2. SIGN IN → ambil session
  log("→", "Sign in untuk ambil session...");
  const { data: signInData, error: signInError } = await userClient.auth.signInWithPassword({
    email: testEmail,
    password: testPassword,
  });
  if (signInError) fail(`signIn error: ${signInError.message}`);
  if (!signInData.session) fail("signIn: no session");
  log("✅", `Session diperoleh (access_token: ${signInData.session!.access_token.slice(0, 20)}...)`);

  // ── 3. Hit /marketplace/me dengan cookie
  log("→", "Hit /marketplace/me dengan cookie session...");
  const projectRef = SUPABASE_URL.match(/https:\/\/(.+?)\.supabase\.co/)?.[1] ?? "";
  // @supabase/ssr cookie format: sb-<ref>-auth-token = "base64-" + base64URL(JSON.stringify(session))
  // Chunked jika > 3180 bytes — pakai .0, .1, dst.
  const cookiePayload = JSON.stringify(signInData.session!);
  const encodedValue = "base64-" + Buffer.from(cookiePayload).toString("base64url");
  const cookieBaseName = `sb-${projectRef}-auth-token`;

  const MAX_CHUNK = 3180;
  const cookieParts: { name: string; value: string }[] = [];
  if (encodedValue.length <= MAX_CHUNK) {
    cookieParts.push({ name: cookieBaseName, value: encodedValue });
  } else {
    for (let i = 0, idx = 0; i < encodedValue.length; i += MAX_CHUNK, idx++) {
      cookieParts.push({
        name: `${cookieBaseName}.${idx}`,
        value: encodedValue.slice(i, i + MAX_CHUNK),
      });
    }
  }
  const cookieHeader = cookieParts.map((c) => `${c.name}=${c.value}`).join("; ");
  log("ℹ️", `Cookie payload: ${cookieParts.length} chunk(s), total ${encodedValue.length} bytes`);

  const meRes = await fetch(`${APP_URL}/marketplace/me`, {
    headers: { Cookie: cookieHeader },
    redirect: "manual",
  });
  log("ℹ️", `/me status: ${meRes.status}`);
  if (meRes.status === 307 || meRes.status === 308) {
    fail(`/me masih redirect — session cookie tidak diterima. Location: ${meRes.headers.get("location")}`);
  }
  if (meRes.status !== 200) fail(`/me expected 200, got ${meRes.status}`);
  const meHtml = await meRes.text();
  if (!meHtml.includes(testName)) fail(`/me HTML tidak include nama "${testName}"`);
  if (!meHtml.includes(testEmail)) fail(`/me HTML tidak include email "${testEmail}"`);
  log("✅", `/me render dengan data user yang benar (nama & email muncul di HTML)`);

  // Cek menampilkan "Menunggu verifikasi" (HP belum diverifikasi)
  if (!meHtml.includes("Menunggu verifikasi")) {
    log("⚠️", `/me tidak nampilin label "Menunggu verifikasi" — mungkin layout berubah`);
  } else {
    log("✅", `/me nampilin status "Menunggu verifikasi" (HP belum diverifikasi — benar)`);
  }

  // ── 4. Akses /marketplace/sell dengan session → harus 200 (logged in)
  log("→", "Hit /marketplace/sell dengan cookie (harus 200)...");
  const sellRes = await fetch(`${APP_URL}/marketplace/sell`, {
    headers: { Cookie: cookieHeader },
    redirect: "manual",
  });
  log("ℹ️", `/sell status: ${sellRes.status}`);
  if (sellRes.status !== 200) fail(`/sell expected 200, got ${sellRes.status}`);
  log("✅", `/sell accessible setelah login`);

  // ── 5. Test create address via direct Prisma (action behavior)
  log("→", "Test buat address...");
  const addr = await prisma.address.create({
    data: {
      userId: authUserId,
      label: "Rumah",
      recipientName: testName,
      recipientPhone: testPhone,
      province: "DKI Jakarta",
      city: "Jakarta Selatan",
      district: "Kemang",
      postalCode: "12730",
      fullAddress: "Jl. Kemang Raya No. 42",
      isPrimary: true,
    },
  });
  log("✅", `Address created: ${addr.id}`);

  // Hit /me/addresses dengan cookie — harus nampil alamat
  const addrRes = await fetch(`${APP_URL}/marketplace/me/addresses`, {
    headers: { Cookie: cookieHeader },
    redirect: "manual",
  });
  if (addrRes.status !== 200) fail(`/me/addresses expected 200, got ${addrRes.status}`);
  const addrHtml = await addrRes.text();
  if (!addrHtml.includes("Jl. Kemang Raya")) fail(`/me/addresses tidak nampilin alamat`);
  log("✅", `/me/addresses nampilin alamat dengan benar`);

  // ── 6. Cleanup
  log("→", "Cleanup test user...");
  await cleanup(testEmail);
  log("✅", "Test user dihapus");

  console.log("\n🎉 SEMUA TEST LOLOS!");
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error("\n❌ TEST GAGAL:", e);
  await prisma.$disconnect();
  process.exit(1);
});
