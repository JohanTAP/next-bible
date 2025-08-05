"use client"

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import CarouselItem from '@/components/CarouselItem'
import eventosData from '@/data/periodos.json'
import { useInView } from 'react-intersection-observer'

const periodos = Object.entries(eventosData.Periodos).map(([key, periodo]) => ({
  key,
  nombre: periodo.nombre,
  descripcion: periodo.descripcion,
  imagen: periodo.imagen
}));

export default function PeriodosCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Usar IntersectionObserver para cargar imágenes solo cuando son visibles
  const { ref: observerRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);

      // Calcular el índice actual basado en el scroll
      const itemWidth = 400; // Ancho aproximado de cada item
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(newIndex);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      requestAnimationFrame(checkScroll);
    }
  }, [checkScroll]);

  // Memoizar los controles del carrusel
  const carouselControls = useMemo(() => (
    <div className="flex items-center justify-between mb-4 px-6">
      <div className="text-sm text-muted-foreground">
        {currentIndex + 1} de {periodos.length}
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => scroll('left')}
          variant="outline"
          size="icon"
          disabled={!canScrollLeft}
          className="rounded-full w-10 h-10 bg-background border-2 border-muted hover:bg-accent hover:border-primary disabled:border-muted shadow-lg"
          aria-label="Anterior período"
        >
          <ChevronLeft className="h-6 w-6 text-muted-foreground" />
        </Button>
        <Button
          onClick={() => scroll('right')}
          variant="outline"
          size="icon"
          disabled={!canScrollRight}
          className="rounded-full w-10 h-10 bg-background border-2 border-muted hover:bg-accent hover:border-primary disabled:border-muted shadow-lg"
          aria-label="Siguiente período"
        >
          <ChevronRight className="h-6 w-6 text-muted-foreground" />
        </Button>
      </div>
    </div>
  ), [canScrollLeft, canScrollRight, currentIndex, scroll]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4" ref={observerRef}>
      {carouselControls}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
        role="region"
        aria-label="Carrusel de períodos históricos"
      >
        {periodos.map((periodo, index) => (
          <CarouselItem
            key={periodo.key}
            periodo={periodo}
            isVisible={inView || index === currentIndex}
          />
        ))}
      </div>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
