"use client"

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { BibleNavigation, BibleData, Testament } from "@/types/bible";
import bibleDataRaw from "@/data/bible-data.json";
import { TestamentSelect } from "./TestamentSelect";
import { BookSelect } from "./BookSelect";
import { ChapterVerseSelect } from "./ChapterVerseSelect";

const bibleData: BibleData = bibleDataRaw as BibleData;

interface BibleNavigationProps {
    onNavigationChange: (nav: Partial<BibleNavigation>) => void;
    currentNavigation: BibleNavigation;
}

export function BibleNavigation({ onNavigationChange, currentNavigation }: BibleNavigationProps) {
    const [books, setBooks] = useState<string[]>([]);
    const [chapters, setChapters] = useState<string[]>([]);
    const [verses, setVerses] = useState<string[]>([]);

    // Memoizar los callbacks de cambio
    const handleTestamentChange = useCallback((testament: Testament) => {
        onNavigationChange({ testament, book: '', chapter: '', verse: '' });
    }, [onNavigationChange]);

    const handleBookChange = useCallback((book: string) => {
        onNavigationChange({ book, chapter: '', verse: '' });
    }, [onNavigationChange]);

    const handleChapterChange = useCallback((chapter: string) => {
        onNavigationChange({ chapter, verse: '' });
    }, [onNavigationChange]);

    const handleVerseChange = useCallback((verse: string) => {
        onNavigationChange({ verse });
    }, [onNavigationChange]);

    // Memoizar la obtención de datos
    useEffect(() => {
        if (currentNavigation.testament) {
            const testamentBooks = Object.keys(bibleData[currentNavigation.testament]);
            setBooks(testamentBooks);
        } else {
            setBooks([]);
        }
    }, [currentNavigation.testament]);

    useEffect(() => {
        if (currentNavigation.book && currentNavigation.testament) {
            const testamentData = bibleData[currentNavigation.testament];
            const bookChapters = testamentData?.[currentNavigation.book]
                ? Object.keys(testamentData[currentNavigation.book])
                : [];
            setChapters(bookChapters);
        } else {
            setChapters([]);
        }
    }, [currentNavigation.book, currentNavigation.testament]);

    useEffect(() => {
        if (currentNavigation.chapter && currentNavigation.book && currentNavigation.testament) {
            const testamentData = bibleData[currentNavigation.testament];
            const chapterVerses = testamentData?.[currentNavigation.book]?.[currentNavigation.chapter]
                ? Object.keys(testamentData[currentNavigation.book][currentNavigation.chapter])
                : [];
            setVerses(chapterVerses);
        } else {
            setVerses([]);
        }
    }, [currentNavigation.chapter, currentNavigation.book, currentNavigation.testament]);

    // Memoizar el contenido del Card
    const navigationContent = useMemo(() => (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TestamentSelect
                value={currentNavigation.testament}
                onChange={handleTestamentChange}
            />
            <BookSelect
                value={currentNavigation.book}
                books={books}
                onChange={handleBookChange}
            />
            <ChapterVerseSelect
                type="chapter"
                value={currentNavigation.chapter}
                options={chapters}
                onChange={handleChapterChange}
            />
            <ChapterVerseSelect
                type="verse"
                value={currentNavigation.verse}
                options={verses}
                onChange={handleVerseChange}
            />
        </div>
    ), [
        currentNavigation.testament,
        currentNavigation.book,
        currentNavigation.chapter,
        currentNavigation.verse,
        books,
        chapters,
        verses,
        handleTestamentChange,
        handleBookChange,
        handleChapterChange,
        handleVerseChange
    ]);

    return (
        <Card className="bg-card">
            <CardContent className="p-6">
                {navigationContent}
            </CardContent>
        </Card>
    );
} 