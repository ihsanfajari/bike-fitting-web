"use client";

import { useState } from "react";
import Link from "next/link";
import { TopBar } from "../_components/TopBar";
import { Button, Chip, Input, InputGroup, Select, Textarea, SectionLabel, PhotoPlaceholder } from "../_components/ui";
import { IconCamera, IconCheck, IconPlus, IconX } from "../_components/icons";
import { CATEGORIES, CONDITION_LABEL } from "../_lib/mock-data";
import { formatRupiah } from "../_lib/format";

type Step = 1 | 2 | 3;

export default function SellPage() {
  const [step, setStep] = useState<Step>(1);
  const [photos, setPhotos] = useState<number[]>([1, 2, 3]);
  const [category, setCategory] = useState("roadbike");
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("2023");
  const [frameSize, setFrameSize] = useState("");
  const [groupset, setGroupset] = useState("");
  const [material, setMaterial] = useState("Aluminum");
  const [condition, setCondition] = useState<keyof typeof CONDITION_LABEL>("used_mint");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState(false);
  const [cod, setCod] = useState(false);
  const [city, setCity] = useState("Jakarta Selatan");

  const parsedPrice = Number(price.replace(/\./g, "")) || 0;

  return (
    <>
      <TopBar title="Jual Sepeda" back />

      <div className="bg-white border-b border-[var(--color-sp-black-100)] px-4 py-4">
        <div className="flex items-center">
          {[1, 2, 3].map((n) => {
            const active = step === n;
            const done = step > n;
            const label = n === 1 ? "Foto" : n === 2 ? "Spesifikasi" : "Harga";
            return (
              <div key={n} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-7 h-7 sp-display text-[11px] font-extrabold flex items-center justify-center ${
                      done ? "bg-[var(--color-sp-green)] text-white" : active ? "bg-[var(--color-sp-red)] text-white" : "bg-[var(--color-sp-black-100)] text-[var(--color-sp-black-400)]"
                    }`}
                  >
                    {done ? <IconCheck size={14} /> : n}
                  </div>
                  <div className={`sp-display text-[9px] uppercase font-bold tracking-wide ${active ? "text-[var(--color-sp-red)]" : done ? "text-[var(--color-sp-green)]" : "text-[var(--color-sp-black-400)]"}`}>
                    {label}
                  </div>
                </div>
                {n < 3 && <div className={`flex-1 h-[2px] mx-2 mb-4 ${done ? "bg-[var(--color-sp-green)]" : "bg-[var(--color-sp-black-100)]"}`} />}
              </div>
            );
          })}
        </div>
      </div>

      <main className="flex-1 pb-24">
        {step === 1 && (
          <>
            <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
              <SectionLabel className="mb-3">Foto Produk · Minimum 3, Maksimum 10</SectionLabel>

              <div className="grid grid-cols-3 gap-2 mb-2">
                {photos.map((p, i) => (
                  <div key={p} className="relative aspect-square">
                    <PhotoPlaceholder className="w-full h-full" label={`foto ${i + 1}`} />
                    {i === 0 && (
                      <div className="absolute top-1 left-1 sp-display text-[8px] font-extrabold uppercase bg-[var(--color-sp-red)] text-white px-1.5 py-0.5">
                        Utama
                      </div>
                    )}
                    <button
                      onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 bg-[var(--color-sp-black)] text-white p-0.5"
                      aria-label="Hapus"
                    >
                      <IconX size={12} />
                    </button>
                  </div>
                ))}
                {photos.length < 10 && (
                  <button
                    onClick={() => setPhotos([...photos, photos.length + 1])}
                    className="aspect-square border-2 border-dashed border-[var(--color-sp-black-200)] flex flex-col items-center justify-center gap-1 text-[var(--color-sp-black-400)] hover:border-[var(--color-sp-red)] hover:text-[var(--color-sp-red)]"
                  >
                    <IconPlus size={24} />
                    <span className="sp-display text-[9px] font-bold uppercase">Tambah</span>
                  </button>
                )}
              </div>

              <div className="flex gap-2 mt-3">
                <button className="sp-display flex-1 flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase border-[1.5px] border-[var(--color-sp-black)] text-[var(--color-sp-black)] py-2.5 hover:bg-[var(--color-sp-black-50)]">
                  <IconCamera size={14} /> Ambil Foto
                </button>
                <button className="sp-display flex-1 flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase border-[1.5px] border-[var(--color-sp-black-100)] text-[var(--color-sp-black-600)] py-2.5 hover:bg-[var(--color-sp-black-50)]">
                  <IconPlus size={14} /> Upload dari Galeri
                </button>
              </div>
            </section>

            <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
              <SectionLabel className="mb-3">Kategori</SectionLabel>
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.slice(0, 8).map((c) => (
                  <Chip key={c.slug} active={category === c.slug} onClick={() => setCategory(c.slug)}>
                    {c.icon} {c.name}
                  </Chip>
                ))}
              </div>
            </section>

            <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
              <InputGroup label="Judul Listing" helper={`${title.length} / 80 karakter`}>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value.slice(0, 80))}
                  placeholder="Contoh: Trek Domane SL5 2022 Full 105"
                />
              </InputGroup>
            </section>

            <div className="px-4 py-3 text-[11px] text-[var(--color-sp-black-400)] text-center">
              Foto pertama akan dijadikan foto utama. Tarik untuk mengurutkan.
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
              <SectionLabel className="mb-3">Identitas Produk</SectionLabel>
              <InputGroup label="Merek">
                <Input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Trek, Polygon, Specialized..." />
              </InputGroup>
              <InputGroup label="Model">
                <Input value={model} onChange={(e) => setModel(e.target.value)} placeholder="Domane SL5, Strattos S5..." />
              </InputGroup>
              <InputGroup label="Tahun">
                <Select value={year} onChange={(e) => setYear(e.target.value)}>
                  {Array.from({ length: 15 }).map((_, i) => {
                    const y = 2026 - i;
                    return <option key={y} value={String(y)}>{y}</option>;
                  })}
                  <option value="older">Lebih lama</option>
                </Select>
              </InputGroup>
            </section>

            <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
              <SectionLabel className="mb-3">Spesifikasi Teknis</SectionLabel>
              <InputGroup label="Ukuran Frame" helper="Contoh: S / M / L atau 52 / 54 / 56">
                <Input value={frameSize} onChange={(e) => setFrameSize(e.target.value)} placeholder="54" />
              </InputGroup>
              <InputGroup label="Material Frame">
                <Select value={material} onChange={(e) => setMaterial(e.target.value)}>
                  <option value="Aluminum">Aluminium</option>
                  <option value="Carbon">Carbon</option>
                  <option value="Steel">Steel / Cromoly</option>
                  <option value="Titanium">Titanium</option>
                  <option value="Other">Lainnya</option>
                </Select>
              </InputGroup>
              <InputGroup label="Groupset">
                <Input value={groupset} onChange={(e) => setGroupset(e.target.value)} placeholder="Shimano 105 R7000" />
              </InputGroup>
            </section>

            <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
              <SectionLabel className="mb-3">Kondisi</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {(Object.entries(CONDITION_LABEL) as [keyof typeof CONDITION_LABEL, string][]).map(([k, v]) => (
                  <Chip key={k} active={condition === k} onClick={() => setCondition(k)}>
                    {v}
                  </Chip>
                ))}
              </div>
            </section>

            <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
              <InputGroup label="Deskripsi" helper={`${description.length} / 2000 karakter · Ceritakan riwayat penggunaan, aksesori yang disertakan, alasan jual.`}>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 2000))}
                  rows={6}
                  placeholder="Dijual karena upgrade... kondisi masih mulus..."
                />
              </InputGroup>
            </section>
          </>
        )}

        {step === 3 && (
          <>
            <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
              <SectionLabel className="mb-3">Harga</SectionLabel>
              <InputGroup label="Harga Jual">
                <div className="flex">
                  <div className="sp-body px-3 py-[10px] bg-[var(--color-sp-black-50)] border-[1.5px] border-[var(--color-sp-black-100)] border-r-0 text-[13px] text-[var(--color-sp-black-400)]">
                    Rp
                  </div>
                  <Input
                    value={price}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      setPrice(raw ? Number(raw).toLocaleString("id-ID") : "");
                    }}
                    placeholder="22.000.000"
                    className="flex-1"
                  />
                </div>
              </InputGroup>

              <label className="flex items-center gap-3 py-3 cursor-pointer">
                <div
                  onClick={() => setNegotiable(!negotiable)}
                  className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${negotiable ? "bg-[var(--color-sp-red)]" : "bg-[var(--color-sp-black-200)]"}`}
                >
                  <div className={`w-[18px] h-[18px] bg-white rounded-full absolute top-[3px] transition-all ${negotiable ? "right-[3px]" : "left-[3px]"}`} />
                </div>
                <div>
                  <div className="text-[13px] font-bold">Bisa Nego</div>
                  <div className="text-[11px] text-[var(--color-sp-black-400)]">Pembeli boleh menawar harga</div>
                </div>
              </label>

              <label className="flex items-center gap-3 py-3 border-t border-[var(--color-sp-black-100)] cursor-pointer">
                <div
                  onClick={() => setCod(!cod)}
                  className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${cod ? "bg-[var(--color-sp-red)]" : "bg-[var(--color-sp-black-200)]"}`}
                >
                  <div className={`w-[18px] h-[18px] bg-white rounded-full absolute top-[3px] transition-all ${cod ? "right-[3px]" : "left-[3px]"}`} />
                </div>
                <div>
                  <div className="text-[13px] font-bold">Terima COD</div>
                  <div className="text-[11px] text-[var(--color-sp-black-400)]">Pembeli bisa ambil langsung di lokasi</div>
                </div>
              </label>
            </section>

            <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
              <InputGroup label="Kota Lokasi Barang">
                <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Jakarta Selatan" />
              </InputGroup>
            </section>

            {/* Preview */}
            <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
              <SectionLabel className="mb-3">Preview Listing</SectionLabel>
              <div className="border border-[var(--color-sp-black-100)]">
                <PhotoPlaceholder className="aspect-[4/3] w-full" label="foto utama" />
                <div className="p-3">
                  <div className="sp-display text-[22px] font-extrabold text-[var(--color-sp-red)] leading-none mb-1">
                    {parsedPrice > 0 ? formatRupiah(parsedPrice) : "Rp 0"}
                  </div>
                  <div className="text-[14px] font-bold mb-2">{title || "Judul listing kamu"}</div>
                  <div className="text-[11px] text-[var(--color-sp-black-400)]">
                    {brand || "Merek"} · {CONDITION_LABEL[condition]} · {city}
                  </div>
                </div>
              </div>
            </section>

            <div className="px-4 pt-4 text-[11px] text-[var(--color-sp-black-400)] leading-relaxed">
              Dengan menekan Publikasikan, kamu setuju dengan <span className="text-[var(--color-sp-red)] font-bold">Syarat Jual Beli SEPEDAIN</span> dan komisi rekber 1%.
            </div>
          </>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none">
        <div className="w-full max-w-[480px] bg-white border-t-2 border-[var(--color-sp-black)] px-4 py-3 flex gap-2 pointer-events-auto">
          {step > 1 && (
            <Button variant="ghost" size="md" onClick={() => setStep((step - 1) as Step)}>
              Kembali
            </Button>
          )}
          {step < 3 ? (
            <Button size="md" className="flex-1" onClick={() => setStep((step + 1) as Step)}>
              Lanjut →
            </Button>
          ) : (
            <Link
              href="/marketplace/dashboard"
              className="sp-display flex-1 inline-flex items-center justify-center text-[13px] font-extrabold uppercase tracking-wide border-2 border-[var(--color-sp-red)] bg-[var(--color-sp-red)] text-white px-[18px] py-[11px]"
            >
              Publikasikan
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
