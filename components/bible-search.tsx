"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { bibleService } from "@/services/bibleService"
import { BibleVerse } from "@/services/bibleService"

interface BibleSearchProps
{
    onSearchResultsAction: ( results: BibleVerse[] ) => void
    onReferenceChangeAction: ( book: string, chapter: string ) => void
}

export function BibleSearch ( { onSearchResultsAction, onReferenceChangeAction }: BibleSearchProps )
{
    const handleSearch = ( query: string ) =>
    {
        const parsed = bibleService.parseReference( query );

        if ( !parsed ) return;

        const { book, chapter, range } = parsed;
        const fullChapter = `${ book }${ chapter }`;

        // Actualizar la referencia en el componente padre
        onReferenceChangeAction( book, fullChapter );

        if ( range )
        {
            const results = bibleService.getVerseRange( book, chapter, range );
            onSearchResultsAction( results );
        } else
        {
            onSearchResultsAction( [] );
        }
    };

    return (
        <div className="relative flex-1 max-w-sm">
            <Input
                type="text"
                placeholder="Buscar (ej: Marcos 10:46-52)"
                onChange={ ( e ) => handleSearch( e.target.value ) }
                className="pl-8"
            />
            <Search className="h-4 w-4 absolute left-2 top-3 text-muted-foreground" />
        </div>
    );
}
