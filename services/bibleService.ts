import { BIBLE_BOOKS } from "@/constants/bible";
import bibleData from "@/data/spavbl.json";

type BibleData = {
  at: {
    [book: string]: {
      [chapter: string]: {
        [verseRef: string]: string;
      };
    };
  };
  nt: {
    [book: string]: {
      [chapter: string]: {
        [verseRef: string]: string;
      };
    };
  };
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
      ...Object.keys(typedBibleData.nt),
    ];
  },

  getChapters(book: string) {
    const testament = typedBibleData.at[book] ? "at" : "nt";
    return Object.keys(typedBibleData[testament][book] || {});
  },

  getVerses(book: string, chapter: string): BibleVerse[] {
    const testament = typedBibleData.at[book] ? "at" : "nt";
    const verses = typedBibleData[testament][book]?.[chapter] || {};
    return Object.entries(verses).map(([reference, text]) => ({
      reference,
      text: text || "",
    }));
  },

  getVerse(book: string, chapter: string, verse: string): string {
    const testament = typedBibleData.at[book] ? "at" : "nt";
    return (
      typedBibleData[testament][book]?.[chapter]?.[`${chapter}:${verse}`] || ""
    );
  },

  getVerseRange(book: string, chapter: string, range: string): BibleVerse[] {
    const testament = typedBibleData.at[book] ? "at" : "nt";
    const fullChapter = `${book}${chapter}`;
    const verses = typedBibleData[testament][book]?.[fullChapter] || {};

    if (!range.includes("-")) {
      const verse = verses[`${fullChapter}:${range}`];
      return verse
        ? [{ reference: `${fullChapter}:${range}`, text: verse }]
        : [];
    }

    const [start, end] = range.split("-").map(Number);
    return Object.entries(verses)
      .filter(([ref]) => {
        const verseNum = parseInt(ref.split(":")[1]);
        return verseNum >= start && verseNum <= end;
      })
      .map(([reference, text]) => ({
        reference,
        text: text || "",
      }));
  },

  parseReference(
    reference: string
  ): { book: string; chapter: string; range: string } | null {
    /**
     * Elimina las tildes de un texto para hacer comparaciones más flexibles.
     */
    const removeAccents = (str: string) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    // Crear un mapa de nombres de libros sin tildes
    const bookNamesMap = Object.entries(BIBLE_BOOKS).reduce<{
      [key: string]: string;
    }>((acc, [code, name]) => {
      acc[removeAccents(name.toLowerCase())] = code; // Mapear nombres sin tildes a códigos
      return acc;
    }, {});

    // Expresión regular para capturar "Libro Capítulo:Versículo-Rango"
    const match = reference.match(
      /^([\wáéíóúñ\s]+)\s+(\d+)(?::(\d+(?:-\d+)?))?$/i
    );

    if (!match) {
      console.log("Error al interpretar la referencia:", reference);
      return null;
    }

    let [_, bookName, chapter, range] = match;
    bookName = removeAccents(bookName.toLowerCase().trim()); // Eliminar tildes para la comparación

    // Buscar en `BIBLE_BOOKS` directamente (códigos) o en `bookNamesMap` (nombres sin tildes)
    const bookCode = BIBLE_BOOKS[bookName as keyof typeof BIBLE_BOOKS]
      ? bookName
      : bookNamesMap[bookName];

    if (!bookCode) {
      console.log("Libro no encontrado en `BIBLE_BOOKS`:", bookName);
      return null;
    }

    console.log(
      `Referencia interpretada -> Libro: ${bookCode}, Capítulo: ${chapter}, Rango: ${range || ""
      }`
    );

    return {
      book: bookCode,
      chapter, // Mantener el número del capítulo sin modificar
      range: range || "", // Removemos los dos puntos iniciales si existen
    };
  },
};
