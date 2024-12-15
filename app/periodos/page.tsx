"use client"

import React from 'react'
import PeriodosCarousel from '@/components/PeriodosCarousel'

export default function HomePage() {
    return (
        <div className="container mx-auto">
            <div>
                <h2 className="text-3xl font-bold">Períodos Bíblicos</h2>
            </div>
            <div className="bg-background text-foreground">
                <PeriodosCarousel />
            </div>
        </div>
    )
}
