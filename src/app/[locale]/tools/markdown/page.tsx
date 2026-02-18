import { getTranslations } from 'next-intl/server';
import MarkdownComponent from './MarkdownComponent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'tools.markdown' });

    return {
        title: t('name'),
        description: t('desc'),
    };
}

export default function MarkdownPage() {
    return <MarkdownComponent />;
}
