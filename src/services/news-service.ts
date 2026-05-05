import { ref, get, push, set, update, remove } from 'firebase/database';

import { db } from '../firebase/firebase-config';
import type { NewsItem, NewsItemPayload } from '../types/news';

const NEWS_ITEMS_PATH = 'news-items';

const mapSnapshotToNewsItems = (
    value: Record<string, Omit<NewsItem, 'id'>>
): NewsItem[] =>
    Object.entries(value)
        .map(([id, data]) => ({ id, ...data } as NewsItem))
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

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
