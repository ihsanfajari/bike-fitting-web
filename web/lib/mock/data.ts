/**
 * Mock data for SEPEDAIN marketplace MVP.
 * Replace with real API calls once backend is live.
 */

export type Condition = "new" | "like_new" | "used_mint" | "used_normal" | "used_repair";

export const CONDITION_LABEL: Record<Condition, string> = {
  new: "Baru",
  like_new: "Seperti Baru",
  used_mint: "Bekas Mulus",
  used_normal: "Bekas Normal",
  used_repair: "Butuh Servis",
};

export type Category = {
  slug: string;
  name: string;
  icon: string;
};

export const CATEGORIES: Category[] = [
  { slug: "roadbike", name: "Roadbike", icon: "🚴" },
  { slug: "mtb", name: "MTB", icon: "⛰️" },
  { slug: "gravel", name: "Gravel", icon: "🌾" },
  { slug: "folding", name: "Folding", icon: "🧳" },
  { slug: "bmx", name: "BMX", icon: "🎢" },
  { slug: "electric", name: "Listrik", icon: "⚡" },
  { slug: "kids", name: "Anak", icon: "🧒" },
  { slug: "frame", name: "Frame", icon: "🔩" },
  { slug: "groupset", name: "Groupset", icon: "⚙️" },
  { slug: "wheelset", name: "Wheelset", icon: "🛞" },
  { slug: "accessory", name: "Aksesoris", icon: "🎒" },
  { slug: "apparel", name: "Apparel", icon: "👕" },
];

export type Listing = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  frameSize: string;
  groupset: string;
  frameMaterial: string;
  condition: Condition;
  price: number;
  negotiable: boolean;
  cod: boolean;
  city: string;
  province: string;
  description: string;
  photos: string[];
  sellerId: string;
  status: "active" | "sold" | "paused";
  views: number;
  wishlistCount: number;
  postedAgo: string;
  extraSpecs?: Record<string, string>;
};

export type Seller = {
  id: string;
  name: string;
  avatar: string;
  city: string;
  rating: number;
  reviewCount: number;
  txCount: number;
  lastActive: string;
  verified: boolean;
  joinedYear: number;
};

export const SELLERS: Seller[] = [
  { id: "u1", name: "Budi Santoso", avatar: "BS", city: "Jakarta Selatan", rating: 4.9, reviewCount: 23, txCount: 28, lastActive: "2 jam lalu", verified: true, joinedYear: 2024 },
  { id: "u2", name: "Rama Putra", avatar: "RP", city: "Bandung", rating: 4.8, reviewCount: 15, txCount: 17, lastActive: "5 menit lalu", verified: true, joinedYear: 2025 },
  { id: "u3", name: "Adi Prakoso", avatar: "AP", city: "Yogyakarta", rating: 5.0, reviewCount: 42, txCount: 51, lastActive: "1 hari lalu", verified: true, joinedYear: 2023 },
  { id: "u4", name: "Dimas Wicaksono", avatar: "DW", city: "Surabaya", rating: 4.7, reviewCount: 8, txCount: 9, lastActive: "30 menit lalu", verified: false, joinedYear: 2025 },
  { id: "u5", name: "Toko Sepeda Kita", avatar: "TS", city: "Jakarta Barat", rating: 4.9, reviewCount: 134, txCount: 187, lastActive: "online", verified: true, joinedYear: 2022 },
];

export const LISTINGS: Listing[] = [
  {
    id: "l1",
    slug: "trek-domane-sl5-2022",
    title: "Trek Domane SL5 2022 Full Shimano 105",
    brand: "Trek",
    model: "Domane SL5",
    year: 2022,
    category: "roadbike",
    frameSize: "54",
    groupset: "Shimano 105 R7000",
    frameMaterial: "Carbon",
    condition: "used_mint",
    price: 22000000,
    negotiable: true,
    cod: true,
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    description: "Dijual Trek Domane SL5 tahun 2022. Kondisi mulus, jarang digunakan hanya weekend ride. Full Shimano 105 R7000 groupset. Frame carbon dengan IsoSpeed decoupler. Sudah termasuk pedal Shimano 105 dan bidon cage. Pajak & dokumen lengkap. Alasan jual: upgrade ke Madone.",
    photos: ["photo-1", "photo-2", "photo-3", "photo-4"],
    sellerId: "u1",
    status: "active",
    views: 142,
    wishlistCount: 18,
    postedAgo: "2 jam lalu",
    extraSpecs: { "Wheelset": "Bontrager Paradigm", "Berat": "8.2 kg", "Handlebar": "Bontrager Elite" },
  },
  {
    id: "l2",
    slug: "polygon-strattos-s5",
    title: "Polygon Strattos S5 Disc 2023",
    brand: "Polygon",
    model: "Strattos S5 Disc",
    year: 2023,
    category: "roadbike",
    frameSize: "52",
    groupset: "Shimano Tiagra 4700",
    frameMaterial: "Aluminum",
    condition: "like_new",
    price: 14500000,
    negotiable: true,
    cod: false,
    city: "Bandung",
    province: "Jawa Barat",
    description: "Polygon Strattos S5 Disc 2023 kondisi seperti baru. Baru pakai 500km. Disc brake hidrolik Shimano. Cocok untuk rider pemula sampai intermediate.",
    photos: ["photo-1", "photo-2", "photo-3"],
    sellerId: "u2",
    status: "active",
    views: 89,
    wishlistCount: 12,
    postedAgo: "5 jam lalu",
  },
  {
    id: "l3",
    slug: "specialized-rockhopper-2022",
    title: "Specialized Rockhopper Elite 29 2022",
    brand: "Specialized",
    model: "Rockhopper Elite 29",
    year: 2022,
    category: "mtb",
    frameSize: "M",
    groupset: "Shimano Deore 1x12",
    frameMaterial: "Aluminum",
    condition: "used_mint",
    price: 9800000,
    negotiable: false,
    cod: true,
    city: "Yogyakarta",
    province: "DIY",
    description: "MTB hardtail Specialized Rockhopper Elite 29. Kondisi terawat, rutin service. Dropper post seatpost KS Rage-i. Tubeless ready.",
    photos: ["photo-1", "photo-2"],
    sellerId: "u3",
    status: "active",
    views: 203,
    wishlistCount: 25,
    postedAgo: "1 hari lalu",
  },
  {
    id: "l4",
    slug: "brompton-m6l-2021",
    title: "Brompton M6L Black 2021 Original UK",
    brand: "Brompton",
    model: "M6L",
    year: 2021,
    category: "folding",
    frameSize: "One Size",
    groupset: "Brompton 6-speed",
    frameMaterial: "Steel",
    condition: "used_mint",
    price: 32500000,
    negotiable: true,
    cod: true,
    city: "Jakarta Barat",
    province: "DKI Jakarta",
    description: "Brompton M6L warna hitam original UK. Nota pembelian ada. Sudah upgrade saddle Brooks B17. Ezy wheels terpasang. Frame no scratch.",
    photos: ["photo-1", "photo-2", "photo-3", "photo-4", "photo-5"],
    sellerId: "u5",
    status: "active",
    views: 512,
    wishlistCount: 67,
    postedAgo: "3 jam lalu",
  },
  {
    id: "l5",
    slug: "shimano-105-r7000-groupset",
    title: "Shimano 105 R7000 Groupset Full Set 11-Speed",
    brand: "Shimano",
    model: "105 R7000",
    year: 2021,
    category: "groupset",
    frameSize: "N/A",
    groupset: "105 R7000 11s",
    frameMaterial: "N/A",
    condition: "used_normal",
    price: 4800000,
    negotiable: true,
    cod: false,
    city: "Surabaya",
    province: "Jawa Timur",
    description: "Groupset Shimano 105 R7000 full set: shifter, front/rear derailleur, crankset 50/34T, cassette 11-30T, chain, brake caliper.",
    photos: ["photo-1", "photo-2"],
    sellerId: "u4",
    status: "active",
    views: 67,
    wishlistCount: 5,
    postedAgo: "6 jam lalu",
  },
  {
    id: "l6",
    slug: "canyon-ultimate-cf-sl",
    title: "Canyon Ultimate CF SL 7 Disc 2023",
    brand: "Canyon",
    model: "Ultimate CF SL 7",
    year: 2023,
    category: "roadbike",
    frameSize: "M",
    groupset: "Shimano 105 Di2",
    frameMaterial: "Carbon",
    condition: "like_new",
    price: 38000000,
    negotiable: false,
    cod: false,
    city: "Jakarta Pusat",
    province: "DKI Jakarta",
    description: "Canyon Ultimate CF SL 7 Disc dengan Shimano 105 Di2 elektronik shifting. Baru pakai 800km. Kondisi sangat terawat, selalu indoor storage.",
    photos: ["photo-1", "photo-2", "photo-3"],
    sellerId: "u1",
    status: "active",
    views: 389,
    wishlistCount: 52,
    postedAgo: "8 jam lalu",
  },
  {
    id: "l7",
    slug: "fulcrum-racing-5-wheelset",
    title: "Fulcrum Racing 5 DB Wheelset Disc Brake",
    brand: "Fulcrum",
    model: "Racing 5 DB",
    year: 2022,
    category: "wheelset",
    frameSize: "700c",
    groupset: "N/A",
    frameMaterial: "Aluminum",
    condition: "used_mint",
    price: 3200000,
    negotiable: true,
    cod: true,
    city: "Bandung",
    province: "Jawa Barat",
    description: "Wheelset Fulcrum Racing 5 DB disc brake, center lock. 700c. Kondisi mulus, baru pakai 2000km. Free tire Continental Grand Prix 5000.",
    photos: ["photo-1", "photo-2"],
    sellerId: "u2",
    status: "active",
    views: 134,
    wishlistCount: 15,
    postedAgo: "12 jam lalu",
  },
  {
    id: "l8",
    slug: "giant-tcr-advanced-2",
    title: "Giant TCR Advanced 2 Disc 2022",
    brand: "Giant",
    model: "TCR Advanced 2",
    year: 2022,
    category: "roadbike",
    frameSize: "M/L",
    groupset: "Shimano 105 R7000",
    frameMaterial: "Carbon",
    condition: "used_normal",
    price: 25500000,
    negotiable: true,
    cod: true,
    city: "Yogyakarta",
    province: "DIY",
    description: "Giant TCR Advanced 2 Disc 2022. Frame carbon Advanced-Grade. Total mileage 4500km. Ada minor scratch di top tube (foto ke-4).",
    photos: ["photo-1", "photo-2", "photo-3", "photo-4"],
    sellerId: "u3",
    status: "active",
    views: 176,
    wishlistCount: 21,
    postedAgo: "1 hari lalu",
  },
];

export function getListing(idOrSlug: string): Listing | undefined {
  return LISTINGS.find((l) => l.id === idOrSlug || l.slug === idOrSlug);
}

export function getSeller(id: string): Seller | undefined {
  return SELLERS.find((s) => s.id === id);
}

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "shipped"
  | "delivered"
  | "completed"
  | "cancelled"
  | "disputed";

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending_payment: "Menunggu Pembayaran",
  paid: "Dibayar",
  shipped: "Dikirim",
  delivered: "Sampai Tujuan",
  completed: "Selesai",
  cancelled: "Dibatalkan",
  disputed: "Sengketa",
};

export type TrackingEvent = {
  timestamp: string;
  location: string;
  description: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  status: OrderStatus;
  itemPrice: number;
  shippingCost: number;
  adminFee: number;
  insuranceFee: number;
  total: number;
  courier: string;
  service: string;
  trackingNumber?: string;
  shippingAddress: {
    recipient: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postal: string;
  };
  createdAt: string;
  paidAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  completedAt?: string;
  paymentMethod?: string;
  tracking?: TrackingEvent[];
};

export const ORDERS: Order[] = [
  {
    id: "o1",
    orderNumber: "ORD-20260424-0001",
    listingId: "l1",
    buyerId: "me",
    sellerId: "u1",
    status: "shipped",
    itemPrice: 22000000,
    shippingCost: 150000,
    adminFee: 220000,
    insuranceFee: 44000,
    total: 22414000,
    courier: "JNE",
    service: "YES",
    trackingNumber: "JNE9283746592",
    shippingAddress: {
      recipient: "Ihsan Fajari",
      phone: "+628123456789",
      address: "Jl. Kemang Raya No. 42, RT 5 RW 3",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postal: "12730",
    },
    createdAt: "2026-04-22 14:32",
    paidAt: "2026-04-22 14:55",
    shippedAt: "2026-04-23 09:15",
    paymentMethod: "BCA Virtual Account",
    tracking: [
      { timestamp: "2026-04-22 14:55", location: "Sistem", description: "Pembayaran diterima, pesanan diteruskan ke penjual" },
      { timestamp: "2026-04-23 09:15", location: "Jakarta Selatan", description: "Paket dijemput kurir JNE YES" },
      { timestamp: "2026-04-23 14:20", location: "JNE Sorting Center Jakarta", description: "Paket tiba di hub penyortiran" },
      { timestamp: "2026-04-24 06:40", location: "JNE Jakarta Selatan", description: "Paket dalam perjalanan ke alamat tujuan" },
    ],
  },
  {
    id: "o2",
    orderNumber: "ORD-20260420-0007",
    listingId: "l3",
    buyerId: "u4",
    sellerId: "me",
    status: "paid",
    itemPrice: 9800000,
    shippingCost: 120000,
    adminFee: 98000,
    insuranceFee: 0,
    total: 10018000,
    courier: "SiCepat",
    service: "BEST",
    shippingAddress: {
      recipient: "Dimas Wicaksono",
      phone: "+6285612345678",
      address: "Jl. Rungkut Industri III No. 15",
      city: "Surabaya",
      province: "Jawa Timur",
      postal: "60293",
    },
    createdAt: "2026-04-23 20:11",
    paidAt: "2026-04-23 20:34",
    paymentMethod: "GoPay",
  },
  {
    id: "o3",
    orderNumber: "ORD-20260418-0012",
    listingId: "l7",
    buyerId: "u2",
    sellerId: "me",
    status: "completed",
    itemPrice: 3200000,
    shippingCost: 45000,
    adminFee: 32000,
    insuranceFee: 0,
    total: 3277000,
    courier: "JNT",
    service: "REG",
    trackingNumber: "JNT81726354",
    shippingAddress: {
      recipient: "Rama Putra",
      phone: "+6281234567890",
      address: "Jl. Dago Pakar Utama No. 8",
      city: "Bandung",
      province: "Jawa Barat",
      postal: "40198",
    },
    createdAt: "2026-04-15 10:02",
    paidAt: "2026-04-15 10:30",
    shippedAt: "2026-04-16 08:00",
    deliveredAt: "2026-04-17 14:22",
    completedAt: "2026-04-18 09:15",
    paymentMethod: "QRIS",
  },
  {
    id: "o4",
    orderNumber: "ORD-20260424-0045",
    listingId: "l5",
    buyerId: "u1",
    sellerId: "me",
    status: "pending_payment",
    itemPrice: 4800000,
    shippingCost: 85000,
    adminFee: 48000,
    insuranceFee: 0,
    total: 4933000,
    courier: "JNE",
    service: "REG",
    shippingAddress: {
      recipient: "Budi Santoso",
      phone: "+628123456789",
      address: "Jl. Kemang Raya No. 42",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postal: "12730",
    },
    createdAt: "2026-04-24 11:45",
  },
];

export function getOrder(id: string): Order | undefined {
  return ORDERS.find((o) => o.id === id);
}

/* ── Chat mock ── */
export type ChatThread = {
  id: string;
  listingId: string;
  otherUserId: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
};

export type ChatMessage = {
  id: string;
  threadId: string;
  senderId: string;
  body: string;
  time: string;
  flagged?: boolean;
};

export const CHAT_THREADS: ChatThread[] = [
  { id: "t1", listingId: "l1", otherUserId: "u1", lastMessage: "Siap kak, saya proses pengiriman besok pagi ya", lastTime: "10:32", unread: 0 },
  { id: "t2", listingId: "l4", otherUserId: "u5", lastMessage: "Nego 30jt gimana kak? Udah include ongkir", lastTime: "Kemarin", unread: 2 },
  { id: "t3", listingId: "l3", otherUserId: "u3", lastMessage: "Oke mantap bro, thanks infonya", lastTime: "2h", unread: 0 },
  { id: "t4", listingId: "l6", otherUserId: "u1", lastMessage: "Boleh COD di SCBD kak? Hari Sabtu.", lastTime: "3h", unread: 1 },
];

export const CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  t1: [
    { id: "m1", threadId: "t1", senderId: "me", body: "Halo kak, sepeda Trek Domane nya masih ada?", time: "10:15" },
    { id: "m2", threadId: "t1", senderId: "u1", body: "Masih ada kak, monggo silakan kalau tertarik", time: "10:18" },
    { id: "m3", threadId: "t1", senderId: "me", body: "Bisa nego ke 21jt kak? Saya serius mau ambil", time: "10:22" },
    { id: "m4", threadId: "t1", senderId: "u1", body: "21.5jt deh kak, udah dipasang pedal 105 sama bidon cage 2 biji", time: "10:25" },
    { id: "m5", threadId: "t1", senderId: "me", body: "Deal kak. Saya bayar lewat rekber ya biar aman", time: "10:28" },
    { id: "m6", threadId: "t1", senderId: "u1", body: "Siap kak, saya proses pengiriman besok pagi ya", time: "10:32" },
  ],
  t2: [
    { id: "m10", threadId: "t2", senderId: "me", body: "Brompton-nya garansi berapa lama kak?", time: "Kemarin 14:00" },
    { id: "m11", threadId: "t2", senderId: "u5", body: "Garansi frame dari toko 2 tahun kak, masih aktif sampai 2027", time: "Kemarin 14:12" },
    { id: "m12", threadId: "t2", senderId: "u5", body: "Nego 30jt gimana kak? Udah include ongkir", time: "Kemarin 16:45" },
  ],
};
