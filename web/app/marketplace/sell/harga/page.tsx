import { redirect } from "next/navigation";
import { PageTopBar } from "../../_components/TopBar";
import { Stepper } from "../_components/Stepper";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getListingForEdit } from "@/lib/listings/queries";
import { HargaForm } from "./HargaForm";

export default async function SellStep3Page({
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

  return (
    <>
      <PageTopBar title="Buat Listing — 3/3" backHref={`/marketplace/sell/spesifikasi?id=${id}`} />
      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        <Stepper current={3} />
        <HargaForm
          initial={{
            listingId: listing.id,
            price: Number(listing.price),
            isNegotiable: listing.isNegotiable,
            allowCod: listing.allowCod,
            city: listing.city,
            province: listing.province,
          }}
        />
      </main>
    </>
  );
}
