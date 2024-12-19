"use client"

import React, { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Periodo {
    key: string;
    nombre: string;
    descripcion: string;
    imagen: string;
}

interface CarouselItemProps {
    periodo: Periodo;
    isVisible?: boolean;
}

const CarouselItem = memo(function CarouselItem({ periodo, isVisible = true }: CarouselItemProps) {
    return (
        <Link 
            href={`/Periodo/${periodo.key}`} 
            passHref
            className="flex-none w-[24rem] h-[30rem] snap-center focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={`Ver detalles del período ${periodo.nombre}`}
        >
            <Card className="h-full transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg">
                <div className="relative w-full h-[55%]">
                    {isVisible && (
                        <Image
                            src={periodo.imagen}
                            alt={`Imagen representativa del período ${periodo.nombre}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 700px"
                            style={{ objectFit: 'cover' }}
                            quality={75}
                            className="rounded-t-xl transition-opacity duration-300"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy02Mi85OEI2PTZFOT5ZXVlfdYGBgZSVk6SoqKq/v8DE//bBAgEVFhYiBhIGBhK/JR8lv7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7//wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        />
                    )}
                </div>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-primary">
                        {periodo.nombre}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-base text-muted-foreground line-clamp-4">
                        {periodo.descripcion}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
});

export default CarouselItem;
