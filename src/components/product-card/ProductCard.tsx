import type { Product } from '../../types/product';
import './ProductCard.css';

/* ----------------------------------------------------------------
   IMAGE SPEC — product card thumbnails:
   Files : hosted URLs stored directly in Firestore (imageUrl field)
           OR public/images/products/{product.id}.jpg for local assets
   Size  : 400 × 400 px, square crop, JPEG quality 85
   Displayed at 100% width of card (max ~280 px on desktop grid)
   Use placehold.co URLs in Firestore seed data during development:
     https://placehold.co/400x400/fce7f3/db2777?text=Product+Name
   ---------------------------------------------------------------- */

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, description, imageUrl, price, isNew, isFeatured } = product;

  return (
    <article className="product-card card">
      <div className="product-card__image-wrap">
        <img
          src={imageUrl}
          alt={name}
          className="product-card__image"
          width={400}
          height={400}
          loading="lazy"
        />

        {/* Badges — only render what applies */}
        <div className="product-card__badges">
          {isNew      && <span className="badge product-card__badge product-card__badge--new">New</span>}
          {isFeatured && <span className="badge product-card__badge product-card__badge--featured">★ Featured</span>}
        </div>
      </div>

      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__description">{description}</p>

        <div className="product-card__footer">
          <span className="product-card__price">{formatPrice(price)}</span>
          <button className="btn btn--primary btn--sm product-card__cta" aria-label={`Add ${name} to cart`}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
