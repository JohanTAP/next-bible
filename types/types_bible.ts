export interface BibleWord {
  id: string;
  original: string;
  translation: string;
  grammar: string;
  strong: string;
  position: number;
}

export interface BibleVerse {
  reference: string;
  translation: string;
  words: BibleWord[];
}

export interface BibleNavigation {
  testament: 'AT' | 'NT';
  book: string;
  chapter: string;
  verse: string;
}

export interface BibleBook {
  [chapterNumber: string]: {
    [verseNumber: string]: BibleVerse;
  };
}

export interface BibleData {
  AT: {
    [bookName: string]: BibleBook;
  };
  NT: {
    [bookName: string]: BibleBook;
  };
}
