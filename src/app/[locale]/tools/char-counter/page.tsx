import { getTranslations } from 'next-intl/server';
import CharCounterComponent from './CharCounterComponent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'tools.charCounter' });

    return {
        title: t('name'),
        description: t('desc'),
    };
}

export default function CharCounterPage() {
    return <CharCounterComponent />;
}
