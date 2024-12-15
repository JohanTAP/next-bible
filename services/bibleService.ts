export const bibleService = {
  // Función para obtener versículos
  getVerses: async (book: string, chapter: number) => {
    try {
      // Aquí implementaremos la lógica para obtener versículos
      return [];
    } catch (error) {
      console.error('Error fetching verses:', error);
      throw error;
    }
  },

  // Función para buscar en Strong
  searchStrong: async (strongNumber: string) => {
    try {
      // Aquí implementaremos la búsqueda en Strong
      return null;
    } catch (error) {
      console.error('Error searching Strong:', error);
      throw error;
    }
  }
};
