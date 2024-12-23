export const BIBLE_BOOKS = {
  // Antiguo Testamento
  gen: 'Génesis',
  exo: 'Éxodo',
  lev: 'Levítico',
  num: 'Números',
  deu: 'Deuteronomio',
  jos: 'Josué',
  jdg: 'Jueces',
  rut: 'Rut',
  '1sa': '1 Samuel',
  '2sa': '2 Samuel',
  '1ki': '1 Reyes',
  '2ki': '2 Reyes',
  '1ch': '1 Crónicas',
  '2ch': '2 Crónicas',
  ezr: 'Esdras',
  neh: 'Nehemías',
  est: 'Ester',
  job: 'Job',
  psa: 'Salmos',
  pro: 'Proverbios',
  ecc: 'Eclesiastés',
  sng: 'Cantares',
  isa: 'Isaías',
  jer: 'Jeremías',
  lam: 'Lamentaciones',
  ezk: 'Ezequiel',
  dan: 'Daniel',
  hos: 'Oseas',
  jol: 'Joel',
  amo: 'Amós',
  oba: 'Abdías',
  jon: 'Jonás',
  mic: 'Miqueas',
  nam: 'Nahúm',
  hab: 'Habacuc',
  sof: 'Sofonías',
  hag: 'Hageo',
  zep: 'Zacarías',
  mal: 'Malaquías',

  // Nuevo Testamento
  mat: 'Mateo',
  mrk: 'Marcos',
  luk: 'Lucas',
  jhn: 'Juan',
  act: 'Hechos',
  rom: 'Romanos',
  '1co': '1 Corintios',
  '2co': '2 Corintios',
  gal: 'Gálatas',
  eph: 'Efesios',
  php: 'Filipenses',
  col: 'Colosenses',
  '1th': '1 Tesalonicenses',
  '2th': '2 Tesalonicenses',
  '1ti': '1 Timoteo',
  '2ti': '2 Timoteo',
  tit: 'Tito',
  phm: 'Filemón',
  heb: 'Hebreos',
  jas: 'Santiago',
  '1pe': '1 Pedro',
  '2pe': '2 Pedro',
  '1jn': '1 Juan',
  '2jn': '2 Juan',
  '3jn': '3 Juan',
  jud: 'Judas',
  rev: 'Apocalipsis'
} as const;

export const getBookName = (bookCode: string): string => {
  return BIBLE_BOOKS[bookCode.toLowerCase() as keyof typeof BIBLE_BOOKS] || bookCode;
};

export const formatReference = (book: string, chapter: string): string => {
  const bookName = getBookName(book);
  const chapterNumber = chapter.replace(`${book}`, '');
  return `${bookName} ${chapterNumber}`;
};

export const TESTAMENT = {
  OLD: 'Antiguo Testamento',
  NEW: 'Nuevo Testamento'
} as const;

export const BIBLE_VERSIONS = {
  RVR1960: 'Reina Valera 1960',
  NVI: 'Nueva Versión Internacional',
  // ... agregar más versiones según sea necesario
} as const;
