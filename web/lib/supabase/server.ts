// Supabase client untuk Server Components / Server Actions / Route Handlers.
// Mengelola sesi via cookies Next.js. JANGAN import ini dari client component.
import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Dipanggil dari Server Component — set cookie tidak diizinkan di sana.
            // Aman diabaikan: middleware yang akan refresh session.
          }
        },
      },
    },
  );
}

// Service-role client — bypass RLS. HANYA untuk operasi admin di server.
// Jangan dipakai untuk request user biasa.
export function createSupabaseAdminClient() {
  const { createClient } = require("@supabase/supabase-js") as typeof import("@supabase/supabase-js");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
