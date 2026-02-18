import { getTranslations } from 'next-intl/server';
import PomodoroComponent from './PomodoroComponent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'tools.pomodoro' });

    return {
        title: t('name'),
        description: t('desc'),
    };
}

export default function PomodoroPage() {
    return <PomodoroComponent />;
}
