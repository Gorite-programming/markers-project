import { getTranslations } from 'next-intl/server';
import UuidComponent from './UuidComponent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'tools.uuid' });

    return {
        title: t('name'),
        description: t('desc'),
    };
}

export default function UuidPage() {
    return <UuidComponent />;
}
