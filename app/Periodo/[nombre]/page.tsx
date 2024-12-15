import periodosData from '@/data/periodos.json';
import PeriodoContent from './PeriodoContent';

export async function generateStaticParams() {
    return Object.keys(periodosData.Periodos).map((nombre) => ({ nombre } as const));
}

export default async function PeriodoPage({ params }: { params: Promise<{ nombre: string }> }) {
    const { nombre } = await params;

    return <PeriodoContent nombre={nombre} />;
}
