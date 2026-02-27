export const ROUTES = {
  HOME:       '/',
  CHARACTERS: '/characters',
  CONTACT:    '/contact',
  TOS:        '/terms-of-service',
  PRIVACY:    '/privacy-policy',
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];
