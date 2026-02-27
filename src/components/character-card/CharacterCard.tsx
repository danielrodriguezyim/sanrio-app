import type { CSSProperties } from 'react';

import type { Character } from '../../types/character';
import './CharacterCard.css';

/* ----------------------------------------------------------------
   IMAGE SPEC — character card portraits:
   Files : public/images/characters/{character.id}.png
   Size  : 400 × 400 px, transparent PNG (square canvas)
   The image is displayed at 160 × 160 px in the carousel and
   200 × 200 px on the full Characters page grid.
   Source at 400 px gives clean 2× retina rendering at both sizes.
   ---------------------------------------------------------------- */

interface CharacterCardProps {
  character:   Character;
  isLarge?:    boolean; /* true on the Characters page grid */
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

      {/* Decorative accent blob */}
      <div className="character-card__blob" aria-hidden="true" />
    </article>
  );
};

export default CharacterCard;
