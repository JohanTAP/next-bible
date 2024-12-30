import { bibleBooks } from './bible-books';

export function formatBibleReference(reference: string): string {
  try {
    // Log para depuración
    console.log('Referencia original:', reference);

    // Extraer el libro y la referencia numérica
    const [book, ref] = reference.trim().split(/\s+/);
    
    console.log('Libro:', book, 'Referencia:', ref);
    console.log('Libro en minúsculas:', book.toLowerCase());
    console.log('Traducción encontrada:', bibleBooks[book.toLowerCase()]);

    // Obtener el nombre traducido del libro
    const translatedBook = bibleBooks[book.toLowerCase()];
    if (!translatedBook) {
      console.log('No se encontró traducción para:', book);
      return reference;
    }

    const formattedReference = `${translatedBook} ${ref}`;
    console.log('Referencia formateada:', formattedReference);
    
    return formattedReference;
  } catch (error) {
    console.error('Error formatting bible reference:', error);
    return reference;
  }
}
