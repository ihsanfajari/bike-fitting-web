"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Apakah GowesFit gratis?",
    a: "Ya, sepenuhnya gratis. Tidak ada biaya langganan, tidak ada fitur yang dikunci.",
  },
  {
    q: "Apakah data kamera saya dikirim ke server?",
    a: "Tidak. Semua analisis dilakukan langsung di browser kamu menggunakan teknologi WebAssembly. Kamera tidak merekam dan tidak mengirim data ke mana pun.",
  },
  {
    q: "Seberapa akurat hasilnya?",
    a: "Cukup akurat untuk kebutuhan mandiri di rumah. Untuk akurasi terbaik, gunakan kamera dari sisi samping dengan pencahayaan yang cukup dan pakaian yang tidak terlalu longgar.",
  },
  {
    q: "Sepeda apa saja yang didukung?",
    a: "GowesFit bisa digunakan untuk semua jenis sepeda: road bike, MTB, gravel, dan city bike. Pilih tipe sepeda sebelum memulai analisis untuk mendapatkan range sudut yang sesuai.",
  },
  {
    q: "Apakah bisa dipakai tanpa webcam?",
    a: "Bisa. Gunakan fitur Upload Foto — cukup minta bantuan orang lain untuk foto kamu saat riding dari posisi samping.",
  },
  {
    q: "Apakah ini bisa menggantikan bike fitter profesional?",
    a: "GowesFit dirancang untuk fitting mandiri dan pemula. Untuk kebutuhan kompetitif atau kondisi fisik khusus, tetap disarankan konsultasi dengan bike fitter profesional.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-[#E0DDD8]">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 py-5 text-left"
          >
            <span className="font-medium text-[#1A1A1A] text-base">{faq.q}</span>
            <span
              className="text-[#E84C3D] text-xl flex-shrink-0 transition-transform duration-200"
              style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
            >
              +
            </span>
          </button>
          {open === i && (
            <p className="pb-5 text-[#4A4A4A] text-sm leading-relaxed">
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
