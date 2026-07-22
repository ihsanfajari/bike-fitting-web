// Helper: return current user kalau is_admin, null kalau bukan.
// Server-only — dipakai di server components & server actions admin.
import "server-only";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export async function getCurrentAdmin() {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin) return null;
  return user;
}
