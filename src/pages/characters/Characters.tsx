import { useState, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiPlus, FiX, FiEdit2, FiRotateCcw } from 'react-icons/fi';

import CharacterCard from '../../components/character-card/CharacterCard';
import useCharacters, { type CharacterPayload } from '../../hooks/use-characters';
import type { Character, CharacterCategory } from '../../types/character';
import './Characters.css';

const CATEGORY_FILTERS: { value: CharacterCategory | 'all'; label: string }[] = [
  { value: 'all',           label: 'All'           },
  { value: 'classic',       label: 'Classic'       },
  { value: 'friends',       label: 'Friends'       },
  { value: 'seasonal',      label: 'Seasonal'      },
  { value: 'collaboration', label: 'Collaboration' },
];

const CHARACTER_CATEGORIES: CharacterCategory[] = [
  'classic', 'friends', 'seasonal', 'collaboration',
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants: Variants = {
  hidden:   { opacity: 0, y: 16 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

type ModalMode = { type: 'create' } | { type: 'edit'; character: Character };

interface CharacterModalProps {
  mode:     ModalMode;
  onClose:  () => void;
  onCreate: (payload: CharacterPayload) => void;
  onEdit:   (id: string, payload: CharacterPayload) => void;
}

const CharacterModal = ({ mode, onClose, onCreate, onEdit }: CharacterModalProps) => {
  const isEdit   = mode.type === 'edit';
  const defaults = isEdit ? mode.character : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CharacterPayload>({ defaultValues: defaults });

  const onSubmit = (data: CharacterPayload) => {
    if (isEdit) {
      onEdit(mode.character.id, data);
    } else {
      onCreate(data);
    }
    onClose();
  };

  return (
    <div
      className="char-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="char-modal-title"
    >
      <div className="char-modal">
        <div className="char-modal__header">
          <h3 id="char-modal-title" className="char-modal__title">
            {isEdit
              ? <><FiEdit2 size={18} aria-hidden="true" /> Edit Character</>
              : <><FiPlus  size={18} aria-hidden="true" /> New Character</>
            }
          </h3>
          <button className="char-modal__close" onClick={onClose} aria-label="Close">
            <FiX size={20} />
          </button>
        </div>

        <form className="char-modal__form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-field">
            <label htmlFor="cm-name">Name *</label>
            <input
              id="cm-name"
              {...register('name', { required: 'Required' })}
              placeholder="Hello Kitty"
            />
            {errors.name && <span className="form-error">{errors.name.message}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="cm-description">Description *</label>
            <textarea
              id="cm-description"
              rows={3}
              {...register('description', { required: 'Required' })}
              placeholder="A cheerful character who loves…"
            />
            {errors.description && <span className="form-error">{errors.description.message}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="cm-imageUrl">Image URL *</label>
            <input
              id="cm-imageUrl"
              {...register('imageUrl', { required: 'Required' })}
              placeholder="/images/characters/hello-kitty.png"
            />
            {errors.imageUrl && <span className="form-error">{errors.imageUrl.message}</span>}
          </div>

          <div className="char-modal__row">
            <div className="form-field">
              <label htmlFor="cm-category">Category *</label>
              <select id="cm-category" {...register('category', { required: 'Required' })}>
                <option value="">Select…</option>
                {CHARACTER_CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.category && <span className="form-error">{errors.category.message}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="cm-accentColor">Accent Colour *</label>
              <div className="char-modal__color-wrap">
                <input
                  id="cm-accentColor"
                  type="color"
                  className="char-modal__color-picker"
                  {...register('accentColor', { required: 'Required' })}
                />
                <input
                  className="char-modal__color-text"
                  {...register('accentColor')}
                  placeholder="#f472b6"
                />
              </div>
              {errors.accentColor && <span className="form-error">{errors.accentColor.message}</span>}
            </div>
          </div>

          <div className="char-modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
              {isEdit ? 'Save Changes' : 'Add Character'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const Characters = () => {
  const { characters, create, edit, remove, reset } = useCharacters();

  const [searchQuery,    setSearchQuery]    = useState('');
  const [activeCategory, setActiveCategory] = useState<CharacterCategory | 'all'>('all');
  const [modalMode,      setModalMode]      = useState<ModalMode | null>(null);

  const openCreate = () => setModalMode({ type: 'create' });
  const openEdit   = (character: Character) => setModalMode({ type: 'edit', character });
  const closeModal = () => setModalMode(null);

  const handleReset = () => {
    if (window.confirm('Reset all characters to the original defaults? This cannot be undone.')) {
      reset();
    }
  };

  const filteredCharacters = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return characters.filter(character => {
      const matchesSearch   = !query || character.name.toLowerCase().includes(query);
      const matchesCategory = activeCategory === 'all' || character.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [characters, searchQuery, activeCategory]);

  const hasResults = filteredCharacters.length > 0;

  return (
    <div className="characters">

      <section className="characters__hero">
        <div className="container characters__hero-inner">
          <motion.h1
            className="characters__hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            All Characters
          </motion.h1>
          <motion.p
            className="characters__hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Every friend in the Sanrio universe — explore, filter, and find your favourite. ✦
          </motion.p>
        </div>

        <div className="characters__hero-shapes" aria-hidden="true">
          <span>★</span><span>♡</span><span>✿</span><span>✦</span>
        </div>
      </section>

      <section className="characters__controls section--sm">
        <div className="container">
          <div className="characters__controls-row">
            <div className="characters__search-wrap">
              <span className="characters__search-icon" aria-hidden="true">🔍</span>
              <input
                type="search"
                className="characters__search"
                placeholder="Search characters…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search characters by name"
              />
            </div>

            <div className="characters__crud-actions">
              <button
                className="btn btn--ghost btn--sm characters__reset-btn"
                onClick={handleReset}
                title="Reset to defaults"
                aria-label="Reset characters to defaults"
              >
                <FiRotateCcw size={14} aria-hidden="true" />
                Reset
              </button>
              <button
                className="btn btn--primary btn--sm"
                onClick={openCreate}
              >
                <FiPlus size={15} aria-hidden="true" />
                Add Character
              </button>
            </div>
          </div>

          <div className="characters__category-pills" role="group" aria-label="Filter by category">
            {CATEGORY_FILTERS.map(({ value, label }) => (
              <button
                key={value}
                className={`characters__pill${activeCategory === value ? ' characters__pill--active' : ''}`}
                onClick={() => setActiveCategory(value)}
                aria-pressed={activeCategory === value}
              >
                {label}
              </button>
            ))}
          </div>

          <p className="characters__count" aria-live="polite">
            {filteredCharacters.length} character{filteredCharacters.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      <section className="characters__grid-section section--sm">
        <div className="container">
          {hasResults ? (
            <motion.ul
              className="characters__grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={`${searchQuery}-${activeCategory}`}
            >
              {filteredCharacters.map(character => (
                <motion.li key={character.id} variants={cardVariants}>
                  <CharacterCard
                    character={character}
                    isLarge
                    onEdit={openEdit}
                    onDelete={remove}
                  />
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <div className="characters__empty">
              <span aria-hidden="true">🌸</span>
              <p>No characters found for "<strong>{searchQuery}</strong>".</p>
            </div>
          )}
        </div>
      </section>

      {modalMode && (
        <CharacterModal
          mode={modalMode}
          onClose={closeModal}
          onCreate={create}
          onEdit={edit}
        />
      )}
    </div>
  );
};

export default Characters;
