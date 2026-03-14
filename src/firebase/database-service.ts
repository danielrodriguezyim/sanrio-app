import { ref, get, push, set, update, remove } from 'firebase/database';

import { db } from './firebase-config';
import type { Product } from '../types/product';
import type { NewsItem, NewsItemPayload } from '../types/news';

const PRODUCTS_PATH = 'products';
const CONTACT_MESSAGES_PATH = 'contact-messages';
const NEWS_ITEMS_PATH = 'news-items';

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

const mapSnapshotToProducts = (
  value: Record<string, Omit<Product, 'id'>>
): Product[] =>
  Object.entries(value).map(([id, data]) => ({ id, ...data } as Product));

const mapSnapshotToNewsItems = (
  value: Record<string, Omit<NewsItem, 'id'>>
): NewsItem[] =>
  Object.entries(value)
    .map(([id, data]) => ({ id, ...data } as NewsItem))
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

/* ─── Products ────────────────────────────────────────────────────────────── */

export const fetchProducts = async (): Promise<Product[]> => {
  const snapshot = await get(ref(db, PRODUCTS_PATH));
  if (!snapshot.exists()) return [];
  return mapSnapshotToProducts(snapshot.val());
};

export type ProductPayload = Omit<Product, 'id'>;

export const createProduct = async (payload: ProductPayload): Promise<Product> => {
  const newRef = push(ref(db, PRODUCTS_PATH));
  await set(newRef, payload);
  return { id: newRef.key as string, ...payload };
};

export const deleteProduct = async (id: string): Promise<void> => {
  await remove(ref(db, `${PRODUCTS_PATH}/${id}`));
};

/* ─── Contact ─────────────────────────────────────────────────────────────── */

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const saveContactMessage = async (
  payload: ContactMessagePayload
): Promise<void> => {
  const newRef = push(ref(db, CONTACT_MESSAGES_PATH));
  await set(newRef, {
    ...payload,
    createdAt: new Date().toISOString(),
  });
};

/* ─── News / RSS ──────────────────────────────────────────────────────────── */

export const fetchNewsItems = async (): Promise<NewsItem[]> => {
  const snapshot = await get(ref(db, NEWS_ITEMS_PATH));
  if (!snapshot.exists()) return [];
  return mapSnapshotToNewsItems(snapshot.val());
};

export const createNewsItem = async (payload: NewsItemPayload): Promise<NewsItem> => {
  const newRef = push(ref(db, NEWS_ITEMS_PATH));
  const item: Omit<NewsItem, 'id'> = {
    ...payload,
    pubDate: new Date().toISOString(),
  };
  await set(newRef, item);
  return { id: newRef.key as string, ...item };
};

export const updateNewsItem = async (
  id: string,
  payload: NewsItemPayload
): Promise<NewsItem> => {
  const itemRef = ref(db, `${NEWS_ITEMS_PATH}/${id}`);
  await update(itemRef, payload);
  const snapshot = await get(itemRef);
  return { id, ...snapshot.val() } as NewsItem;
};

export const deleteNewsItem = async (id: string): Promise<void> => {
  await remove(ref(db, `${NEWS_ITEMS_PATH}/${id}`));
};
