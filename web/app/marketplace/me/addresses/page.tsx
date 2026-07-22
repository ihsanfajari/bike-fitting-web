import Link from "next/link";
import { redirect } from "next/navigation";
import { PageTopBar } from "../../_components/TopBar";
import { IconMapPin, IconPlus } from "../../_components/icons";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { AddressActions } from "./AddressActions";

export default async function ManageAddressesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/marketplace/sign-in");

  const addresses = await prisma.address.findMany({
    where: { userId: user.id },
    orderBy: [{ isPrimary: "desc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <PageTopBar title="Alamat Pengiriman" backHref="/marketplace/me" />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        <section className="px-5 pt-4 pb-2">
          <p className="text-[13px] text-[var(--color-m-ink-500)] leading-relaxed">
            Alamat yang tersimpan akan dipakai saat checkout. Kamu bisa pilih alamat berbeda saat transaksi.
          </p>
        </section>

        {addresses.length === 0 && (
          <section className="px-5 mt-4">
            <div className="text-center py-10 px-4 rounded-2xl bg-[var(--color-m-paper)] m-shadow-xs">
              <div className="flex justify-center mb-3"><IconMapPin size={38} className="text-[var(--color-m-orange-400)]" /></div>
              <div className="text-[14px] font-bold text-[var(--color-m-ink-900)]">Belum ada alamat tersimpan</div>
              <p className="text-[12px] text-[var(--color-m-ink-500)] mt-1.5">
                Tambahkan alamat pertama kamu — dipakai otomatis saat checkout.
              </p>
            </div>
          </section>
        )}

        <section className="px-5 space-y-3 mt-2">
          {addresses.map((addr) => (
            <div key={addr.id} className="bg-[var(--color-m-paper)] rounded-2xl overflow-hidden m-shadow-xs">
              <div className="px-4 pt-4 pb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {addr.label && (
                      <span className="text-[12px] font-bold px-2 py-0.5 rounded-full bg-[var(--color-m-ink-100)] text-[var(--color-m-ink-700)]">
                        {addr.label}
                      </span>
                    )}
                    {addr.isPrimary && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[var(--color-m-orange-100)] text-[var(--color-m-orange-700)]">
                        Utama
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-[14px] font-bold text-[var(--color-m-ink-900)]">{addr.recipientName}</div>
                <div className="text-[12px] text-[var(--color-m-ink-500)] mt-0.5">{addr.recipientPhone}</div>
                <div className="text-[13px] text-[var(--color-m-ink-700)] mt-1.5 leading-relaxed">
                  {addr.fullAddress}
                  {addr.district ? `, ${addr.district}` : ""}, {addr.city}, {addr.province}
                  {addr.postalCode ? ` ${addr.postalCode}` : ""}
                </div>
              </div>
              <AddressActions addressId={addr.id} isPrimary={addr.isPrimary} />
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
              <div className="text-[11px] text-[var(--color-m-ink-400)] mt-0.5">Tidak ada batas jumlah alamat</div>
            </div>
          </Link>
        </section>

        <section className="px-5 mt-4">
          <div className="p-4 rounded-2xl bg-[var(--color-m-cream)] border border-[var(--color-m-ink-100)]">
            <div className="flex items-start gap-2.5">
              <IconMapPin size={16} className="text-[var(--color-m-ink-400)] mt-0.5 flex-shrink-0" />
              <p className="text-[12px] text-[var(--color-m-ink-500)] leading-relaxed">
                Alamat utama otomatis terisi saat checkout. Nomor HP dan alamat kamu tidak ditampilkan ke penjual sebelum transaksi terkonfirmasi.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
