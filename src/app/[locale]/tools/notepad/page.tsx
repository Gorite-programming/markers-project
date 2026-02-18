import { getTranslations } from 'next-intl/server';
import NotepadComponent from './NotepadComponent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'tools.notepad' });

    return {
        title: t('name'),
        description: t('desc'),
    };
}

export default function NotepadPage() {
    return <NotepadComponent />;
}
