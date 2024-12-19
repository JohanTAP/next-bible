import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo } from "react";

interface BookSelectProps {
    value: string;
    books: string[];
    onChange: (value: string) => void;
}

const BOOK_NAMES: { [key: string]: string } = {
    GEN: 'Génesis', EXO: 'Éxodo', LEV: 'Levítico', NUM: 'Números',
    DEU: 'Deuteronomio', JOS: 'Josué', JDG: 'Jueces', RUT: 'Rut',
    '1SA': '1 Samuel', '2SA': '2 Samuel', '1KI': '1 Reyes', '2KI': '2 Reyes',
    '1CH': '1 Crónicas', '2CH': '2 Crónicas', EZR: 'Esdras', NEH: 'Nehemías',
    EST: 'Ester', JOB: 'Job', PSA: 'Salmos', PRO: 'Proverbios',
    ECC: 'Eclesiastés', SNG: 'Cantar de los Cantares', ISA: 'Isaías', JER: 'Jeremías',
    LAM: 'Lamentaciones', EZK: 'Ezequiel', DAN: 'Daniel', HOS: 'Oseas',
    JOL: 'Joel', AMO: 'Amós', OBA: 'Abdías', JON: 'Jonás',
    MIC: 'Miqueas', NAM: 'Nahúm', HAB: 'Habacuc', ZEP: 'Sofonías',
    HAG: 'Hageo', ZEC: 'Zacarías', MAL: 'Malaquías', MAT: 'Mateo',
    MRK: 'Marcos', LUK: 'Lucas', JHN: 'Juan', ACT: 'Hechos',
    ROM: 'Romanos', '1CO': '1 Corintios', '2CO': '2 Corintios', GAL: 'Gálatas',
    EPH: 'Efesios', PHP: 'Filipenses', COL: 'Colosenses', '1TH': '1 Tesalonicenses',
    '2TH': '2 Tesalonicenses', '1TI': '1 Timoteo', '2TI': '2 Timoteo', TIT: 'Tito',
    PHM: 'Filemón', HEB: 'Hebreos', JAS: 'Santiago', '1PE': '1 Pedro',
    '2PE': '2 Pedro', '1JN': '1 Juan', '2JN': '2 Juan', '3JN': '3 Juan',
    JUD: 'Judas', REV: 'Apocalipsis'
};

export function BookSelect({ value, books, onChange }: BookSelectProps) {
    const bookItems = useMemo(() =>
        books.map(book => ({
            code: book,
            name: BOOK_NAMES[book] || book
        })), [books]);

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Libro</label>
            <Select
                value={value}
                onValueChange={onChange}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar libro" />
                </SelectTrigger>
                <SelectContent>
                    {bookItems.map(({ code, name }) => (
                        <SelectItem key={code} value={code}>
                            {name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
} 