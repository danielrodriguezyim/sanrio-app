import type { CSSProperties } from 'react';

import type { Character } from '../../types/character';
import './CharacterCard.css';

interface CharacterCardProps {
  character: Character;
  isLarge?: boolean;
}

const CharacterCard = ({ character, isLarge = false }: CharacterCardProps) => {
  const { name, description, imageUrl, accentColor, category } = character;

  return (
    <article
      className={`character-card${isLarge ? ' character-card--large' : ''}`}
      style={{ '--accent': accentColor } as CSSProperties}
    >
      <div className="character-card__image-wrap">
        <img
          src={imageUrl}
          alt={name}
          className="character-card__image"
          width={isLarge ? 200 : 160}
          height={isLarge ? 200 : 160}
          loading="lazy"
        />
      </div>

      <div className="character-card__body">
        <span className="badge character-card__category">{category}</span>
        <h3 className="character-card__name">{name}</h3>
        <p className="character-card__description">{description}</p>
      </div>

      <div className="character-card__blob" aria-hidden="true" />
    </article>
  );
};

export default CharacterCard;
