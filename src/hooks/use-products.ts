import { useState, useEffect, useMemo } from 'react';

import { fetchProducts }        from '../firebase/database-service';
import type { Product }         from '../types/product';
import type { ProductCategory } from '../types/product';

interface UseProductsResult {
  products:  Product[];
  isLoading: boolean;
  hasError:  boolean;
}

const useProducts = (category: ProductCategory): UseProductsResult => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading,   setIsLoading]   = useState(true);
  const [hasError,    setHasError]    = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const loadProducts = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const data = await fetchProducts();
        if (!isCancelled) setAllProducts(data);
      } catch (err) {
        console.error('[useProducts] Failed to fetch products:', err);
        if (!isCancelled) setHasError(true);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    loadProducts();

    return () => { isCancelled = true; };
  }, []);

  /* Category filtering is client-side — no DB query needed per filter */
  const products = useMemo(
    () =>
      category === 'all'
        ? allProducts
        : allProducts.filter(p => p.category === category),
    [allProducts, category]
  );

  return { products, isLoading, hasError };
};

export default useProducts;
