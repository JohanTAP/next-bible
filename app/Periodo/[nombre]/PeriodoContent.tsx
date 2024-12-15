import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import periodosData from '@/data/periodos.json';

interface Periodo {
    nombre: string;
    descripcion: string;
    imagen: string;
    Eventos: {
        nombre: string;
        edad: number;
        anos_hasta_hijo: number;
        anos_despues_hijo?: number;
        ano_nacimiento: number;
        ano_muerte: number;
    }[];
}

interface PeriodoContentProps {
    nombre: string;
}

const PeriodoContent: React.FC<PeriodoContentProps> = ({ nombre }) => {
    const periodo: Periodo | undefined = periodosData.Periodos[nombre as keyof typeof periodosData.Periodos] as Periodo;

    if (!periodo) {
        return <p>Período no encontrado</p>;
    }

    return (
        <div className="container mx-auto py-6 bg-background text-foreground">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{periodo.nombre}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{periodo.descripcion}</p>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {periodo.Eventos.map((evento, index) => (
                    <Link key={index} href={`/Evento/${encodeURIComponent(evento.nombre)}`} passHref>
                        <Card className="hover:bg-accent transition-colors">
                            <CardHeader>
                                <CardTitle className="text-lg">{evento.nombre}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    {evento.edad && <p>Edad: {evento.edad}</p>}
                                    {evento.anos_hasta_hijo && <p>Edad hasta hijo: {evento.anos_hasta_hijo}</p>}
                                    {evento.anos_despues_hijo && <p>Edad despues hijo: {evento.anos_despues_hijo}</p>}
                                    <p>Año de nacimiento: {evento.ano_nacimiento}</p>
                                    {evento.ano_muerte && <p>Año de muerte: {evento.ano_muerte}</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PeriodoContent;
