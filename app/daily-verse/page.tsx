"use client"

import { useEffect, useState } from 'react'
import verseData from '@/data/spavbl.json'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getBookName } from '@/constants/bible';

export default function DailyVersePage ()
{
  const [ verse, setVerse ] = useState<{ text: string, reference: string } | null>( null )
  const [ debug, setDebug ] = useState<string>( "" )

  useEffect( () =>
  {
    const getRandomVerse = () =>
    {
      try
      {
        // Get available testament data
        const testaments = verseData as { at: any, nt: any }
        if ( !testaments.at && !testaments.nt )
        {
          setDebug( "Error: Invalid Bible data structure" )
          return null
        }

        // Get all books from both testaments
        const atBooks = Object.keys( testaments.at || {} )
        const ntBooks = Object.keys( testaments.nt || {} )
        const allBooks = [ ...atBooks, ...ntBooks ]

        if ( allBooks.length === 0 )
        {
          setDebug( "Error: No books found in the Bible data" )
          return null
        }

        const today = new Date()
        const startOfYear = new Date( today.getFullYear(), 0, 0 )
        const dayOfYear = Math.floor( ( today.getTime() - startOfYear.getTime() ) / 86400000 )

        // Select a book
        const bookIndex = dayOfYear % allBooks.length
        const selectedBook = allBooks[ bookIndex ]
        const testament = atBooks.includes( selectedBook ) ? 'at' : 'nt'

        // Get all chapters for the selected book
        const bookData = testaments[ testament ][ selectedBook ]
        const chapters = Object.keys( bookData )

        if ( chapters.length === 0 )
        {
          setDebug( `Error: No chapters found for book ${ selectedBook }` )
          return null
        }

        // Select a chapter
        const chapterIndex = Math.floor( ( dayOfYear * 7 ) % chapters.length )
        const selectedChapter = chapters[ chapterIndex ]

        // Get the verses from the chapter
        const chapterData = bookData[ selectedChapter ]

        if ( !chapterData || typeof chapterData !== 'object' )
        {
          setDebug( `Error: Invalid chapter data for ${ selectedBook } ${ selectedChapter }` )
          return null
        }

        // Get a verse from the chapter
        const verseKeys = Object.keys( chapterData )
        if ( verseKeys.length === 0 )
        {
          setDebug( `Error: No verses found in ${ selectedBook } ${ selectedChapter }` )
          return null
        }

        const verseIndex = Math.floor( ( dayOfYear * 13 ) % verseKeys.length )
        const selectedVerse = verseKeys[ verseIndex ]
        const verseText = chapterData[ selectedVerse ]

        if ( !verseText || typeof verseText !== 'string' )
        {
          setDebug( `Error: Invalid verse text for ${ selectedBook } ${ selectedChapter }:${ selectedVerse }` )
          return null
        }

        const bookName = getBookName( selectedBook );

        // Extraer número del capítulo sin depender de 'zep'
        const chapterNumber = selectedChapter.replace( selectedBook, '' );

        // Extraer número del versículo
        const verseNumber = selectedVerse.split( ':' )[ 1 ] || '1'; // Si no se encuentra ":", asumir versículo 1

        const formattedReference = `${ bookName } ${ chapterNumber }:${ verseNumber }`;

        setDebug( "" )  // Clear debug if successful
        return {
          text: verseText,
          reference: formattedReference
        }
      } catch ( error )
      {
        console.error( 'Error getting verse:', error );
        setDebug( `Error: ${ ( error as Error ).message }` );
        return null;
      }
    }

    const result = getRandomVerse()
    if ( result )
    {
      setVerse( result )
    }
  }, [] )

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Versículo del Día</h1>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{ verse?.reference || 'Cargando...' }</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">{ verse?.text || 'Cargando versículo...' }</p>
          { debug && <p className="text-sm text-red-500 mt-2">{ debug }</p> }
        </CardContent>
      </Card>
    </div>
  )
}
