// Proxy Next.js 16 — refresh sesi Supabase + gate route yang butuh login/admin.
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

const PROTECTED_PREFIXES = [
  "/marketplace/sell",
  "/marketplace/me",
  "/marketplace/checkout",
  "/marketplace/orders",
  "/marketplace/chat",
  "/marketplace/wishlist",
  "/marketplace/notifications",
  "/marketplace/dashboard",
];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Admin routes — butuh user yang is_admin=true
  if (path.startsWith("/admin")) {
    if (!user) {
      const signInUrl = new URL("/marketplace/sign-in", request.url);
      signInUrl.searchParams.set("next", path);
      return NextResponse.redirect(signInUrl);
    }
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { isAdmin: true },
    });
    if (!dbUser?.isAdmin) {
      return NextResponse.redirect(new URL("/marketplace", request.url));
    }
    return response;
  }

  const needsAuth = PROTECTED_PREFIXES.some((prefix) => path.startsWith(prefix));
  if (needsAuth && !user) {
    const signInUrl = new URL("/marketplace/sign-in", request.url);
    signInUrl.searchParams.set("next", path);
    return NextResponse.redirect(signInUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
