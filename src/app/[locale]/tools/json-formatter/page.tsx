import { getTranslations } from 'next-intl/server';
import JsonFormatterComponent from './JsonFormatterComponent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'tools.jsonFormatter' });

    return {
        title: t('name'),
        description: t('desc'),
    };
}

export default function JsonFormatterPage() {
    return <JsonFormatterComponent />;
}
