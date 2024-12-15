"use client";

import React from "react";
import { useParams } from "next/navigation";
import strongData from "@/data/strong-data.json";
import { StrongWord } from "@/components/strong-word";
import { StrongData } from "@/types/types_strong";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ThemeProvider } from "@/components/theme-provider";

export default function StrongPage() {
    const { strong } = useParams();
    const [language, strongNumber] = Array.isArray(strong)
        ? strong[0].split("-")
        : strong?.split("-") || ["", ""];

    const data =
        language && strongNumber
            ? (strongData as { [key: string]: StrongData })[language]?.[strongNumber]
            : null;

    if (!data) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl text-muted-foreground">
                    No se encontró información para este número de Strong.
                </p>
            </div>
        );
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ScrollArea className="h-screen">
                <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
                    <h1 className="text-4xl font-bold text-primary">
                        Strong ({language === "hebrew" ? "Hebreo" : "Griego"}) #{data.strongNumber}
                    </h1>

                    <StrongWord
                        originalWord={data.originalWord}
                        pronunciation={data.pronunciation}
                        audio={data.audio}
                    />

                    <Tabs defaultValue="definition" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="definition">Definición</TabsTrigger>
                            <TabsTrigger value="grammar">Gramática</TabsTrigger>
                            <TabsTrigger value="frequency">Frecuencia</TabsTrigger>
                        </TabsList>
                        <TabsContent value="definition">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Definiciones</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Definición</h3>
                                        <p className="text-lg">{data.definition}</p>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Definición Extendida</h3>
                                        <p className="text-lg">{data.extendedDefinition}</p>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            Definición en Reina-Valera
                                        </h3>
                                        <p className="text-lg">{data.RVDefinition}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="grammar">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Información Gramatical</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">Parte del Discurso</h3>
                                        <p>{data.partOfSpeech}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Derivación</h3>
                                        <p>{data.derivation}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="frequency">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Frecuencias de Palabras (RV)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc ml-6">
                                        {Object.entries(data.wordFrequencyRV).map(([key, value]) => (
                                            <li key={key} className="text-lg">
                                                {key}: {value}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </ScrollArea>
        </ThemeProvider>
    );
}
