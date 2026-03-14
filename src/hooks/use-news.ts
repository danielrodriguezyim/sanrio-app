import { useState, useEffect } from 'react';

import {
  fetchNewsItems,
  createNewsItem,
  updateNewsItem,
  deleteNewsItem,
} from '../firebase/database-service';
import type { NewsItem, NewsItemPayload } from '../types/news';

interface UseNewsResult {
  newsItems: NewsItem[];
  isLoading: boolean;
  hasError: boolean;
  create: (payload: NewsItemPayload) => Promise<void>;
  edit:   (id: string, payload: NewsItemPayload) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

const useNews = (): UseNewsResult => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const data = await fetchNewsItems();
        if (!isCancelled) setNewsItems(data);
      } catch (err) {
        console.error('[useNews] Failed to fetch news items:', err);
        if (!isCancelled) setHasError(true);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    load();
    return () => { isCancelled = true; };
  }, []);

  const create = async (payload: NewsItemPayload) => {
    const newItem = await createNewsItem(payload);
    setNewsItems(prev => [newItem, ...prev]);
  };

  const edit = async (id: string, payload: NewsItemPayload) => {
    const updated = await updateNewsItem(id, payload);
    setNewsItems(prev => prev.map(item => item.id === id ? updated : item));
  };

  const remove = async (id: string) => {
    await deleteNewsItem(id);
    setNewsItems(prev => prev.filter(item => item.id !== id));
  };

  return { newsItems, isLoading, hasError, create, edit, remove };
};

export default useNews;
