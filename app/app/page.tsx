import Link from "next/link";
import FAQ from "@/components/landing/FAQ";

/* ── SVG Icons ───────────────────────────────────────────── */
const IconCamera = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

const IconUpload = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
    <path d="M15 3v6M12 6l-3 3 3 3"/>
  </svg>
);

const IconGauge = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 12l4-7"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

const IconGuide = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

/* ── Navbar ─────────────────────────────────────────────── */
function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0F0F0F] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="#E84C3D"/>
            <circle cx="14" cy="18" r="5" stroke="white" strokeWidth="1.8"/>
            <circle cx="14" cy="18" r="1.5" fill="white"/>
            <path d="M14 13V8M9 18H4M19 18h5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="8" cy="18" r="4" stroke="white" strokeWidth="1.6"/>
            <circle cx="20" cy="18" r="4" stroke="white" strokeWidth="1.6"/>
          </svg>
          <span className="font-extrabold text-lg tracking-tight text-white">
            Gowes<span className="text-[#E84C3D]">Fit</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm text-white/50">
          <a href="#cara-pakai" className="hover:text-white transition-colors">Cara Pakai</a>
          <a href="#fitur" className="hover:text-white transition-colors">Fitur</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        <Link
          href="/fitting"
          className="px-4 py-2 bg-[#E84C3D] text-white text-sm font-bold rounded-md hover:bg-[#B83028] transition-colors tracking-wide"
        >
          Mulai Gratis
        </Link>
      </div>
    </nav>
  );
}

/* ── Hero ────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="bg-[#0F0F0F] pt-20 pb-28 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 70% 50%, rgba(232,76,61,0.08) 0%, transparent 60%)",
      }}/>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-[#E84C3D] text-xs font-bold tracking-[0.2em] uppercase mb-8">
            Bike Fitting · Gratis · Real-Time
          </p>

          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.0] text-white mb-8">
            Fitting Sepeda<br />
            Sendiri.<br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "2px #E84C3D" }}
            >
              Tanpa Fitter.
            </span>
          </h1>

          <p className="text-white/50 text-lg leading-relaxed max-w-xl mb-12">
            Analisis posisi tubuhmu via kamera secara real-time. Tidak perlu ke toko, tidak perlu fitter mahal — cukup browser dan sepedamu.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/fitting"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#E84C3D] text-white font-bold rounded-md hover:bg-[#B83028] transition-colors"
            >
              Mulai Fitting <IconArrow />
            </Link>
            <a
              href="#cara-pakai"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white/70 font-semibold rounded-md hover:border-white/40 hover:text-white transition-colors text-sm"
            >
              Lihat Cara Kerja
            </a>
          </div>
        </div>

        {/* Angle visualization mock */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 w-72">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur">
            <div className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-3">Live Analysis</div>
            {[
              { label: "Knee Angle", value: "142°", status: "Ideal", color: "#1E9E5A", pct: 65 },
              { label: "Torso Angle", value: "28°", status: "Sesuaikan", color: "#C47F00", pct: 30 },
              { label: "Elbow Angle", value: "95°", status: "Ideal", color: "#1E9E5A", pct: 72 },
            ].map((item) => (
              <div key={item.label} className="mb-4 last:mb-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white/60 text-xs">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm">{item.value}</span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: item.color + "22", color: item.color }}>{item.status}</span>
                  </div>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#E84C3D]/10 border border-[#E84C3D]/30 rounded-xl p-5">
            <div className="text-[#E84C3D] text-[10px] font-bold tracking-widest uppercase mb-1">Fit Score</div>
            <div className="flex items-end gap-2">
              <span className="text-white font-extrabold text-5xl leading-none">78</span>
              <span className="text-white/30 text-sm mb-1">/100</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stats Strip ─────────────────────────────────────────── */
function StatsStrip() {
  const stats = [
    { value: "4", label: "Parameter diukur" },
    { value: "0", label: "Instalasi dibutuhkan" },
    { value: "100%", label: "Gratis selamanya" },
    { value: "<3s", label: "Waktu analisis" },
  ];
  return (
    <section className="bg-[#1A1A1A] border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
        {stats.map((s) => (
          <div key={s.label} className="px-8 first:pl-0 last:pr-0 py-2">
            <div className="text-3xl font-extrabold text-white tracking-tight">{s.value}</div>
            <div className="text-white/40 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── How It Works ────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Pasang Kamera dari Samping",
      desc: "Letakkan HP atau laptop di samping kamu, setinggi sadel. Pastikan seluruh tubuh dan sepeda terlihat dalam frame.",
    },
    {
      num: "02",
      title: "Kayuh Seperti Biasa",
      desc: "Tidak perlu pose khusus. GowesFit mendeteksi posisi tubuhmu secara otomatis dan menganalisis sudut gerakanmu.",
    },
    {
      num: "03",
      title: "Lihat Skor & Saran",
      desc: "Lihat sudut tiap sendi, status ideal atau tidak, dan apa yang harus diubah — sadel, stang, atau posisi tubuh.",
    },
  ];

  return (
    <section id="cara-pakai" className="bg-[#FAFAF8] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[#E84C3D] text-xs font-bold tracking-[0.2em] uppercase mb-4">Cara Pakai</p>
          <h2 className="text-5xl font-extrabold tracking-tight text-[#1A1A1A] leading-tight">Semudah 1–2–3</h2>
        </div>

        <div className="space-y-0 divide-y divide-[#E0DDD8] border-y border-[#E0DDD8]">
          {steps.map((step) => (
            <div key={step.num} className="grid md:grid-cols-[140px_1fr] gap-8 md:gap-16 py-10">
              <div className="text-[#E84C3D] text-5xl font-extrabold tracking-tight leading-none">{step.num}</div>
              <div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">{step.title}</h3>
                <p className="text-[#4A4A4A] leading-relaxed max-w-lg">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Features ────────────────────────────────────────────── */
function Features() {
  return (
    <section id="fitur" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[#E84C3D] text-xs font-bold tracking-[0.2em] uppercase mb-4">Fitur</p>
          <h2 className="text-5xl font-extrabold tracking-tight text-[#1A1A1A] leading-tight">Apa yang Bisa<br />GowesFit Lakukan?</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left column - 2 stacked */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#FAFAF8] border border-[#E0DDD8] rounded-xl p-8">
              <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] text-white flex items-center justify-center mb-6">
                <IconCamera />
              </div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#E84C3D] mb-2">Kamera Real-time</div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Analisis Langsung Saat Kamu Riding</h3>
              <p className="text-sm text-[#4A4A4A] leading-relaxed">
                Tidak perlu foto dulu. Aktifkan kamera, mulai mengayuh, dan lihat hasilnya bergerak secara real-time.
              </p>
            </div>

            <div className="bg-[#FAFAF8] border border-[#E0DDD8] rounded-xl p-8">
              <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] text-white flex items-center justify-center mb-6">
                <IconUpload />
              </div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#E84C3D] mb-2">Upload Foto</div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Sudah Punya Foto Riding?</h3>
              <p className="text-sm text-[#4A4A4A] leading-relaxed">
                Upload foto dari samping dan GowesFit akan menganalisis posisi tubuhmu — cocok kalau kamu tidak punya tripod.
              </p>
            </div>
          </div>

          {/* Right column - tall card */}
          <div className="bg-[#1A1A1A] rounded-xl p-8 flex flex-col">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-[#E84C3D] mb-2">Fit Score</div>
                <h3 className="text-xl font-bold text-white">Skor Fitting dalam 1 Angka</h3>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/5 text-white/60 flex items-center justify-center flex-shrink-0">
                <IconGauge />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center py-8">
              <div className="text-[120px] font-extrabold text-white leading-none tracking-tighter">87</div>
              <div className="text-white/30 text-sm mt-2 mb-8">dari 100</div>
              <div className="w-full space-y-2">
                {[
                  { label: "Knee", pct: 88, color: "#1E9E5A" },
                  { label: "Torso", pct: 62, color: "#C47F00" },
                  { label: "Elbow", pct: 90, color: "#1E9E5A" },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-3">
                    <span className="text-white/40 text-xs w-10">{b.label}</span>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: b.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#E84C3D] mb-2">Panduan Penyesuaian</div>
              <p className="text-sm text-white/50 leading-relaxed">
                GowesFit memberi tahu apa yang perlu digeser: sadel naik, stang maju, atau posisi tangan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Angle Parameters ────────────────────────────────────── */
function AngleParams() {
  const params = [
    { name: "Knee Angle", desc: "Saat pedal di posisi paling bawah", range: "135° – 150°" },
    { name: "Torso Angle", desc: "Kemiringan punggung terhadap vertikal", range: "35° – 55°" },
    { name: "Elbow Angle", desc: "Tekukan lengan saat memegang stang", range: "80° – 100°" },
    { name: "Reach", desc: "Jarak bahu ke stang via lengan", range: "Proporsional" },
  ];

  return (
    <section className="bg-[#E84C3D] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-4">Parameter</p>
            <h2 className="text-5xl font-extrabold tracking-tight text-white leading-tight">4 Sudut yang<br />Dianalisis</h2>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Empat sudut utama paling berpengaruh terhadap kenyamanan dan efisiensi riding.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/20 rounded-xl overflow-hidden border border-white/20">
          {params.map((p, i) => (
            <div key={p.name} className="bg-[#E84C3D] p-8">
              <div className="text-white/40 text-xs font-bold tracking-widest uppercase mb-6">
                0{i + 1}
              </div>
              <div className="text-white font-extrabold text-xl mb-2">{p.name}</div>
              <div className="text-white/60 text-sm mb-8 leading-relaxed">{p.desc}</div>
              <div className="border-t border-white/20 pt-5">
                <div className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Range Ideal</div>
                <div className="text-white font-bold text-sm">{p.range}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-white/40 text-xs mt-6">
          *Range ideal dapat berbeda tergantung jenis sepeda dan preferensi rider.
        </p>
      </div>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────────── */
function FAQSection() {
  return (
    <section id="faq" className="bg-[#FAFAF8] py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[300px_1fr] gap-16">
        <div>
          <p className="text-[#E84C3D] text-xs font-bold tracking-[0.2em] uppercase mb-4">FAQ</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-[#1A1A1A] leading-tight">Pertanyaan yang Sering Ditanya</h2>
        </div>
        <FAQ />
      </div>
    </section>
  );
}

/* ── CTA Final ───────────────────────────────────────────── */
function CTAFinal() {
  return (
    <section className="bg-[#0F0F0F] py-28">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        <div>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Siap Gowes<br />
            <span className="text-[#E84C3D]">Lebih Nyaman?</span>
          </h2>
          <p className="text-white/40 text-base">
            Tidak perlu daftar. Tidak perlu install. Langsung dari browser.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Link
            href="/fitting"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#E84C3D] text-white font-bold text-lg rounded-md hover:bg-[#B83028] transition-colors"
          >
            Mulai Fitting Sekarang <IconArrow />
          </Link>
          <p className="text-white/30 text-xs mt-4 text-center">100% Gratis · Tanpa Registrasi</p>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#0F0F0F] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-extrabold text-base text-white">
          Gowes<span className="text-[#E84C3D]">Fit</span>
        </span>

        <div className="flex items-center gap-6 text-xs text-white/30">
          <a href="#cara-pakai" className="hover:text-white/60 transition-colors">Cara Pakai</a>
          <a href="#fitur" className="hover:text-white/60 transition-colors">Fitur</a>
          <a href="#faq" className="hover:text-white/60 transition-colors">FAQ</a>
        </div>

        <p className="text-xs text-white/20">© 2026 GowesFit · Untuk komunitas goweser Indonesia</p>
      </div>
    </footer>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsStrip />
      <HowItWorks />
      <Features />
      <AngleParams />
      <FAQSection />
      <CTAFinal />
      <Footer />
    </>
  );
}
