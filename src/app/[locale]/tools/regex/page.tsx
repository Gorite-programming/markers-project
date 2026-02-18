import { getTranslations } from 'next-intl/server';
import RegexComponent from './RegexComponent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'tools.regex' });

    return {
        title: t('name'),
        description: t('desc'),
    };
}

export default function RegexPage() {
    return <RegexComponent />;
}
