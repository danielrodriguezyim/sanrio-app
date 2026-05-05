import { ref, get, push, set, remove } from 'firebase/database';

import { db } from '../firebase/firebase-config';
import type { Product } from '../types/product';

const PRODUCTS_PATH = 'products';

export type ProductPayload = Omit<Product, 'id'>;

const mapSnapshotToProducts = (
    value: Record<string, Omit<Product, 'id'>>
): Product[] =>
    Object.entries(value).map(([id, data]) => ({ id, ...data } as Product));

export const fetchProducts = async (): Promise<Product[]> => {
    const snapshot = await get(ref(db, PRODUCTS_PATH));
    if (!snapshot.exists()) return [];
    return mapSnapshotToProducts(snapshot.val());
};

export const createProduct = async (payload: ProductPayload): Promise<Product> => {
    const newRef = push(ref(db, PRODUCTS_PATH));
    await set(newRef, payload);
    return { id: newRef.key as string, ...payload };
};

export const deleteProduct = async (id: string): Promise<void> => {
    await remove(ref(db, `${PRODUCTS_PATH}/${id}`));
};
