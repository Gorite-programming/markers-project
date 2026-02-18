import { getTranslations } from 'next-intl/server';
import CalculatorComponent from './CalculatorComponent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'tools.calculator' });

    return {
        title: t('name'),
        description: t('desc'),
    };
}

export default function CalculatorPage() {
    return <CalculatorComponent />;
}
