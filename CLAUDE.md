# GowesFit Marketplace — Project Context

## Project Overview

GowesFit adalah platform dua-in-satu:
1. **GowesFit Fitting Tool** — Aplikasi web gratis untuk analisis posisi sepeda via kamera/foto (sudah live di `app/`)
2. **GowesFit Marketplace** — Marketplace jual beli sepeda & aksesoris khusus komunitas Indonesia (dalam pengembangan, PRD & ERD ada di `notes/`)

## Tech Stack

- **Framework**: Next.js 16 (App Router) — baca `app/AGENTS.md` sebelum menulis kode Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Pose Detection**: MediaPipe Tasks Vision (`@mediapipe/tasks-vision`)
- **Database (planned)**: PostgreSQL 15+ (lihat ERD di `notes/ERD-marketplace-sepeda.md`)
- **Payment (planned)**: Midtrans (payment gateway + disbursement/rekber)
- **Auth (planned)**: NextAuth.js

## Struktur Folder

```
bike-fitting-web/
├── app/                          # Next.js app (fitting tool — sudah live)
│   ├── app/
│   │   ├── page.tsx              # Landing page GowesFit
│   │   ├── fitting/page.tsx      # Fitting tool (kamera + foto)
│   │   └── layout.tsx
│   ├── components/
│   │   ├── PoseLandmarker.tsx    # Real-time pose detection
│   │   ├── PhotoAnalysis.tsx     # Static photo analysis
│   │   └── landing/FAQ.tsx
│   ├── lib/bikeFitScoring.ts     # Scoring algorithm
│   └── config/bikeFitStandards.ts
├── notes/                        # PRD, ERD, planning docs
│   ├── PRD-marketplace-sepeda-MVP.md
│   └── ERD-marketplace-sepeda.md
└── .agents/                      # Marketing context & skills
    ├── product-marketing-context.md   # ← BACA INI DULU sebelum tugas marketing
    └── skills/                        # Marketing skills yang aktif digunakan
        ├── customer-research/
        ├── competitor-profiling/
        ├── pricing-strategy/
        ├── signup-flow-cro/
        ├── form-cro/
        ├── analytics-tracking/
        ├── onboarding-cro/
        ├── page-cro/
        ├── ab-test-setup/
        └── churn-prevention/
```

---

## Marketing Skills — Cara Penggunaan

**Semua marketing skills ada di `.agents/skills/`**. Setiap skill punya `SKILL.md` berisi framework lengkap.

**Sebelum menggunakan skill apapun**, selalu baca dulu:
```
.agents/product-marketing-context.md
```
File ini berisi positioning, personas, competitive landscape, dan customer language GowesFit Marketplace — semua skills mereferensikan file ini supaya tidak perlu mengulangi konteks dari awal.

### Skills yang Tersedia & Kapan Digunakan

| Skill | Folder | Gunakan Untuk |
|-------|--------|---------------|
| **customer-research** | `.agents/skills/customer-research/` | Interview goweser, analisis feedback, build personas |
| **competitor-profiling** | `.agents/skills/competitor-profiling/` | Riset OLX, Tokopedia, FB Groups bike section |
| **pricing-strategy** | `.agents/skills/pricing-strategy/` | Validasi fee 1%, packaging freemium vs paid |
| **signup-flow-cro** | `.agents/skills/signup-flow-cro/` | Optimize flow registrasi seller (email → OTP → bank account) |
| **form-cro** | `.agents/skills/form-cro/` | Optimize form listing (create listing — 20+ fields jadi conversational) |
| **analytics-tracking** | `.agents/skills/analytics-tracking/` | Setup event tracking: seller funnel, buyer funnel, GMV |
| **onboarding-cro** | `.agents/skills/onboarding-cro/` | Optimize first-time seller & buyer experience |
| **page-cro** | `.agents/skills/page-cro/` | Optimize listing detail page, homepage marketplace |
| **ab-test-setup** | `.agents/skills/ab-test-setup/` | Design A/B test fee structure, CTA, form steps |
| **churn-prevention** | `.agents/skills/churn-prevention/` | Retensi seller agar tetap listing, buyer agar repeat purchase |

### Contoh Workflow

**Tugas: Riset customer**
1. Baca `.agents/product-marketing-context.md`
2. Baca `.agents/skills/customer-research/SKILL.md`
3. Jalankan framework dari skill untuk konteks GowesFit Marketplace

**Tugas: Optimize signup flow**
1. Baca `.agents/product-marketing-context.md`
2. Baca `.agents/skills/signup-flow-cro/SKILL.md`
3. Apply ke flow registrasi seller (email + HP OTP + setup bank account)

---

## Business Context Penting

- **Revenue model**: 1% transaction fee (escrow/rekber), min Rp5.000 per transaksi
- **Target MVP**: 500 listing aktif, 50 transaksi sukses dalam 3 bulan
- **Chicken-and-egg strategy**: Recruit 50 seller awal manual dari komunitas roadbike.co.id & FB Groups
- **Payment**: Midtrans untuk VA, e-wallet, QRIS — disbursement via Midtrans Iris
- **Trust mechanism**: Verifikasi HP wajib untuk bisa listing/transaksi

## Key Files untuk Konteks

- `notes/PRD-marketplace-sepeda-MVP.md` — Spesifikasi lengkap fitur MVP (33 layar, 3 user flows)
- `notes/ERD-marketplace-sepeda.md` — Database schema lengkap (20 tabel PostgreSQL)
- `.agents/product-marketing-context.md` — Marketing context (personas, positioning, competitive landscape)
