import { redirect } from "next/navigation";
import { PageTopBar } from "../../_components/TopBar";
import { Stepper } from "../_components/Stepper";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getListingForEdit } from "@/lib/listings/queries";
import { SpesifikasiForm } from "./SpesifikasiForm";

export default async function SellStep2Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/marketplace/sign-in");

  const { id } = await searchParams;
  if (!id) redirect("/marketplace/sell");

  const listing = await getListingForEdit(user.id, id);
  if (!listing) redirect("/marketplace/sell");

  const extraSpecsObj = (listing.extraSpecs ?? {}) as Record<string, string>;
  const extraSpecs = Object.entries(extraSpecsObj).map(([key, value]) => ({ key, value }));

  return (
    <>
      <PageTopBar title="Buat Listing — 2/3" backHref="/marketplace/sell" />
      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        <Stepper current={2} />
        <SpesifikasiForm
          initial={{
            listingId: listing.id,
            brand: listing.brand,
            model: listing.model,
            year: listing.year,
            frameSize: listing.frameSize,
            frameMaterial: listing.frameMaterial,
            condition: listing.condition,
            groupset: listing.groupset,
            description: listing.description,
            extraSpecs,
          }}
        />
      </main>
    </>
  );
}
