"use client";

import * as React from "react";
import { createContext, useContext, useState } from "react";
import { LetterText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FontSize = "small" | "normal" | "large";

interface FontSizeContextType {
    fontSize: FontSize;
    setFontSize: (size: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
    const [fontSize, setFontSize] = useState<FontSize>("normal");
    return (
        <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
}

export function useFontSize() {
    const context = useContext(FontSizeContext);
    if (context === undefined) {
        throw new Error("useFontSize must be used within a FontSizeProvider");
    }
    return context;
}

export function FontSizeToggle() {
    const { fontSize, setFontSize } = useFontSize();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <LetterText className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Toggle font size</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => setFontSize("small")}
                    className={fontSize === "small" ? "bg-primary text-white" : ""}
                >
                    Pequeña
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setFontSize("normal")}
                    className={fontSize === "normal" ? "bg-primary text-white" : ""}
                >
                    Normal
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setFontSize("large")}
                    className={fontSize === "large" ? "bg-primary text-white" : ""}
                >
                    Grande
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
