import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Testament } from "@/types/bible";

interface TestamentSelectProps {
    value: Testament;
    onChange: (value: Testament) => void;
}

export function TestamentSelect({ value, onChange }: TestamentSelectProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Testamento</label>
            <Select
                value={value}
                onValueChange={(value) => onChange(value as Testament)}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar testamento" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="AT">Antiguo testamento</SelectItem>
                    <SelectItem value="NT">Nuevo testamento</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
} 