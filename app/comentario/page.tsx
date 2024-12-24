'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import comentariosData from '@/data/cba.json';

interface Comentario {
    id: number;
    libro: string;
    capitulo: number;
    versiculo: string;
    frase: string;
    comentario: string;
    autor: string;
}

interface ComentarioAgrupado {
    libro: string;
    capitulo: number;
    versiculo: string;
    autor: string;
    comentarios: { frase: string; comentario: string; }[];
}

export default function ComentarioBiblico() {
    const [libroSeleccionado, setLibroSeleccionado] = useState<string>('Génesis');

    // Obtener lista única de libros de los comentarios
    const libros = Array.from(new Set(comentariosData.map(c => c.libro)));

    // Agrupar comentarios por libro, capítulo y versículo
    const agruparComentarios = (comentarios: Comentario[]): ComentarioAgrupado[] => {
        const grupos = comentarios.reduce((acc, curr) => {
            const key = `${curr.libro}-${curr.capitulo}-${curr.versiculo}`;
            if (!acc[key]) {
                acc[key] = {
                    libro: curr.libro,
                    capitulo: curr.capitulo,
                    versiculo: curr.versiculo,
                    autor: curr.autor,
                    comentarios: []
                };
            }
            acc[key].comentarios.push({
                frase: curr.frase,
                comentario: curr.comentario
            });
            return acc;
        }, {} as Record<string, ComentarioAgrupado>);

        return Object.values(grupos);
    };

    const comentariosFiltrados = agruparComentarios(comentariosData.filter(c => c.libro === libroSeleccionado));

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <h1 className="text-3xl font-bold text-center mb-8 text-primary">
                Comentario Bíblico Adventista
            </h1>

            <div className="mb-6 w-[250px]">
                <Select value={libroSeleccionado} onValueChange={setLibroSeleccionado}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona un libro" />
                    </SelectTrigger>
                    <SelectContent>
                        {libros.map((lib) => (
                            <SelectItem key={lib} value={lib}>
                                {lib}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <ScrollArea className="h-[calc(100vh-250px)]">
                <div className="space-y-6">
                    {comentariosFiltrados.map((grupo, index) => (
                        <Card key={index} className="mb-4">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-primary">
                                        {grupo.libro} {grupo.capitulo}:{grupo.versiculo}
                                    </h2>
                                    <span className="text-sm text-primary/80">
                                        {grupo.autor}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {grupo.comentarios.map((comentario, idx) => (
                                    <div key={idx} className="mb-4 last:mb-0">
                                        <p className="text-sm italic text-primary/70 mb-2">
                                            "{comentario.frase}"
                                        </p>
                                        <p className="text-pretty" dangerouslySetInnerHTML={{ __html: comentario.comentario }}>
                                        </p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
