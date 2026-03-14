import type { CSSProperties } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import type { Character } from '../../types/character';
import './CharacterCard.css';

interface CharacterCardProps {
  character: Character;
  isLarge?: boolean;
  onEdit?:   (character: Character) => void;
  onDelete?: (id: string) => void;
}

const CharacterCard = ({
  character,
  isLarge = false,
  onEdit,
  onDelete,
}: CharacterCardProps) => {
  const { id, name, description, imageUrl, accentColor, category } = character;

  const handleDelete = () => {
    if (!onDelete) return;
    if (window.confirm(`Remove "${name}" from the roster?`)) onDelete(id);
  };

  return (
    <article
      className={`character-card${isLarge ? ' character-card--large' : ''}`}
      style={{ '--accent': accentColor } as CSSProperties}
    >
      {(onEdit || onDelete) && (
        <div className="character-card__actions">
          {onEdit && (
            <button
              className="character-card__action-btn character-card__action-btn--edit"
              onClick={() => onEdit(character)}
              aria-label={`Edit ${name}`}
              title="Edit character"
            >
              <FiEdit2 size={13} />
            </button>
          )}
          {onDelete && (
            <button
              className="character-card__action-btn character-card__action-btn--delete"
              onClick={handleDelete}
              aria-label={`Delete ${name}`}
              title="Delete character"
            >
              <FiTrash2 size={13} />
            </button>
          )}
        </div>
      )}

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
