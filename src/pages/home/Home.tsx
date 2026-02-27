import Hero               from '../../components/hero/Hero';
import CharacterCarousel  from '../../components/character-carousel/CharacterCarousel';
import ProductGrid        from '../../components/product-grid/ProductGrid';
import './Home.css';

const Home = () => (
  <div className="home">
    <Hero />
    <CharacterCarousel />
    <ProductGrid />
  </div>
);

export default Home;
