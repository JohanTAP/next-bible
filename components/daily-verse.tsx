"use client"

import { useEffect, useState } from "react";
import bibleData from "@/data/spavbl.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBookName } from "@/constants/bible";

type BibleData = {
  at: {
    [book: string]: {
      [chapterRef: string]: {
        [verseRef: string]: string
      }
    }
  },
  nt: {
    [book: string]: {
      [chapterRef: string]: {
        [verseRef: string]: string
      }
    }
  }
};

const typedBibleData = bibleData as BibleData;

function formatVerseReference(verseRef: string): string {
  // verseRef format: "gen1:1" -> extract book, chapter, verse
  const match = verseRef.match(/([a-z]+)(\d+):(\d+)/);
  if (!match) return verseRef;
  
  const [, book, chapter, verse] = match;
  const bookName = getBookName(book);
  return `${bookName} ${chapter}:${verse}`;
}

export function DailyVerse() {
  const [verse, setVerse] = useState<{ text: string; reference: string } | null>(null);

  useEffect(() => {
    const getRandomVerse = () => {
      // Get all verses from both testaments
      const allVerses: { text: string; reference: string }[] = [];
      
      ['at', 'nt'].forEach(testament => {
        Object.entries(typedBibleData[testament as keyof BibleData]).forEach(([book, chapters]) => {
          Object.entries(chapters).forEach(([chapterRef, verses]) => {
            Object.entries(verses).forEach(([verseRef, text]) => {
              allVerses.push({
                text,
                reference: verseRef
              });
            });
          });
        });
      });

      if (allVerses.length === 0) {
        console.error("Error: No verse data available.");
        return null;
      }

      const today = new Date();
      const dayOfYear = Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
      );
      
      const verseIndex = dayOfYear % allVerses.length;
      const selectedVerse = allVerses[verseIndex];
      
      return {
        text: selectedVerse.text,
        reference: formatVerseReference(selectedVerse.reference)
      };
    };

    const savedVerse = localStorage.getItem("dailyVerse");
    const today = new Date().toDateString();
    
    if (savedVerse) {
      const { verse: savedVerseData, date } = JSON.parse(savedVerse);
      if (date === today) {
        setVerse(savedVerseData);
        return;
      }
    }

    const newVerse = getRandomVerse();
    if (newVerse) {
      localStorage.setItem(
        "dailyVerse",
        JSON.stringify({ verse: newVerse, date: today })
      );
      setVerse(newVerse);
    }
  }, []);

  if (!verse) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Versículo del Día</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg">{verse.text}</p>
        <p className="text-sm text-muted-foreground text-right">{verse.reference}</p>
      </CardContent>
    </Card>
  );
}
