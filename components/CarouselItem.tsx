"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Periodo {
    key: string;
    nombre: string;
    descripcion: string;
    imagen: string;
}

interface CarouselItemProps {
    periodo: Periodo;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ periodo }) => (
    <Link href={`/Periodo/${periodo.key}`} passHref>
        <div className="flex-none w-[24rem] h-[30rem] snap-center cursor-pointer p-3">
            <div className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg h-full">
                <div className="relative w-full h-[55%]">
                    <Image
                        src={periodo.imagen}
                        alt={periodo.nombre}
                        fill
                        sizes="(max-width: 768px) 100vw, 700px"
                        style={{ objectFit: 'cover' }}
                        quality={75}
                        className="rounded-t-xl"
                    />
                </div>
                <div className="p-4 flex flex-col gap-1 h-[45%]">
                    <h3 className="text-xl font-semibold text-gray-900">{periodo.nombre}</h3>
                    <p className="text-base text-gray-600 line-clamp-4 overflow-hidden">{periodo.descripcion}</p>
                </div>
            </div>
        </div>
    </Link>
);

export default CarouselItem;
