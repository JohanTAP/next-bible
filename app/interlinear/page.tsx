import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Inicio ()
{
    return (
        <div className="flex flex-col items-start justify-start h-auto px-6 py-12 bg-background text-foreground max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Bienvenido a Davar 📖✨</h1>
            <p className="text-lg mb-4">
                Descubre la <span className="font-semibold">Biblia</span> en su idioma original con una herramienta poderosa y fácil de usar.
                Accede al <span className="font-semibold">hebreo bíblico</span> y <span className="font-semibold">griego koiné</span>, junto con:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
                <li className="flex items-center"><span className="mr-2">✅</span> <strong className="mr-2">Traducción interlineal</strong> para un análisis profundo</li>
                <li className="flex items-center"><span className="mr-2">✅</span> <strong className="mr-2">Códigos Strong y Parsing</strong> para comprender la estructura gramatical</li>
                <li className="flex items-center"><span className="mr-2">✅</span> <strong className="mr-2">Diccionario</strong> para enriquecer tu estudio</li>
                <li className="flex items-center"><span className="mr-2">✅</span> <strong className="mr-2">Búsqueda avanzada</strong> por palabras clave, raíces y significados</li>
            </ul>
            <blockquote className="italic mb-6 border-l-4 pl-4 text-muted-foreground border-border">
                “Bienaventurados los que escuchan la palabra de Dios y la guardan” – Lucas 11:28
            </blockquote>
            <p className="text-lg mb-6">
                <strong>Nuestra identidad y misión:</strong> Apocalipsis <span className="font-semibold">12:17</span> y <span className="font-semibold">14:6-12 </span>
                nos describen como el <span className="font-semibold">remanente de Dios</span>, llamados a proclamar Su verdad en estos tiempos.
            </p>
            <Link href="/interlinear">
                <Button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-lg hover:bg-primary/90 transition">
                    Empezar mi estudio ahora
                </Button>
            </Link>
        </div>
    );
}
