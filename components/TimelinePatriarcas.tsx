"use client";

import React, { useEffect, useState } from 'react';

interface Evento {
    nombre: string;
    edad: number;
    anos_hasta_hijo: number;
    anos_despues_hijo?: number;
    ano_nacimiento: number;
    ano_muerte: number;
}

interface TimelinePatriarcasProps {
    eventos: Evento[];
}

const TimelinePatriarcas: React.FC<TimelinePatriarcasProps> = ({ eventos }) => {
    const [escala, setEscala] = useState<number>(0);
    const [minAno, setMinAno] = useState<number>(0);
    const [maxAno, setMaxAno] = useState<number>(0);

    useEffect(() => {
        const anos = eventos.flatMap(e => [e.ano_nacimiento, e.ano_muerte]);
        
        // Detectamos qué generación estamos mostrando
        const esPostDiluvio = eventos.some(e => e.nombre === "Sem");
        const esPatriarcas = eventos.some(e => e.nombre === "Abraham");
        
        if (esPatriarcas) {
            // Para los patriarcas (Abraham, Isaac, Jacob)
            const min = 2000;
            const max = 2400;
            setMinAno(min);
            setMaxAno(max);
            const containerWidth = 1000;
            setEscala(containerWidth / (max - min));
        } else if (esPostDiluvio) {
            // Para la generación post-diluviana (Sem y descendientes)
            const min = Math.min(...anos);
            const max = Math.max(...anos);
            const margen = (max - min) * 0.1;
            setMinAno(min);
            setMaxAno(max + margen);
            const containerWidth = 1000;
            setEscala(containerWidth / (max - min + margen));
        } else {
            // Para la generación antediluviana
            const min = 0;
            const max = 2200;
            setMinAno(min);
            setMaxAno(max);
            const containerWidth = 1000;
            setEscala(containerWidth / max);
        }
    }, [eventos]);

    // Modificamos la función generarEscala
    const generarEscala = () => {
        const marcas = [];
        const intervalo = 100;
        const esPostDiluvio = eventos.some(e => e.nombre === "Sem");
        const esPatriarcas = eventos.some(e => e.nombre === "Abraham");
        
        if (esPatriarcas || esPostDiluvio) {
            const primeraMarca = Math.floor(minAno / intervalo) * intervalo;
            for (let i = primeraMarca; i <= maxAno; i += intervalo) {
                marcas.push(
                    <div
                        key={i}
                        className="absolute h-2 border-l border-gray-400"
                        style={{ left: `${(i - minAno) * escala}px` }}
                    >
                        <span className="absolute -top-6 -translate-x-1/2 text-xs">{i}</span>
                    </div>
                );
            }
        } else {
            for (let i = 0; i <= maxAno; i += intervalo) {
                marcas.push(
                    <div
                        key={i}
                        className="absolute h-2 border-l border-gray-400"
                        style={{ left: `${i * escala}px` }}
                    >
                        <span className="absolute -top-6 -translate-x-1/2 text-xs">{i}</span>
                    </div>
                );
            }
        }
        return marcas;
    };

    // Modificamos el título dinámicamente
    const getTitulo = () => {
        if (eventos.some(e => e.nombre === "Abraham")) {
            return "Cronología de los Patriarcas";
        } else if (eventos.some(e => e.nombre === "Sem")) {
            return "Cronología Post-Diluviana";
        }
        return "Cronología de los Patriarcas Antediluvianos";
    };

    return (
        <div className="relative overflow-x-auto">
            <div className="min-w-[1000px] p-8">
                {/* Título */}
                <h2 className="text-xl font-bold mb-8 text-center">{getTitulo()}</h2>
                
                {/* Escala de años */}
                <div className="relative h-8 mb-8 border-b border-gray-400">
                    <div className="absolute top-0 w-full">
                        {generarEscala()}
                    </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                    {eventos.map((evento, index) => (
                        <div key={index} className="relative h-12">
                            {/* Años hasta hijo (barra verde) */}
                            <div
                                className="absolute h-6 bg-green-500/80 rounded-l-md z-10"
                                style={{
                                    left: `${(eventos.some(e => e.nombre === "Sem") || eventos.some(e => e.nombre === "Abraham")) ? 
                                        (evento.ano_nacimiento - minAno) * escala : 
                                        evento.ano_nacimiento * escala}px`,
                                    width: `${evento.anos_hasta_hijo * escala}px`,
                                }}
                            >
                                <span className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-sm text-white font-medium">
                                    {evento.anos_hasta_hijo}
                                </span>
                            </div>

                            {/* Vida total (barra roja) */}
                            <div
                                className={`absolute h-6 bg-red-500/80 ${evento.nombre === "Enoc" ? "rounded-l-md" : "rounded-md"}`}
                                style={{
                                    left: `${(eventos.some(e => e.nombre === "Sem") || eventos.some(e => e.nombre === "Abraham")) ? 
                                        (evento.ano_nacimiento - minAno) * escala : 
                                        evento.ano_nacimiento * escala}px`,
                                    width: `${evento.edad * escala}px`,
                                }}
                            >
                                <span className="absolute -top-6 text-sm font-medium">
                                    {evento.nombre} {evento.edad} años
                                </span>
                            </div>

                            {/* Barra de vida sempiterna para Enoc */}
                            {evento.nombre === "Enoc" && (
                                <div
                                    className="absolute h-6 bg-sky-500/80 rounded-r-md"
                                    style={{
                                        left: `${(evento.ano_nacimiento + evento.edad - minAno) * escala}px`,
                                        width: `${(maxAno - (evento.ano_nacimiento + evento.edad)) * escala}px`,
                                    }}
                                >
                                    <span className="absolute top-1/2 -translate-y-1/2 left-4 text-sm text-white">
                                        Vida sempiterna
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TimelinePatriarcas; 