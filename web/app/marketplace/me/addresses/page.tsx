import Link from "next/link";
import { PageTopBar } from "../../_components/TopBar";
import { IconCheck, IconChevronRight, IconMapPin, IconPlus, IconX } from "../../_components/icons";
import { ButtonLink } from "@/components/ui";

const MOCK_ADDRESSES = [
  {
    id: "a1",
    label: "Rumah",
    name: "Ihsan Fajari",
    phone: "+62 812 3456 7890",
    address: "Jl. Kemang Raya No. 42, RT 5 RW 3",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    postalCode: "12730",
    isPrimary: true,
  },
  {
    id: "a2",
    label: "Kantor",
    name: "Ihsan Fajari",
    phone: "+62 812 3456 7890",
    address: "Jl. Sudirman Kav. 52, Gedung BRI Tower Lt. 12",
    city: "Jakarta Pusat",
    province: "DKI Jakarta",
    postalCode: "10220",
    isPrimary: false,
  },
];

export default function ManageAddressesPage() {
  return (
    <>
      <PageTopBar title="Alamat Pengiriman" backHref="/marketplace/me/edit" />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        <section className="px-5 pt-4 pb-2">
          <p className="text-[13px] text-[var(--color-m-ink-500)] leading-relaxed">
            Alamat yang tersimpan akan dipakai saat checkout. Kamu bisa pilih alamat berbeda saat transaksi.
          </p>
        </section>

        <section className="px-5 space-y-3 mt-2">
          {MOCK_ADDRESSES.map((addr) => (
            <div
              key={addr.id}
              className="bg-[var(--color-m-paper)] rounded-2xl overflow-hidden m-shadow-xs"
            >
              <div className="px-4 pt-4 pb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold px-2 py-0.5 rounded-full bg-[var(--color-m-ink-100)] text-[var(--color-m-ink-700)]">
                      {addr.label}
                    </span>
                    {addr.isPrimary && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[var(--color-m-orange-100)] text-[var(--color-m-orange-700)]">
                        Utama
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-[14px] font-bold text-[var(--color-m-ink-900)]">{addr.name}</div>
                <div className="text-[12px] text-[var(--color-m-ink-500)] mt-0.5">{addr.phone}</div>
                <div className="text-[13px] text-[var(--color-m-ink-700)] mt-1.5 leading-relaxed">
                  {addr.address}, {addr.city}, {addr.province} {addr.postalCode}
                </div>
              </div>

              <div className="border-t border-[var(--color-m-ink-50)] flex">
                {!addr.isPrimary && (
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-[12px] font-semibold text-[var(--color-m-teal-600)] border-r border-[var(--color-m-ink-50)] hover:bg-[var(--color-m-teal-100)]/30">
                    <IconCheck size={14} />
                    Jadikan Utama
                  </button>
                )}
                <Link
                  href={`/marketplace/me/addresses/${addr.id}/edit`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 text-[12px] font-semibold text-[var(--color-m-ink-600)] border-r border-[var(--color-m-ink-50)] hover:bg-[var(--color-m-ink-50)]"
                >
                  Edit
                </Link>
                {!addr.isPrimary && (
                  <button className="flex items-center justify-center px-4 py-3 text-[var(--color-m-ink-400)] hover:text-red-500 hover:bg-red-50">
                    <IconX size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>

        <section className="px-5 mt-4">
          <Link
            href="/marketplace/me/addresses/new"
            className="flex items-center gap-3 w-full p-4 rounded-2xl border-2 border-dashed border-[var(--color-m-ink-200)] text-[var(--color-m-ink-600)] hover:border-[var(--color-m-orange-400)] hover:text-[var(--color-m-orange-600)] hover:bg-[var(--color-m-orange-100)]/20 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-[var(--color-m-ink-50)] flex items-center justify-center flex-shrink-0">
              <IconPlus size={18} />
            </div>
            <div>
              <div className="text-[13px] font-bold">Tambah Alamat Baru</div>
              <div className="text-[11px] text-[var(--color-m-ink-400)] mt-0.5">Maks. 5 alamat tersimpan</div>
            </div>
          </Link>
        </section>

        <section className="px-5 mt-4 p-4 rounded-2xl bg-[var(--color-m-cream)] mx-5">
          <div className="flex items-start gap-2.5">
            <IconMapPin size={16} className="text-[var(--color-m-ink-400)] mt-0.5 flex-shrink-0" />
            <p className="text-[12px] text-[var(--color-m-ink-500)] leading-relaxed">
              Alamat utama otomatis terisi saat checkout. Nomor HP dan alamat kamu tidak ditampilkan ke penjual sebelum transaksi terkonfirmasi.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}