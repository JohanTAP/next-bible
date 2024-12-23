import { useState, useCallback } from 'react';
import { bibleService } from '@/services/bibleService';

export const useBible = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getVerses = useCallback(async (book: string, chapter: number) => {
    try {
      setLoading(true);
      setError(null);
      return await bibleService.getVerses(book, `${book}${chapter}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getVerses
  };
};
