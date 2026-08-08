export const THEME_COOKIE = 'theme';
export const THEMES = ['light', 'dark', 'system'] as const;
export type Theme = (typeof THEMES)[number];

export function isTheme(value: string | undefined): value is Theme {
  return !!value && (THEMES as readonly string[]).includes(value);
}
