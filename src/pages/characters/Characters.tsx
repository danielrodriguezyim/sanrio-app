import { useState, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';

import CharacterCard from '../../components/character-card/CharacterCard';
import charactersData from '../../data/characters.json';
import type { Character, CharacterCategory } from '../../types/character';
import './Characters.css';

const allCharacters = charactersData as Character[];

const CATEGORY_FILTERS: { value: CharacterCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'classic', label: 'Classic' },
  { value: 'friends', label: 'Friends' },
  { value: 'seasonal', label: 'Seasonal' },
  { value: 'collaboration', label: 'Collaboration' },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const Characters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CharacterCategory | 'all'>('all');

  const filteredCharacters = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return allCharacters.filter(character => {
      const matchesSearch = !query || character.name.toLowerCase().includes(query);
      const matchesCategory = activeCategory === 'all' || character.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

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
                  <CharacterCard character={character} isLarge />
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
    </div>
  );
};

export default Characters;
