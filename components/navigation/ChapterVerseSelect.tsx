import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChapterVerseSelectProps {
    type: 'chapter' | 'verse';
    value: string;
    options: string[];
    onChange: (value: string) => void;
}

export function ChapterVerseSelect({ type, value, options, onChange }: ChapterVerseSelectProps) {
    const label = type === 'chapter' ? 'Capítulo' : 'Versículo';

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">{label}</label>
            <Select
                value={value}
                onValueChange={onChange}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Seleccionar ${label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
} 