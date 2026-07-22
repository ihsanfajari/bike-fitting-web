import { redirect } from "next/navigation";
import { PageTopBar } from "../_components/TopBar";
import { Stepper } from "./_components/Stepper";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getCategoryTree, getMyDraftListing } from "@/lib/listings/queries";
import { SellStep1Form } from "./SellStep1Form";

export default async function SellStep1Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/marketplace/sign-in");

  // Kalau user punya draft yang sudah lebih jauh (sudah ada brand/price), lompat ke step lanjutan
  const existingDraft = await getMyDraftListing(user.id);
  if (existingDraft && (existingDraft.brand || Number(existingDraft.price) > 0)) {
    redirect(`/marketplace/sell/spesifikasi?id=${existingDraft.id}`);
  }

  const categoryTree = await getCategoryTree();
  // Tampilan datar di UI: anak-anak "Sepeda Utuh" + kategori komponen sebagai root tersendiri.
  const sepedaUtuh = categoryTree.find((c) => c.slug === "sepeda-utuh");
  const sepedaChildren = sepedaUtuh
    ? categoryTree.filter((c) => c.parentId === sepedaUtuh.id)
    : [];
  const componentRoots = categoryTree.filter(
    (c) => !c.parentId && c.slug !== "sepeda-utuh",
  );

  const flatCategories = [...sepedaChildren, ...componentRoots]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((c) => ({ slug: c.slug, name: c.name }));

  return (
    <>
      <PageTopBar title="Buat Listing — 1/3" backHref="/marketplace/me" />
      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        <Stepper current={1} />
        <SellStep1Form
          categories={flatCategories}
          initialDraft={
            existingDraft
              ? {
                  listingId: existingDraft.id,
                  title: existingDraft.title,
                  categorySlug: "", // category slug lookup nanti — sederhana, biar user re-pick
                  photos: existingDraft.photos.map((p) => ({ url: p.url })),
                }
              : undefined
          }
        />
      </main>
    </>
  );
}
