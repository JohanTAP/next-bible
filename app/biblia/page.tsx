"use client";

import { useState, useEffect } from "react";
import { bibleService } from "@/services/bibleService";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Book,
  Highlighter,
} from "lucide-react";
import {
  FontSizeToggle,
  FontSizeProvider,
  useFontSize,
} from "@/components/font-size-toggle";
import {
  VerseDisplayProvider,
  VerseDisplayControls,
  useVerseDisplay,
} from "@/components/verse-display-settings";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getBookName, formatReference } from "@/constants/bible";
import { BibleSearch } from "@/components/bible-search";

type HighlightedVerses = {
  [key: string]: boolean;
};

function BibliaContent() {
  const [selectedBook, setSelectedBook] = useState<string>("gen");
  const [selectedChapter, setSelectedChapter] = useState<string>("gen1");
  const [highlightedVerses, setHighlightedVerses] = useState<HighlightedVerses>(
    {}
  );
  const { fontSize } = useFontSize();
  const { showVerseNumbers } = useVerseDisplay();
  const [searchResults, setSearchResults] = useState<typeof verses>([]);

  const loadHighlights = () => {
    try {
      const savedHighlights = localStorage.getItem("highlightedVerses");
      if (savedHighlights) {
        return JSON.parse(savedHighlights);
      }
    } catch (error) {
      console.error("Error loading highlights:", error);
    }
    return {};
  };

  const saveHighlights = (highlights: HighlightedVerses) => {
    try {
      localStorage.setItem("highlightedVerses", JSON.stringify(highlights));
    } catch (error) {
      console.error("Error saving highlights:", error);
    }
  };

  // Cargar resaltados al iniciar y cuando cambie el libro o capítulo
  useEffect(() => {
    const highlights = loadHighlights();
    setHighlightedVerses(highlights);
  }, [selectedBook, selectedChapter]);

  const getFullReference = (verseReference: string) => {
    const bookName = getBookName(selectedBook);
    const chapterNum = selectedChapter.replace(selectedBook, "");
    const verseNum = verseReference.split(":")[1];
    return `${bookName} ${chapterNum}:${verseNum}`;
  };

  const toggleHighlight = (verseReference: string) => {
    const fullReference = getFullReference(verseReference);
    const newHighlights = {
      ...highlightedVerses,
      [fullReference]: !highlightedVerses[fullReference],
    };
    setHighlightedVerses(newHighlights);
    saveHighlights(newHighlights);
  };

  const isVerseHighlighted = (verseReference: string) => {
    const fullReference = getFullReference(verseReference);
    return highlightedVerses[fullReference] || false;
  };

  const books = bibleService.getBooks();
  const chapters = selectedBook ? bibleService.getChapters(selectedBook) : [];
  const verses =
    selectedBook && selectedChapter
      ? bibleService.getVerses(selectedBook, selectedChapter)
      : [];

  console.log("Books:", books);
  console.log("Chapters:", chapters);
  console.log("Verses:", verses);

  const handleNextChapter = () => {
    const currentChapterIndex = chapters.indexOf(selectedChapter);
    if (currentChapterIndex < chapters.length - 1) {
      setSelectedChapter(chapters[currentChapterIndex + 1]);
    } else {
      const currentBookIndex = books.indexOf(selectedBook);
      if (currentBookIndex < books.length - 1) {
        const nextBook = books[currentBookIndex + 1];
        setSelectedBook(nextBook);
        const nextBookChapters = bibleService.getChapters(nextBook);
        setSelectedChapter(nextBookChapters[0]);
      }
    }
  };

  const handlePreviousChapter = () => {
    const currentChapterIndex = chapters.indexOf(selectedChapter);
    if (currentChapterIndex > 0) {
      setSelectedChapter(chapters[currentChapterIndex - 1]);
    } else {
      const currentBookIndex = books.indexOf(selectedBook);
      if (currentBookIndex > 0) {
        const previousBook = books[currentBookIndex - 1];
        setSelectedBook(previousBook);
        const previousBookChapters = bibleService.getChapters(previousBook);
        setSelectedChapter(
          previousBookChapters[previousBookChapters.length - 1]
        );
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6 no-select">
        <div className="flex gap-2 items-center flex-1">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Book className="h-4 w-4" />
                {selectedBook && selectedChapter
                  ? formatReference(selectedBook, selectedChapter)
                  : "Seleccionar libro y capítulo"}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Seleccionar Libro y Capítulo</SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Libros</h3>
                  <div className="h-[85vh] overflow-y-auto space-y-1">
                    {books.map((book) => (
                      <Button
                        key={book}
                        variant={selectedBook === book ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => {
                          setSelectedBook(book);
                          setSelectedChapter("");
                        }}
                      >
                        {getBookName(book)}
                      </Button>
                    ))}
                  </div>
                </div>
                {selectedBook && (
                  <div className="space-y-2">
                    <h3 className="font-semibold">Capítulos</h3>
                    <div className="h-[85vh] overflow-y-auto">
                      <div className="grid grid-cols-4 gap-2">
                        {chapters.map((chapter) => (
                          <Button
                            key={chapter}
                            variant={
                              selectedChapter === chapter
                                ? "default"
                                : "outline"
                            }
                            onClick={() => setSelectedChapter(chapter)}
                          >
                            {chapter.replace(`${selectedBook}`, "")}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <VerseDisplayControls />
          <FontSizeToggle />
          <BibleSearch
            onSearchResultsAction={setSearchResults}
            onReferenceChangeAction={(book, chapter) => {
              setSelectedBook(book);
              setSelectedChapter(chapter);
            }}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePreviousChapter}
            disabled={!selectedBook || !selectedChapter}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextChapter}
            disabled={!selectedBook || !selectedChapter}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6">
        {(searchResults.length > 0 ? searchResults : verses).map((verse) => (
          <div
            key={verse.reference}
            className={`group hover:bg-muted p-2 rounded-md transition-colors relative ${isVerseHighlighted(verse.reference)
              ? "bg-yellow-100 dark:bg-yellow-900/30"
              : ""
              }`}
          >
            <div className="flex items-start gap-2">
              <p
                className={`${fontSize === "small"
                  ? "text-base"
                  : fontSize === "large"
                    ? "text-xl"
                    : "text-lg"
                  } flex-grow select-text`}
              >
                {showVerseNumbers && (
                  <span className="text-sm font-medium text-muted-foreground mr-3 no-select">
                    {verse.reference.split(":")[1]}
                  </span>
                )}
                {verse.text}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity no-select"
                onClick={() => toggleHighlight(verse.reference)}
                title={
                  isVerseHighlighted(verse.reference)
                    ? "Quitar resaltado"
                    : "Resaltar versículo"
                }
              >
                <Highlighter
                  className={`h-4 w-4 ${isVerseHighlighted(verse.reference)
                    ? "text-yellow-500"
                    : "text-muted-foreground"
                    }`}
                />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BibliaPage() {
  return (
    <FontSizeProvider>
      <VerseDisplayProvider>
        <BibliaContent />
      </VerseDisplayProvider>
    </FontSizeProvider>
  );
}
