"use client"

import { useState } from 'react'
import { bibleService } from '@/services/bibleService'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Book } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getBookName, formatReference } from '@/constants/bible'

export default function BibliaPage() {
  const [selectedBook, setSelectedBook] = useState<string>('')
  const [selectedChapter, setSelectedChapter] = useState<string>('')
  
  const books = bibleService.getBooks()
  const chapters = selectedBook ? bibleService.getChapters(selectedBook) : []
  const verses = selectedBook && selectedChapter 
    ? bibleService.getVerses(selectedBook, selectedChapter)
    : []

  const handleNextChapter = () => {
    const currentChapterIndex = chapters.indexOf(selectedChapter)
    if (currentChapterIndex < chapters.length - 1) {
      setSelectedChapter(chapters[currentChapterIndex + 1])
    } else {
      const currentBookIndex = books.indexOf(selectedBook)
      if (currentBookIndex < books.length - 1) {
        const nextBook = books[currentBookIndex + 1]
        setSelectedBook(nextBook)
        const nextBookChapters = bibleService.getChapters(nextBook)
        setSelectedChapter(nextBookChapters[0])
      }
    }
  }

  const handlePreviousChapter = () => {
    const currentChapterIndex = chapters.indexOf(selectedChapter)
    if (currentChapterIndex > 0) {
      setSelectedChapter(chapters[currentChapterIndex - 1])
    } else {
      const currentBookIndex = books.indexOf(selectedBook)
      if (currentBookIndex > 0) {
        const previousBook = books[currentBookIndex - 1]
        setSelectedBook(previousBook)
        const previousBookChapters = bibleService.getChapters(previousBook)
        setSelectedChapter(previousBookChapters[previousBookChapters.length - 1])
      }
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Book className="h-4 w-4" />
              {selectedBook && selectedChapter 
                ? formatReference(selectedBook, selectedChapter)
                : 'Seleccionar libro y capítulo'}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Seleccionar Libro y Capítulo</SheetTitle>
            </SheetHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Libros</h3>
                <div className="h-[60vh] overflow-y-auto space-y-1">
                  {books.map((book) => (
                    <Button
                      key={book}
                      variant={selectedBook === book ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        setSelectedBook(book)
                        setSelectedChapter('')
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
                  <div className="grid grid-cols-4 gap-2">
                    {chapters.map((chapter) => (
                      <Button
                        key={chapter}
                        variant={selectedChapter === chapter ? "default" : "outline"}
                        onClick={() => setSelectedChapter(chapter)}
                      >
                        {chapter.replace(`${selectedBook}`, '')}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

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
        <div className="space-y-4">
          {verses.map((verse) => (
            <div 
              key={verse.reference}
              className="group hover:bg-muted p-2 rounded-md transition-colors"
            >
              <p className="text-lg">
                <span className="text-sm font-medium text-muted-foreground mr-3">
                  {verse.reference.split(':')[1]}
                </span>
                {verse.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 