"use client"

import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        if (currentNavigation.testament) {
            setBooks(Object.keys(bibleData[currentNavigation.testament]));
        }
    }, [currentNavigation.testament]);

    useEffect(() => {
        if (currentNavigation.book && currentNavigation.testament) {
            const testamentData = bibleData[currentNavigation.testament];
            if (testamentData?.[currentNavigation.book]) {
                setChapters(Object.keys(testamentData[currentNavigation.book]));
            } else {
                setChapters([]);
            }
        }
    }, [currentNavigation.book, currentNavigation.testament]);

    useEffect(() => {
        if (currentNavigation.chapter && currentNavigation.book && currentNavigation.testament) {
            const testamentData = bibleData[currentNavigation.testament];
            if (testamentData?.[currentNavigation.book]?.[currentNavigation.chapter]) {
                setVerses(Object.keys(testamentData[currentNavigation.book][currentNavigation.chapter]));
            } else {
                setVerses([]);
            }
        }
    }, [currentNavigation.chapter, currentNavigation.book, currentNavigation.testament]);

    return (
        <Card className="bg-card">
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <TestamentSelect
                        value={currentNavigation.testament}
                        onChange={(value) => onNavigationChange({ testament: value })}
                    />
                    <BookSelect
                        value={currentNavigation.book}
                        books={books}
                        onChange={(value) => onNavigationChange({ book: value })}
                    />
                    <ChapterVerseSelect
                        type="chapter"
                        value={currentNavigation.chapter}
                        options={chapters}
                        onChange={(value) => onNavigationChange({ chapter: value })}
                    />
                    <ChapterVerseSelect
                        type="verse"
                        value={currentNavigation.verse}
                        options={verses}
                        onChange={(value) => onNavigationChange({ verse: value })}
                    />
                </div>
            </CardContent>
        </Card>
    );
} 