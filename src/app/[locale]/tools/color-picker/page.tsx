import { getTranslations } from 'next-intl/server';
import ColorPickerComponent from './ColorPickerComponent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'tools.colorPicker' });

    return {
        title: t('name'),
        description: t('desc'),
    };
}

export default function ColorPickerPage() {
    return <ColorPickerComponent />;
}
