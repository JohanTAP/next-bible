"use client";

import React from "react";
import { BibleVerse } from "@/types/types_bible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface InterlinearVerseProps
{
  verse: BibleVerse;
  fontSize: string;
  testament: "AT" | "NT";
}

export function InterlinearVerse ( {
  verse,
  fontSize,
  testament,
}: InterlinearVerseProps )
{
  const fontSizeClass =
    fontSize === "small"
      ? "text-sm"
      : fontSize === "large"
        ? "text-xl"
        : "text-base";

  const language = testament === "AT" ? "hebrew" : "greek";

  return (
    <div className="space-y-6">
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>{ verse.reference }</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={ `${ fontSizeClass }` }>{ verse.translation }</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            { verse.words.map( ( word ) => (
              <div key={ word.id } className="text-center space-y-1 min-w-[100px]">
                <div className={ `text-2xl font-hebrew text-primary` }>
                  { word.original }
                </div>

                <Link
                  href={ `/strong/${ language }-${ word.strong }` }
                  className="text-xs text-muted-foreground hover:text-primary no-underline transition-transform transform hover:scale-105"
                >
                  { word.strong }
                </Link>

                <div className="text-sm text-muted-foreground">{ word.grammar }</div>

                <div
                  className={ `text-sm ${ fontSizeClass } text-secondary-foreground` }
                >
                  { word.translation }
                </div>
              </div>
            ) ) }
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
