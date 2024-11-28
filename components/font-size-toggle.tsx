"use client";

import * as React from "react";
import { LetterText } from "lucide-react";

import { Button } from "@/components/ui/button";
import
{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FontSizeToggleProps
{
    currentFontSize: string;
    onFontSizeChange: ( size: string ) => void;
}

export function FontSizeToggle ( { currentFontSize, onFontSizeChange }: FontSizeToggleProps )
{
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
                    onClick={ () => onFontSizeChange( "small" ) }
                    className={ `${ currentFontSize === "small" ? "bg-primary text-white" : "" }` }
                >
                    Pequeña
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={ () => onFontSizeChange( "normal" ) }
                    className={ `${ currentFontSize === "normal" ? "bg-primary text-white" : "" }` }
                >
                    Normal
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={ () => onFontSizeChange( "large" ) }
                    className={ `${ currentFontSize === "large" ? "bg-primary text-white" : "" }` }
                >
                    Grande
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
