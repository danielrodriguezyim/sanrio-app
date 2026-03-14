export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  pubDate: string; /* ISO 8601 */
}

export type NewsItemPayload = Omit<NewsItem, 'id' | 'pubDate'>;
