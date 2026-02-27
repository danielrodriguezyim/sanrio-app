import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { NavLink }              from 'react-router-dom';

import CharacterCard   from '../character-card/CharacterCard';
import charactersData  from '../../data/characters.json';
import type { Character } from '../../types/character';
import { ROUTES }      from '../../router/routes';
import './CharacterCarousel.css';

const characters = charactersData as Character[];

const CharacterCarousel = () => (
  <section className="character-carousel section" aria-label="Featured characters">
    <div className="container">

      <div className="character-carousel__header">
        <div>
          <h2 className="section-title">Meet the Characters</h2>
          <p className="section-subtitle">
            Over 400 friends, each with their own story. Here are a few favourites.
          </p>
        </div>
        <NavLink
          to={ROUTES.CHARACTERS}
          className="btn btn--ghost btn--sm character-carousel__see-all"
        >
          See all →
        </NavLink>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        breakpoints={{
          560:  { slidesPerView: 2 },
          900:  { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
        className="character-carousel__swiper"
      >
        {characters.map(character => (
          <SwiperSlide key={character.id} className="character-carousel__slide">
            <CharacterCard character={character} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default CharacterCarousel;
