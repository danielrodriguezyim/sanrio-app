import type { Product } from '../../types/product';
import './ProductCard.css';

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

        <div className="product-card__badges">
          {isNew && <span className="badge product-card__badge product-card__badge--new">New</span>}
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
