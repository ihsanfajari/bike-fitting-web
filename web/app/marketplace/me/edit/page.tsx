import { redirect } from "next/navigation";
import { PageTopBar } from "../../_components/TopBar";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { EditProfileForm } from "./EditProfileForm";

function initialsOf(name: string): string {
  return name.split(/\s+/).slice(0, 2).map((s) => s[0]?.toUpperCase() ?? "").join("") || "?";
}

export default async function EditProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/marketplace/sign-in");

  return (
    <>
      <PageTopBar title="Edit Profil" backHref="/marketplace/me" />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        <section className="bg-[var(--color-m-paper)] px-5 py-6 border-b border-[var(--color-m-ink-100)]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-m-orange-400)] to-[var(--color-m-orange-600)] flex items-center justify-center text-white text-[24px] font-extrabold flex-shrink-0">
              {initialsOf(user.fullName)}
            </div>
            <div className="text-[12px] text-[var(--color-m-ink-500)] leading-relaxed">
              Upload foto profil akan tersedia setelah integrasi Storage (Fase 2).
            </div>
          </div>
        </section>

        <EditProfileForm
          initialFullName={user.fullName}
          initialEmail={user.email}
          initialPhone={user.phone}
          initialBio={user.bio}
          initialCity={user.city}
        />
      </main>
    </>
  );
}
