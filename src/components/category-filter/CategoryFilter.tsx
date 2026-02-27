import type { ProductCategory } from '../../types/product';
import './CategoryFilter.css';

interface CategoryOption {
  value: ProductCategory;
  label: string;
  emoji: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: 'all',         label: 'All',         emoji: '✦' },
  { value: 'stationery',  label: 'Stationery',  emoji: '✏️' },
  { value: 'plush',       label: 'Plush',       emoji: '🧸' },
  { value: 'accessories', label: 'Accessories', emoji: '💎' },
  { value: 'apparel',     label: 'Apparel',     emoji: '👗' },
  { value: 'home',        label: 'Home',        emoji: '🏠' },
];

interface CategoryFilterProps {
  selectedCategory:  ProductCategory;
  onCategoryChange:  (category: ProductCategory) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => (
  <div className="category-filter" role="group" aria-label="Filter products by category">
    {CATEGORY_OPTIONS.map(({ value, label, emoji }) => {
      const isSelected = selectedCategory === value;
      return (
        <button
          key={value}
          className={`category-filter__pill${isSelected ? ' category-filter__pill--active' : ''}`}
          onClick={() => onCategoryChange(value)}
          aria-pressed={isSelected}
        >
          <span aria-hidden="true">{emoji}</span>
          {label}
        </button>
      );
    })}
  </div>
);

export default CategoryFilter;
