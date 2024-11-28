import React from "react"
import { BibleVerse } from "@/types/types_bible"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface InterlinearVerseProps
{
  verse: BibleVerse
}

export function InterlinearVerse ( { verse }: InterlinearVerseProps )
{
  return (
    <div className="space-y-6">
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>{ verse.reference } Reina Valera 1960</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{ verse.translation }</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            { verse.words.map( ( word ) => (
              <div key={ word.id } className="text-center space-y-1 min-w-[100px]">
                <div className="text-2xl font-hebrew text-primary">{ word.hebrew }</div>
                <div className="text-xs text-muted-foreground">{ word.reference }</div>
                <div className="text-sm text-muted-foreground">{ word.grammar }</div>
                <div className="text-sm text-secondary-foreground">{ word.translation }</div>
              </div>
            ) ) }
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
