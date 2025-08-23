export type Language = 'auslan' | 'asl';

export const LANGUAGE_LABEL: Record<Language, string> = {
  auslan: 'Auslan',
  asl: 'ASL',
};

export const DEFAULT_LANGUAGE: Language = 'auslan';

export function parseLanguage(v: string | null | undefined): Language | null {
  if (v === 'auslan' || v === 'asl') return v;
  return null;
}

// // Example: plug into your classifier/model loader
// export function getLabelSet(lang: Language) {
//   return lang === 'auslan'
//     ? ['Hello', 'Thank you', 'Yes', 'No', 'Help']
//     : ['A','B','C','Hello','Thanks'];
// }
