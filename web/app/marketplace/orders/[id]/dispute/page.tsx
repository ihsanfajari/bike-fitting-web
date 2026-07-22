import { notFound } from "next/navigation";
import Link from "next/link";
import { PageTopBar } from "../../../_components/TopBar";
import { IconShield, IconAlertTriangle } from "../../../_components/icons";
import { getListing, getOrder } from "@/lib/mock/data";
import { formatRupiah } from "@/lib/format";
import { ButtonLink, Field, Textarea } from "@/components/ui";

const REASONS = [
  { id: "not_as_desc", label: "Barang tidak sesuai deskripsi / foto" },
  { id: "damaged", label: "Barang rusak saat diterima" },
  { id: "not_received", label: "Barang belum diterima (lewat deadline)" },
  { id: "wrong_item", label: "Barang yang dikirim salah / tidak lengkap" },
  { id: "fraud", label: "Indikasi penipuan / penyalahgunaan rekber" },
  { id: "other", label: "Alasan lainnya" },
];

export default async function DisputePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) notFound();
  const item = getListing(order.listingId);

  return (
    <>
      <PageTopBar title="Ajukan Dispute" backHref={`/marketplace/orders/${order.id}`} />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        {/* Warning banner */}
        <section className="bg-[var(--color-m-amber-100)] px-5 py-4 border-b border-[var(--color-m-amber-100)]">
          <div className="flex items-start gap-2.5">
            <IconAlertTriangle size={22} className="flex-shrink-0 text-[var(--color-m-amber-500)]" />
            <div>
              <div className="text-[13px] font-bold text-[var(--color-m-ink-900)] mb-0.5">
                Ajukan dispute dalam 3 hari setelah barang sampai
              </div>
              <p className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
                Lewat dari 3 hari, dana otomatis cair ke penjual. Tim GowesFit akan meninjau dalam 1–2 hari kerja.
              </p>
            </div>
          </div>
        </section>

        {/* Item summary */}
        <section className="bg-[var(--color-m-paper)] px-5 py-4 mt-3 border-b border-[var(--color-m-ink-100)]">
          <div className="flex gap-3">
            <div
              className="w-14 h-14 rounded-xl flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#FFE5D6,#E0F7F8)" }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold text-[var(--color-m-ink-900)] line-clamp-2 leading-snug">
                {item?.title}
              </div>
              <div className="text-[12px] text-[var(--color-m-ink-500)] mt-0.5 m-tnum">{formatRupiah(order.itemPrice)}</div>
              <div className="text-[11px] text-[var(--color-m-ink-400)] font-mono mt-0.5">{order.orderNumber}</div>
            </div>
          </div>
        </section>

        {/* Reason selection */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-1">Apa masalahnya?</h2>
          <p className="text-[12px] text-[var(--color-m-ink-500)] mb-4 leading-relaxed">
            Pilih alasan yang paling sesuai dengan kondisimu.
          </p>
          <div className="space-y-2">
            {REASONS.map((r, i) => (
              <label
                key={r.id}
                className={`flex items-center gap-3 p-3.5 rounded-xl border-[1.5px] cursor-pointer transition-all ${
                  i === 0
                    ? "border-[var(--color-m-orange-400)] bg-[var(--color-m-orange-100)]/40"
                    : "border-[var(--color-m-ink-100)] bg-white hover:border-[var(--color-m-orange-200)]"
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={r.id}
                  defaultChecked={i === 0}
                  className="w-4 h-4 accent-[var(--color-m-orange-500)] flex-shrink-0"
                />
                <span className="text-[13px] text-[var(--color-m-ink-800)] leading-snug">{r.label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Description */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <Field
            label="Jelaskan masalahnya"
            required
            hint="Semakin detail keteranganmu, semakin cepat tim kami bisa meninjau. Min 30 karakter."
          >
            <Textarea
              rows={5}
              placeholder="Contoh: Barang tiba dengan kondisi rantai putus dan RD bengkok. Saat unboxing kondisi packing memang sudah terlihat rusak. Saya sudah foto buktinya."
            />
          </Field>
        </section>

        {/* Photo evidence */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <div className="text-[14px] font-bold text-[var(--color-m-ink-900)] mb-1">
            Foto bukti <span className="text-[var(--color-m-ink-400)] font-normal text-[12px]">(opsional tapi sangat membantu)</span>
          </div>
          <p className="text-[12px] text-[var(--color-m-ink-500)] mb-3 leading-relaxed">
            Foto kerusakan, kondisi packing, atau bukti percakapan. Maks 5 foto.
          </p>
          <div className="flex gap-2 flex-wrap">
            {/* Mock uploaded photo */}
            <div
              className="w-20 h-20 rounded-xl flex-shrink-0 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#FBEAEA,#FFE5D6)" }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-[10px] text-[var(--color-m-ink-500)]">
                Foto 1
              </div>
            </div>
            {/* Add photo button */}
            <button className="w-20 h-20 rounded-xl border-2 border-dashed border-[var(--color-m-ink-200)] flex flex-col items-center justify-center gap-1 text-[var(--color-m-ink-400)] hover:border-[var(--color-m-orange-300)] transition-colors">
              <span className="text-[24px] leading-none">+</span>
              <span className="text-[10px] font-semibold">Tambah</span>
            </button>
          </div>
        </section>

        {/* Process info */}
        <section className="px-5 py-4 mt-1">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-m-green-100)]/60">
            <IconShield size={20} className="text-[var(--color-m-green-500)] flex-shrink-0 mt-0.5" />
            <div className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
              <b>Dana tetap ditahan rekber</b> selama proses dispute berlangsung. Jika dispute diterima, dana dikembalikan ke kamu. Jika ditolak, dana cair ke penjual.
            </div>
          </div>
        </section>

        <section className="px-5 pb-4">
          <p className="text-[11px] text-[var(--color-m-ink-500)] text-center leading-relaxed">
            Dengan mengajukan dispute, kamu setuju proses diselesaikan oleh tim GowesFit sebagai mediator.
            Keputusan final tim bersifat mengikat.
          </p>
        </section>
      </main>

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
        <Link
          href={`/marketplace/orders/${order.id}`}
          className="px-5 h-12 rounded-xl border border-[var(--color-m-ink-200)] flex items-center justify-center text-[13px] font-bold text-[var(--color-m-ink-700)]"
        >
          Batal
        </Link>
        <ButtonLink
          href={`/marketplace/orders/${order.id}`}
          full
          size="lg"
          variant="danger"
        >
          Kirim Dispute
        </ButtonLink>
      </div>
    </>
  );
}
