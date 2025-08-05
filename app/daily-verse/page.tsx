"use client"

import { useEffect, useState } from 'react'
import verseData from '@/data/spavbl.json'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getBookName } from '@/constants/bible';

export default function DailyVersePage() {
  const [verse, setVerse] = useState<{ text: string, reference: string } | null>(null);
  const [debug, setDebug] = useState<string>("");

  useEffect(() => {
    const getDailyVerse = () => {
      try {
        // Obtener los datos de la Biblia
        const testaments = verseData as { at: any, nt: any };
        if (!testaments.at && !testaments.nt) {
          setDebug("Error: Estructura de datos de la Biblia no válida");
          return null;
        }

        // Obtener todos los versículos en un array ordenado
        const allVerses: { book: string; chapter: string; verse: string; text: string }[] = [];

        Object.entries(testaments).forEach(([testament, books]) => {
          Object.entries(books as Record<string, unknown>).forEach(([book, chapters]) => {
            Object.entries(chapters as Record<string, unknown>).forEach(([chapter, verses]) => {
              Object.entries(verses as Record<string, unknown>).forEach(([verse, text]) => {
                allVerses.push({ book, chapter, verse, text: text as string });
              });
            });
          });
        });

        // Verificar que haya versículos disponibles
        if (allVerses.length === 0) {
          setDebug("Error: No se encontraron versículos en los datos.");
          return null;
        }

        // Obtener el día del año
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 0);
        const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / 86400000);

        // Seleccionar un versículo diferente cada día del año
        const verseIndex = dayOfYear % allVerses.length;
        const selectedVerse = allVerses[verseIndex];

        // Obtener el nombre del libro
        const bookName = getBookName(selectedVerse.book);

        // Extraer capítulo y versículo
        const chapterNumber = selectedVerse.chapter.replace(selectedVerse.book, '');
        const verseNumber = selectedVerse.verse.split(':')[1] || '1';

        // Formatear referencia
        const formattedReference = `${bookName} ${chapterNumber}:${verseNumber}`;

        setDebug(""); // Limpiar mensajes de error si la selección fue exitosa
        return {
          text: selectedVerse.text,
          reference: formattedReference,
        };
      } catch (error) {
        console.error("Error al obtener el versículo:", error);
        setDebug(`Error: ${(error as Error).message}`);
        return null;
      }
    };

    const result = getDailyVerse();
    if (result) {
      setVerse(result);
    }
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Versículo del Día</h1>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{verse?.reference || 'Cargando...'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">{verse?.text || 'Cargando versículo...'}</p>
          {debug && <p className="text-sm text-red-500 mt-2">{debug}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
