import React, { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import CarouselItem from '@/components/CarouselItem'
import eventosData from '@/data/periodos.json'

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

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    checkScroll();
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      requestAnimationFrame(checkScroll);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-end mb-4 mr-6">
        <div className="flex gap-2">
          <Button
            onClick={() => scroll('left')}
            variant="outline"
            size="icon"
            disabled={!canScrollLeft}
            className="rounded-full w-10 h-10 bg-background border-2 border-muted hover:bg-accent hover:border-primary disabled:border-muted shadow-lg"
          >
            <ChevronLeft className="h-6 w-6 text-muted-foreground" />
            <span className="sr-only">Anterior</span>
          </Button>
          <Button
            onClick={() => scroll('right')}
            variant="outline"
            size="icon"
            disabled={!canScrollRight}
            className="rounded-full w-10 h-10 bg-background border-2 border-muted hover:bg-accent hover:border-primary disabled:border-muted shadow-lg"
          >
            <ChevronRight className="h-6 w-6 text-muted-foreground" />
            <span className="sr-only">Siguiente</span>
          </Button>
        </div>
      </div>
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
      >
        {periodos.map((periodo) => (
          <CarouselItem key={periodo.key} periodo={periodo} />
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
