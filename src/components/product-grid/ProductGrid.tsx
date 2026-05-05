import { useState } from 'react';
import { FiUpload, FiDownload, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

import CategoryFilter from '../category-filter/CategoryFilter';
import ProductCard from '../product-card/ProductCard';
import useProducts from '../../hooks/use-products';
import { createProduct } from '../../services/products-service';
import {
  exportProductsAsJson,
  exportProductsAsCsv,
  exportProductsAsXml,
  importProducts,
} from '../../utils/product-import-export';
import type { ProductCategory } from '../../types/product';
import './ProductGrid.css';

/* ─── Import / Export toolbar ─────────────────────────────────────────────── */

type ImportStatus = 'idle' | 'loading' | 'success' | 'error';

interface ImportExportToolbarProps {
  products: ReturnType<typeof useProducts>['products'];
  onImportDone: () => void;
}

const ImportExportToolbar = ({ products, onImportDone }: ImportExportToolbarProps) => {
  const [importStatus,  setImportStatus]  = useState<ImportStatus>('idle');
  const [importMessage, setImportMessage] = useState('');
  const [exportError,   setExportError]   = useState('');

  /* ── Import ── */
  const handleImport = async () => {
    setImportStatus('loading');
    setImportMessage('');
    try {
      const payloads = await importProducts();
      await Promise.all(payloads.map(p => createProduct(p)));
      setImportStatus('success');
      setImportMessage(`${payloads.length} product${payloads.length !== 1 ? 's' : ''} imported.`);
      onImportDone();
    } catch (err) {
      /* User cancelled the picker — suppress silently */
      if (err instanceof DOMException && err.name === 'AbortError') {
        setImportStatus('idle');
        return;
      }
      setImportStatus('error');
      setImportMessage(err instanceof Error ? err.message : 'Import failed.');
    }
  };

  /* ── Export ── */
  const handleExport = async (fn: () => Promise<void>) => {
    setExportError('');
    try {
      await fn();
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setExportError(err instanceof Error ? err.message : 'Export failed.');
    }
  };

  return (
    <div className="product-grid__toolbar">
      {/* Import */}
      <div className="product-grid__toolbar-group">
        <span className="product-grid__toolbar-label">Import</span>
        <button
          className="btn btn--ghost btn--sm product-grid__toolbar-btn"
          onClick={handleImport}
          disabled={importStatus === 'loading'}
          aria-busy={importStatus === 'loading'}
        >
          <FiUpload size={14} aria-hidden="true" />
          {importStatus === 'loading' ? 'Importing…' : 'Choose file'}
        </button>

        {importStatus !== 'idle' && importStatus !== 'loading' && (
          <span className={`product-grid__import-status product-grid__import-status--${importStatus}`}>
            {importStatus === 'success'
              ? <FiCheckCircle size={13} aria-hidden="true" />
              : <FiAlertCircle size={13} aria-hidden="true" />
            }
            {importMessage}
          </span>
        )}
      </div>

      {/* Export */}
      <div className="product-grid__toolbar-group">
        <span className="product-grid__toolbar-label">Export</span>
        <button
          className="btn btn--ghost btn--sm product-grid__toolbar-btn"
          onClick={() => handleExport(() => exportProductsAsJson(products))}
          disabled={products.length === 0}
          title="Export as JSON"
        >
          <FiDownload size={14} aria-hidden="true" />
          JSON
        </button>
        <button
          className="btn btn--ghost btn--sm product-grid__toolbar-btn"
          onClick={() => handleExport(() => exportProductsAsCsv(products))}
          disabled={products.length === 0}
          title="Export as CSV"
        >
          <FiDownload size={14} aria-hidden="true" />
          CSV
        </button>
        <button
          className="btn btn--ghost btn--sm product-grid__toolbar-btn"
          onClick={() => handleExport(() => exportProductsAsXml(products))}
          disabled={products.length === 0}
          title="Export as XML"
        >
          <FiDownload size={14} aria-hidden="true" />
          XML
        </button>

        {exportError && (
          <span className="product-grid__import-status product-grid__import-status--error">
            <FiAlertCircle size={13} aria-hidden="true" />
            {exportError}
          </span>
        )}
      </div>
    </div>
  );
};

/* ─── ProductGrid ─────────────────────────────────────────────────────────── */

const ProductGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [refreshKey,       setRefreshKey]       = useState(0);

  const { products, isLoading, hasError } = useProducts(selectedCategory);

  const handleImportDone = () => setRefreshKey(k => k + 1);

  const renderContent = () => {
    if (isLoading) return <ProductGridSkeleton />;
    if (hasError)  return <ProductGridError />;
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

        <ImportExportToolbar
          key={refreshKey}
          products={products}
          onImportDone={handleImportDone}
        />

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {renderContent()}
      </div>
    </section>
  );
};

/* ─── Sub-components ──────────────────────────────────────────────────────── */

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
