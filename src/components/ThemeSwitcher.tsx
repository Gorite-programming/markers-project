'use client';

import { useTheme } from './ThemeProvider';
import { useTranslations } from 'next-intl';
import styles from './ThemeSwitcher.module.css';

export default function ThemeSwitcher() {
    const { mode, setMode } = useTheme();
    const t = useTranslations('theme');

    const modes = [
        { value: 'auto' as const, icon: 'routine', label: t('auto') },
        { value: 'light' as const, icon: 'light_mode', label: t('light') },
        { value: 'dark' as const, icon: 'dark_mode', label: t('dark') },
    ];

    return (
        <div className={styles.switcher}>
            {modes.map((m) => (
                <button
                    key={m.value}
                    className={`${styles.btn} ${mode === m.value ? styles.active : ''}`}
                    onClick={() => setMode(m.value)}
                    title={m.label}
                    aria-label={m.label}
                >
                    <span className="material-symbols-rounded">{m.icon}</span>
                </button>
            ))}
        </div>
    );
}
