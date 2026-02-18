'use client';

import { usePathname, useRouter } from 'next/navigation';
import styles from './LanguageSwitcher.module.css';

const locales = [
    { code: 'ja', label: 'JP' },
    { code: 'en', label: 'EN' },
];

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();
    const currentLocale = pathname.split('/')[1] || 'ja';

    const switchLocale = (newLocale: string) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;
        router.push(segments.join('/'));
    };

    return (
        <div className={styles.switcher}>
            {locales.map((loc) => (
                <button
                    key={loc.code}
                    className={`${styles.btn} ${currentLocale === loc.code ? styles.active : ''}`}
                    onClick={() => switchLocale(loc.code)}
                    aria-label={loc.label}
                >
                    {loc.label}
                </button>
            ))}
        </div>
    );
}
