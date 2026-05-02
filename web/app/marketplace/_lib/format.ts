export function formatRupiah(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

export function formatRupiahShort(n: number): string {
  if (n >= 1_000_000) return "Rp " + (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + "jt";
  if (n >= 1_000) return "Rp " + (n / 1_000).toFixed(0) + "rb";
  return "Rp " + n;
}
