import { getTranslations } from 'next-intl/server';
import Base64Component from './Base64Component';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'tools.base64' });

    return {
        title: t('name'),
        description: t('desc'),
    };
}

export default function Base64Page() {
    return <Base64Component />;
}
