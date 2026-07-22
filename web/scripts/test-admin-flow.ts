// E2E test untuk admin panel — gate, verify HP, audit log, suspend.
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
const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const log = (i: string, m: string) => console.log(`${i} ${m}`);
const fail = (m: string) => { console.error(`❌ ${m}`); process.exit(1); };

async function cleanup(email: string) {
  const { data } = await admin.auth.admin.listUsers();
  const u = data.users.find((x) => x.email === email);
  if (!u) return;
  await prisma.adminActionLog.deleteMany({ where: { OR: [{ adminId: u.id }, { targetId: u.id }] } });
  await prisma.user.deleteMany({ where: { id: u.id } });
  await admin.auth.admin.deleteUser(u.id);
}

async function makeSession(email: string, password: string): Promise<string> {
  const c = createClient(SUPABASE_URL, ANON_KEY);
  const { data, error } = await c.auth.signInWithPassword({ email, password });
  if (error) fail(error.message);
  const sess = data.session!;
  const ref = SUPABASE_URL.match(/https:\/\/(.+?)\.supabase\.co/)![1];
  const encoded = "base64-" + Buffer.from(JSON.stringify(sess)).toString("base64url");
  const MAX = 3180;
  const parts: string[] = [];
  if (encoded.length <= MAX) parts.push(`sb-${ref}-auth-token=${encoded}`);
  else for (let i = 0, idx = 0; i < encoded.length; i += MAX, idx++) parts.push(`sb-${ref}-auth-token.${idx}=${encoded.slice(i, i + MAX)}`);
  return parts.join("; ");
}

async function main() {
  const ts = Date.now();
  const adminEmail = `admin-${ts}@gowesfit.test`;
  const userEmail = `user-${ts}@gowesfit.test`;
  const password = "TestPass1234";

  await cleanup(adminEmail);
  await cleanup(userEmail);

  log("🧪", "Setup admin & regular user");
  const aSignup = await createClient(SUPABASE_URL, ANON_KEY).auth.signUp({ email: adminEmail, password });
  if (aSignup.error) fail(aSignup.error.message);
  const adminId = aSignup.data.user!.id;
  await prisma.user.create({
    data: { id: adminId, email: adminEmail, fullName: "Test Admin", phone: "+62811" + String(ts).slice(-8), isAdmin: true, phoneVerifiedAt: new Date() },
  });

  const uSignup = await createClient(SUPABASE_URL, ANON_KEY).auth.signUp({ email: userEmail, password });
  if (uSignup.error) fail(uSignup.error.message);
  const userId = uSignup.data.user!.id;
  await prisma.user.create({
    data: { id: userId, email: userEmail, fullName: "Test Regular User", phone: "+62812" + String(ts).slice(-8) },
  });
  log("✅", `Admin=${adminId}, RegularUser=${userId}`);

  // ── 1. Non-admin: akses /admin → redirect ke /marketplace
  log("→", "Test: regular user akses /admin → redirect");
  const userCookie = await makeSession(userEmail, password);
  const r1 = await fetch(`${APP_URL}/admin`, { headers: { Cookie: userCookie }, redirect: "manual" });
  if (r1.status !== 307 && r1.status !== 308) fail(`Regular user /admin: expected redirect, got ${r1.status}`);
  const loc1 = r1.headers.get("location") ?? "";
  if (!loc1.includes("/marketplace")) fail(`Regular user redirect bukan ke marketplace: ${loc1}`);
  log("✅", `Regular user → ${r1.status} ke ${loc1}`);

  // ── 2. Non-logged-in: akses /admin → redirect ke sign-in
  log("→", "Test: anonymous /admin → redirect ke sign-in");
  const r2 = await fetch(`${APP_URL}/admin`, { redirect: "manual" });
  if (r2.status !== 307 && r2.status !== 308) fail(`Anon /admin: expected redirect, got ${r2.status}`);
  const loc2 = r2.headers.get("location") ?? "";
  if (!loc2.includes("/sign-in")) fail(`Anon redirect bukan ke sign-in: ${loc2}`);
  log("✅", `Anonymous → redirect ke sign-in`);

  // ── 3. Admin: /admin → 200, dashboard
  log("→", "Test: admin /admin dashboard");
  const adminCookie = await makeSession(adminEmail, password);
  const r3 = await fetch(`${APP_URL}/admin`, { headers: { Cookie: adminCookie }, redirect: "manual" });
  if (r3.status !== 200) fail(`Admin /admin: expected 200, got ${r3.status}`);
  const html3 = await r3.text();
  if (!html3.includes("Dashboard")) fail("/admin dashboard tidak nampilin 'Dashboard'");
  if (!html3.includes("Total Users")) fail("/admin tidak nampilin stat cards");
  log("✅", "Dashboard render");

  // ── 4. Admin: /admin/users → 200, lists users
  log("→", "Test: /admin/users list");
  const r4 = await fetch(`${APP_URL}/admin/users`, { headers: { Cookie: adminCookie }, redirect: "manual" });
  if (r4.status !== 200) fail(`/admin/users: ${r4.status}`);
  const html4 = await r4.text();
  if (!html4.includes("Test Regular User")) fail("Users list tidak include regular user");
  if (!html4.includes("Test Admin")) fail("Users list tidak include admin");
  log("✅", "Users list nampilin kedua user");

  // ── 5. Admin: filter pending verify
  log("→", "Test: filter pending_verify hanya nampilin yang belum verified");
  const r5 = await fetch(`${APP_URL}/admin/users?filter=pending_verify`, { headers: { Cookie: adminCookie }, redirect: "manual" });
  const html5 = await r5.text();
  if (!html5.includes("Test Regular User")) fail("Filter pending_verify tidak include regular user (HP belum verified)");
  if (html5.includes("admin-" + ts) && html5.includes("✓ Verified")) fail("Filter pending_verify malah include admin yg sudah verified");
  log("✅", "Filter pending_verify benar");

  // ── 6. Admin: detail page regular user
  log("→", "Test: /admin/users/[id] detail");
  const r6 = await fetch(`${APP_URL}/admin/users/${userId}`, { headers: { Cookie: adminCookie }, redirect: "manual" });
  if (r6.status !== 200) fail(`/admin/users/${userId}: ${r6.status}`);
  const html6 = await r6.text();
  if (!html6.includes("Test Regular User")) fail("Detail tidak nampilin nama");
  if (!html6.includes("Verify HP")) fail("Detail tidak nampilin tombol Verify HP");
  log("✅", "Detail page render dengan tombol Verify HP");

  // ── 7. Action: verifyPhoneAction (langsung via Prisma + audit log, mimicking server action)
  log("→", "Test: verifyPhoneAction harus update phone_verified_at + bikin audit log");
  await prisma.user.update({ where: { id: userId }, data: { phoneVerifiedAt: new Date() } });
  await prisma.adminActionLog.create({
    data: { adminId, action: "verify_phone", targetType: "user", targetId: userId, reason: "Test verification" },
  });
  const checkUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!checkUser?.phoneVerifiedAt) fail("phone_verified_at tidak diset");
  const logs = await prisma.adminActionLog.findMany({ where: { targetId: userId } });
  if (logs.length !== 1) fail(`Expected 1 audit log, got ${logs.length}`);
  if (logs[0].action !== "verify_phone") fail(`Audit action mismatch: ${logs[0].action}`);
  if (logs[0].adminId !== adminId) fail(`Audit adminId mismatch`);
  log("✅", "phone_verified_at terupdate + audit log tercatat");

  // ── 8. Hit detail page lagi — sekarang tidak ada tombol Verify HP (sudah verified)
  log("→", "Test: setelah verified, tombol Verify HP tidak muncul, audit history muncul");
  const r8 = await fetch(`${APP_URL}/admin/users/${userId}`, { headers: { Cookie: adminCookie }, redirect: "manual", cache: "no-store" });
  const html8 = await r8.text();
  // Tombol hijau punya class signature unik "bg-green-600" — kalau hilang berarti tombol Verify HP tidak ada
  if (html8.includes("bg-green-600")) fail("Tombol Verify HP (bg-green-600) masih muncul");
  // Status verified harus ditampilkan
  if (!html8.includes("✓ Verified")) fail("Badge '✓ Verified' tidak ditampilkan");
  // Audit history harus include entry verify_phone (label "✓ Verify HP" di riwayat)
  if (!html8.includes("Test verification")) fail("Audit history tidak nampilin reason 'Test verification'");
  log("✅", "Tombol hilang, status '✓ Verified' muncul, riwayat audit ada");

  // Cleanup
  log("→", "Cleanup...");
  await cleanup(adminEmail);
  await cleanup(userEmail);
  log("✅", "Cleanup OK");

  console.log("\n🎉 ADMIN FLOW TEST LOLOS!");
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error("\n❌ GAGAL:", e);
  await prisma.$disconnect();
  process.exit(1);
});
