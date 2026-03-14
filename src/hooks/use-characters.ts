import { useState, useEffect } from 'react';

import defaultCharacters from '../data/characters.json';
import type { Character } from '../types/character';

const STORAGE_KEY = 'sanrio-characters';

const loadFromStorage = (): Character[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Character[];
  } catch {
    console.warn('[useCharacters] Failed to load from storage, using defaults.');
  }
  return defaultCharacters as Character[];
};

const saveToStorage = (characters: Character[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
};

const slugify = (name: string): string =>
  name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') +
  '-' + Date.now().toString(36);

export type CharacterPayload = Omit<Character, 'id'>;

interface UseCharactersResult {
  characters: Character[];
  create: (payload: CharacterPayload) => void;
  edit:   (id: string, payload: CharacterPayload) => void;
  remove: (id: string) => void;
  reset:  () => void;
}

const useCharacters = (): UseCharactersResult => {
  const [characters, setCharacters] = useState<Character[]>(() =>
    loadFromStorage()
  );

  useEffect(() => {
    saveToStorage(characters);
  }, [characters]);

  const create = (payload: CharacterPayload) => {
    const newCharacter: Character = { id: slugify(payload.name), ...payload };
    setCharacters(prev => [...prev, newCharacter]);
  };

  const edit = (id: string, payload: CharacterPayload) => {
    setCharacters(prev =>
      prev.map(c => (c.id === id ? { id, ...payload } : c))
    );
  };

  const remove = (id: string) => {
    setCharacters(prev => prev.filter(c => c.id !== id));
  };

  const reset = () => {
    const defaults = defaultCharacters as Character[];
    saveToStorage(defaults);
    setCharacters(defaults);
  };

  return { characters, create, edit, remove, reset };
};

export default useCharacters;
