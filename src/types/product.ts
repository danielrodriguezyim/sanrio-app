export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: ProductCategory;
  isFeatured: boolean;
  isNew: boolean;
  tags: string[];
  createdAt: string; /* ISO 8601 */
}

export type ProductCategory =
  | 'all'
  | 'stationery'
  | 'plush'
  | 'accessories'
  | 'apparel'
  | 'home';
