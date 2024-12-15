"use client";

import React, { useState } from "react";
import { BibleNavigation as TBibleNavigation, BibleVerse, BibleData } from "@/types/types_bible";
import { BibleNavigation } from "@/components/bible-navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { InterlinearVerse } from "@/components/interlinear-verse";
import { FontSizeToggle } from "@/components/font-size-toggle";
import bibleDataRaw from "@/data/bible-data.json";

const bibleData: BibleData = bibleDataRaw as BibleData;

const getVerseData = (nav: TBibleNavigation): BibleVerse | null => {
  try {
    const testamentData = bibleData[nav.testament];
    if (!testamentData) return null;

    const bookData = testamentData[nav.book];
    if (!bookData) return null;

    const chapterData = bookData[nav.chapter];
    if (!chapterData) return null;

    const verseData = chapterData[nav.verse];
    return verseData || null;
  } catch {
    console.error("Verse not found:", nav);
    return null;
  }
};

export default function InterlinearBible() {
  const [navigation, setNavigation] = useState<TBibleNavigation>({
    testament: "AT",
    book: "GEN",
    chapter: "1",
    verse: "1",
  });

  const [currentVerse, setCurrentVerse] = useState<BibleVerse | null>(
    getVerseData(navigation)
  );

  const [fontSize, setFontSize] = useState<string>("normal");

  const handleNavigationChange = (nav: Partial<TBibleNavigation>) => {
    let newNavigation = { ...navigation, ...nav };

    if (nav.testament && nav.testament !== navigation.testament) {
      newNavigation = {
        testament: nav.testament,
        book: nav.testament === "AT" ? "GEN" : "MAT",
        chapter: "1",
        verse: "1",
      };
    } else if (nav.book && nav.book !== navigation.book) {
      newNavigation = {
        ...newNavigation,
        chapter: "1",
        verse: "1",
      };
    } else if (nav.chapter && nav.chapter !== navigation.chapter) {
      newNavigation = {
        ...newNavigation,
        verse: "1",
      };
    }

    const testamentData = bibleData[newNavigation.testament];
    const bookData = testamentData ? testamentData[newNavigation.book] : null;
    const chapterData = bookData ? bookData[newNavigation.chapter] : null;

    if (!chapterData) {
      newNavigation.chapter = "1";
      newNavigation.verse = "1";
    }

    setNavigation(newNavigation);
    setCurrentVerse(getVerseData(newNavigation));
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">Biblia Interlineal</h1>
          <div className="flex space-x-4 items-center">
            <ThemeToggle />
            <FontSizeToggle currentFontSize={fontSize} onFontSizeChange={setFontSize} />
          </div>
        </div>

        <BibleNavigation currentNavigation={navigation} onNavigationChange={handleNavigationChange} />

        <div className="mt-8">
          {currentVerse ? (
            <InterlinearVerse
              verse={currentVerse}
              fontSize={fontSize}
              testament={navigation.testament}
            />
          ) : (
            <p className="text-center text-muted-foreground">Versículo no encontrado</p>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
