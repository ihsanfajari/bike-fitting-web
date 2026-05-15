import { PageTopBar } from "../../../_components/TopBar";
import { NewAddressForm } from "./NewAddressForm";

export default function NewAddressPage() {
  return (
    <>
      <PageTopBar title="Tambah Alamat" backHref="/marketplace/me/addresses" />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        <NewAddressForm />
      </main>
    </>
  );
}
