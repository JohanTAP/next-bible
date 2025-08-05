import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChapterVerseSelectProps {
    type: 'chapter' | 'verse';
    value: string;
    options: string[];
    onChange: (value: string) => void;
}

export function ChapterVerseSelect({ type, value, options, onChange }: ChapterVerseSelectProps) {
    const label = type === 'chapter' ? 'Capítulo' : 'Versículo';
    const id = `select-${type}`;

    return (
        <div className="space-y-2">
            <label
                htmlFor={id}
                className="text-sm font-medium text-muted-foreground"
                id={`${id}-label`}
            >
                {label}
            </label>
            <Select
                value={value}
                onValueChange={onChange}
                name={type}
                aria-labelledby={`${id}-label`}
            >
                <SelectTrigger className="w-full" id={id}>
                    <SelectValue
                        placeholder={`Seleccionar ${label.toLowerCase()}`}
                        aria-label={`Seleccionar ${label.toLowerCase()}`}
                    />
                </SelectTrigger>
                <SelectContent>
                    {options.length === 0 ? (
                        <div className="p-2 text-sm text-muted-foreground">
                            No hay {type === 'chapter' ? 'capítulos' : 'versículos'} disponibles
                        </div>
                    ) : (
                        options.map((option) => (
                            <SelectItem
                                key={option}
                                value={option}
                                aria-label={`${label} ${option}`}
                            >
                                {option}
                            </SelectItem>
                        ))
                    )}
                </SelectContent>
            </Select>
        </div>
    );
} 