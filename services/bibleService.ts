import bibleData from '@/data/spavbl.json';

type BibleData = {
  at: {
    [book: string]: {
      [chapter: string]: {
        [verseRef: string]: string
      }
    }
  },
  nt: {
    [book: string]: {
      [chapter: string]: {
        [verseRef: string]: string
      }
    }
  }
};

const typedBibleData = bibleData as BibleData;

export type BibleVerse = {
  reference: string;
  text: string;
};

export type BibleChapter = {
  [key: string]: string;
};

export type BibleBook = {
  [key: string]: BibleChapter;
};

export const bibleService = {
  getBooks() {
    return [
      ...Object.keys(typedBibleData.at),
      ...Object.keys(typedBibleData.nt)
    ];
  },

  getChapters(book: string) {
    const testament = typedBibleData.at[book] ? 'at' : 'nt';
    return Object.keys(typedBibleData[testament][book] || {});
  },

  getVerses(book: string, chapter: string): BibleVerse[] {
    const testament = typedBibleData.at[book] ? 'at' : 'nt';
    const verses = typedBibleData[testament][book]?.[chapter] || {};
    return Object.entries(verses).map(([reference, text]) => ({
      reference,
      text: text || ''
    }));
  },

  getVerse(book: string, chapter: string, verse: string): string {
    const testament = typedBibleData.at[book] ? 'at' : 'nt';
    return typedBibleData[testament][book]?.[chapter]?.[`${chapter}:${verse}`] || '';
  }
};
