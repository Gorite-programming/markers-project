import { getTranslations } from 'next-intl/server';
import PaletteComponent from './PaletteComponent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'tools.palette' });

    return {
        title: t('name'),
        description: t('desc'),
    };
}

export default function PalettePage() {
    return <PaletteComponent />;
}
