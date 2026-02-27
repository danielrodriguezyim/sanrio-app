export interface Character {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  accentColor: string; /* hex — used for per-card theming */
  category: CharacterCategory;
}

export type CharacterCategory =
  | 'classic'
  | 'friends'
  | 'seasonal'
  | 'collaboration';
