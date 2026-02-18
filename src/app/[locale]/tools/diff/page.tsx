import { getTranslations } from 'next-intl/server';
import DiffComponent from './DiffComponent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'tools.diff' });

    return {
        title: t('name'),
        description: t('desc'),
    };
}

export default function DiffPage() {
    return <DiffComponent />;
}
