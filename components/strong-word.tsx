import React from 'react';
import { Volume2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface StrongWordProps
{
    originalWord: string;
    pronunciation: string;
    audio: string;
}

export function StrongWord ( { originalWord, pronunciation, audio }: StrongWordProps )
{
    const playAudio = () =>
    {
        const audioElement = new Audio( audio );
        audioElement.play();
    };

    return (
        <Card>
            <CardContent className="flex items-center justify-between p-6">
                <div>
                    <h2 className="text-2xl font-bold text-primary">{ originalWord }</h2>
                    <p className="text-lg text-muted-foreground italic">{ pronunciation }</p>
                </div>
                <Button onClick={ playAudio } variant="outline" size="icon">
                    <Volume2 className="h-6 w-6" />
                    <span className="sr-only">Reproducir audio</span>
                </Button>
            </CardContent>
        </Card>
    );
}
