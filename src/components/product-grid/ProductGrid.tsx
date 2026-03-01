import { useState } from 'react';

import CategoryFilter from '../category-filter/CategoryFilter';
import ProductCard from '../product-card/ProductCard';
import useProducts from '../../hooks/use-products';
import type { ProductCategory } from '../../types/product';
import './ProductGrid.css';

const ProductGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');

  const { products, isLoading, hasError } = useProducts(selectedCategory);

  const renderContent = () => {
    if (isLoading) return <ProductGridSkeleton />;
    if (hasError) return <ProductGridError />;
    if (products.length === 0) return <ProductGridEmpty />;

    return (
      <ul className="product-grid__list">
        {products.map(product => (
          <li key={product.id} className="animate-fade-in">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="product-grid section" aria-label="Product catalogue">
      <div className="container">
        <h2 className="section-title">Our Collection</h2>
        <p className="section-subtitle">
          From stationery to plush — find your favourite character on everything.
        </p>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {renderContent()}
      </div>
    </section>
  );
};

const ProductGridSkeleton = () => (
  <ul className="product-grid__list" aria-label="Loading products">
    {Array.from({ length: 8 }).map((_, i) => (
      <li key={i} className="product-grid__skeleton" aria-hidden="true">
        <div className="product-grid__skeleton-img" />
        <div className="product-grid__skeleton-body">
          <div className="product-grid__skeleton-line product-grid__skeleton-line--title" />
          <div className="product-grid__skeleton-line" />
          <div className="product-grid__skeleton-line product-grid__skeleton-line--short" />
        </div>
      </li>
    ))}
  </ul>
);

const ProductGridError = () => (
  <div className="product-grid__message" role="alert">
    <span className="product-grid__message-icon" aria-hidden="true">⚠️</span>
    <p>Something went wrong loading products. Please try again later.</p>
  </div>
);

const ProductGridEmpty = () => (
  <div className="product-grid__message">
    <span className="product-grid__message-icon" aria-hidden="true">🔍</span>
    <p>No products found in this category yet. Check back soon!</p>
  </div>
);

export default ProductGrid;
