export type Testament = 'AT' | 'NT';

export interface BibleNavigation {
    testament: Testament;
    book: string;
    chapter: string;
    verse: string;
}

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

export interface BibleChapter {
    [verse: string]: BibleVerse;
}

export interface BibleBook {
    [chapter: string]: BibleChapter;
}

export interface BibleData {
    AT: {
        [book: string]: BibleBook;
    };
    NT: {
        [book: string]: BibleBook;
    };
}

export interface BibleBookNames {
    [key: string]: string;
} 