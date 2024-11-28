"use client"

import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import type { BibleNavigation, BibleData } from "@/types/types_bible";
import bibleDataRaw from "@/data/bible-data.json";

const bibleData: BibleData = bibleDataRaw as BibleData;

interface BibleNavigationProps
{
  onNavigationChange: ( nav: Partial<BibleNavigation> ) => void;
  currentNavigation: BibleNavigation;
}

export function BibleNavigation ( { onNavigationChange, currentNavigation }: BibleNavigationProps )
{
  const [ books, setBooks ] = useState<string[]>( [] );
  const [ chapters, setChapters ] = useState<string[]>( [] );
  const [ verses, setVerses ] = useState<string[]>( [] );

  useEffect( () =>
  {
    if ( currentNavigation.testament === 'AT' )
    {
      setBooks( Object.keys( bibleData.AT ) );
    } else if ( currentNavigation.testament === 'NT' )
    {
      setBooks( Object.keys( bibleData.NT ) );
    }
  }, [ currentNavigation.testament ] );

  useEffect( () =>
  {
    if ( currentNavigation.book )
    {
      const testamentData = bibleData[ currentNavigation.testament ];
      if ( testamentData && testamentData[ currentNavigation.book ] )
      {
        setChapters( Object.keys( testamentData[ currentNavigation.book ] ) );
      } else
      {
        setChapters( [] );
      }
    }
  }, [ currentNavigation.book, currentNavigation.testament ] );

  useEffect( () =>
  {
    if ( currentNavigation.chapter )
    {
      const testamentData = bibleData[ currentNavigation.testament ];
      if (
        testamentData &&
        testamentData[ currentNavigation.book ] &&
        testamentData[ currentNavigation.book ][ currentNavigation.chapter ]
      )
      {
        setVerses( Object.keys( testamentData[ currentNavigation.book ][ currentNavigation.chapter ] ) );
      } else
      {
        setVerses( [] );
      }
    }
  }, [ currentNavigation.chapter, currentNavigation.book, currentNavigation.testament ] );

  return (
    <Card className="bg-card">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Testamento</label>
            <Select
              value={ currentNavigation.testament }
              onValueChange={ ( value ) => onNavigationChange( { testament: value as 'AT' | 'NT' } ) }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar testamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AT">Antiguo testamento</SelectItem>
                <SelectItem value="NT">Nuevo testamento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Libro</label>
            <Select
              value={ currentNavigation.book }
              onValueChange={ ( value ) => onNavigationChange( { book: value } ) }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar libro" />
              </SelectTrigger>
              <SelectContent>
                { books.map( ( book ) => (
                  <SelectItem key={ book } value={ book }>
                    { book === 'GEN' ? 'Génesis' : book === 'EXO' ? 'Éxodo' : book === 'JHN' ? 'Juan' : book }
                  </SelectItem>
                ) ) }
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Capítulo</label>
            <Select
              value={ currentNavigation.chapter }
              onValueChange={ ( value ) => onNavigationChange( { chapter: value } ) }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar capítulo" />
              </SelectTrigger>
              <SelectContent>
                { chapters.map( ( chapter ) => (
                  <SelectItem key={ chapter } value={ chapter }>
                    { chapter }
                  </SelectItem>
                ) ) }
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Versículo</label>
            <Select
              value={ currentNavigation.verse }
              onValueChange={ ( value ) => onNavigationChange( { verse: value } ) }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar versículo" />
              </SelectTrigger>
              <SelectContent>
                { verses.map( ( verse ) => (
                  <SelectItem key={ verse } value={ verse }>
                    { verse }
                  </SelectItem>
                ) ) }
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
