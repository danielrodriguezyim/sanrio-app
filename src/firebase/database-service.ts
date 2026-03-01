import { ref, get, push, set } from 'firebase/database';

import { db } from './firebase-config';
import type { Product } from '../types/product';

const PRODUCTS_PATH = 'products';
const CONTACT_MESSAGES_PATH = 'contact-messages';

const mapSnapshotToProducts = (
  value: Record<string, Omit<Product, 'id'>>
): Product[] =>
  Object.entries(value).map(([id, data]) => ({ id, ...data } as Product));

export const fetchProducts = async (): Promise<Product[]> => {
  const snapshot = await get(ref(db, PRODUCTS_PATH));

  if (!snapshot.exists()) return [];

  return mapSnapshotToProducts(snapshot.val());
};


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
