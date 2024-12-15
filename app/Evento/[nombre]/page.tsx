import periodosData from '@/data/periodos.json';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Escritura {
    referencia: string;
    texto: string;
}

interface Evento {
    nombre: string;
    articulo?: string;
    escrituras?: Escritura[];
}

interface EventoPageProps {
    params: Promise<{ nombre: string }>;
}

export default async function EventoPage({ params }: EventoPageProps) {
    const { nombre } = await params;

    let evento: Evento | undefined;
    for (const periodo of Object.values(periodosData.Periodos)) {
        evento = periodo.Eventos.find((e: Evento) => e.nombre === nombre);
        if (evento) break;
    }

    if (!evento) {
        return <p>Evento no encontrado</p>;
    }

    return (
        <div className="container mx-auto py-6 bg-background text-foreground">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{evento.nombre}</CardTitle>
                </CardHeader>
                <CardContent>
                    {evento.articulo && (
                        <div className="prose dark:prose-invert max-w-none">
                            <div
                                className="text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: evento.articulo }}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>

            {evento.escrituras && evento.escrituras.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Referencias Bíblicas</h2>
                    {evento.escrituras.map((escritura, index) => (
                        <Card key={index} className="bg-card">
                            <CardHeader>
                                <CardTitle className="text-lg text-primary">{escritura.referencia}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-card-foreground">{escritura.texto}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
