/**
 * Async wrapper around mock data — mirrors shape of future real API.
 * Swap implementations to fetch() when backend is ready; callers stay unchanged.
 */
import {
  CATEGORIES,
  CHAT_MESSAGES,
  CHAT_THREADS,
  LISTINGS,
  ORDERS,
  SELLERS,
  getListing as _getListing,
  getOrder as _getOrder,
  getSeller as _getSeller,
  type ChatMessage,
  type ChatThread,
  type Listing,
  type Order,
  type Seller,
} from "./data";

const LATENCY_MS = 0;

const wait = <T>(value: T): Promise<T> =>
  LATENCY_MS > 0 ? new Promise((r) => setTimeout(() => r(value), LATENCY_MS)) : Promise.resolve(value);

/* ── Listings ── */
export const listListings = (params?: { category?: string; sort?: "hot" | "latest" | "featured" }): Promise<Listing[]> => {
  let result = [...LISTINGS];
  if (params?.category) result = result.filter((l) => l.category === params.category);
  if (params?.sort === "hot") result.sort((a, b) => b.views - a.views);
  if (params?.sort === "latest") result.reverse();
  return wait(result);
};

export const getListing = (idOrSlug: string): Promise<Listing | undefined> => wait(_getListing(idOrSlug));

/* ── Sellers ── */
export const getSeller = (id: string): Promise<Seller | undefined> => wait(_getSeller(id));
export const listSellers = (): Promise<Seller[]> => wait(SELLERS);

/* ── Orders ── */
export const listOrders = (filter?: { role?: "buyer" | "seller"; status?: Order["status"] }): Promise<Order[]> => {
  let result = [...ORDERS];
  if (filter?.role === "buyer") result = result.filter((o) => o.buyerId === "me");
  if (filter?.role === "seller") result = result.filter((o) => o.sellerId === "me");
  if (filter?.status) result = result.filter((o) => o.status === filter.status);
  return wait(result);
};

export const getOrder = (id: string): Promise<Order | undefined> => wait(_getOrder(id));

/* ── Chat ── */
export const listChatThreads = (): Promise<ChatThread[]> => wait(CHAT_THREADS);
export const getChatMessages = (threadId: string): Promise<ChatMessage[]> => wait(CHAT_MESSAGES[threadId] ?? []);

/* ── Categories ── */
export const listCategories = () => wait(CATEGORIES);

/* ── Re-exports for synchronous server-component use ── */
export { CATEGORIES, LISTINGS, ORDERS, SELLERS, CONDITION_LABEL, ORDER_STATUS_LABEL } from "./data";
export type { Category, Condition, Listing, Order, OrderStatus, Seller, ChatThread, ChatMessage, TrackingEvent } from "./data";
