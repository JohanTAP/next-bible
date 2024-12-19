"use client"

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BibleNavigation } from './navigation/BibleNavigation';
import type { BibleNavigation as BibleNavigationType } from '@/types/bible';

interface BibleReferencesProps {
    references: {
        referencia: string;
        texto: string;
    }[];
}

export function BibleReferences({ references }: BibleReferencesProps) {
    const [selectedReference, setSelectedReference] = React.useState<BibleNavigationType>({
        testament: 'AT',
        book: '',
        chapter: '',
        verse: ''
    });

    const parseReference = (reference: string) => {
        // Ejemplo: "Génesis 1:1" -> { testament: 'AT', book: 'GEN', chapter: '1', verse: '1' }
        const bookMap: { [key: string]: { testament: 'AT' | 'NT', code: string } } = {
            'Génesis': { testament: 'AT', code: 'GEN' },
            'Éxodo': { testament: 'AT', code: 'EXO' },
            // ... agregar más mapeos
        };

        const parts = reference.split(' ');
        const bookName = parts[0];
        const [chapter, verse] = parts[1].split(':');
        const book = bookMap[bookName];

        return {
            testament: book?.testament || 'AT',
            book: book?.code || '',
            chapter,
            verse
        };
    };

    const handleReferenceClick = (reference: string) => {
        const parsed = parseReference(reference);
        setSelectedReference(parsed);
    };

    return (
        <div className="space-y-6">
            <BibleNavigation
                currentNavigation={selectedReference}
                onNavigationChange={(nav) => setSelectedReference(prev => ({ ...prev, ...nav }))}
            />
            
            <div className="grid gap-4">
                {references.map((ref, index) => (
                    <Card 
                        key={index} 
                        className="hover:bg-accent/50 transition-colors cursor-pointer"
                        onClick={() => handleReferenceClick(ref.referencia)}
                    >
                        <CardHeader>
                            <CardTitle className="text-lg text-primary">{ref.referencia}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-card-foreground">{ref.texto}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
} 