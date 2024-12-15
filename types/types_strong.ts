export interface StrongEntry {
  strongNumber: string;
  originalWord: string;
  pronunciation: string;
  audio: string;
  partOfSpeech: string;
  derivation: string;
  definition: string;
  extendedDefinition: string;
  RVDefinition: string;
  wordFrequencyRV: Record<string, number>;
}

export type StrongData = Record<string, StrongEntry>;
