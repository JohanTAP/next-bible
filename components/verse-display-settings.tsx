"use client"

import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { createContext, useContext, useState } from 'react'

interface VerseDisplayContextType {
    showVerseNumbers: boolean
    compactMode: boolean
    toggleVerseNumbers: () => void
    toggleCompactMode: () => void
}

const VerseDisplayContext = createContext<VerseDisplayContextType | undefined>(undefined)

export function VerseDisplayProvider({ children }: { children: React.ReactNode }) {
    const [showVerseNumbers, setShowVerseNumbers] = useState(true)
    const [compactMode, setCompactMode] = useState(false)

    const toggleVerseNumbers = () => setShowVerseNumbers(!showVerseNumbers)
    const toggleCompactMode = () => setCompactMode(!compactMode)

    return (
        <VerseDisplayContext.Provider
            value={{
                showVerseNumbers,
                compactMode,
                toggleVerseNumbers,
                toggleCompactMode,
            }}
        >
            {children}
        </VerseDisplayContext.Provider>
    )
}

export function useVerseDisplay() {
    const context = useContext(VerseDisplayContext)
    if (context === undefined) {
        throw new Error('useVerseDisplay must be used within a VerseDisplayProvider')
    }
    return context
}

export function VerseDisplayControls() {
    const { showVerseNumbers, compactMode, toggleVerseNumbers, toggleCompactMode } = useVerseDisplay()

    return (
        <div className="flex gap-2">
            <Button
                variant="outline"
                size="icon"
                onClick={toggleVerseNumbers}
                title={showVerseNumbers ? "Ocultar números de versículos" : "Mostrar números de versículos"}
            >
                {showVerseNumbers ? (
                    <EyeOff className="h-4 w-4" />
                ) : (
                    <Eye className="h-4 w-4" />
                )}
            </Button>
            <Button
                variant="outline"
                size="icon"
                onClick={toggleCompactMode}
                title={compactMode ? "Modo normal" : "Modo compacto"}
                className={compactMode ? "opacity-50" : ""}
            >
                <span className="text-xs font-bold">A↕</span>
            </Button>
        </div>
    )
} 