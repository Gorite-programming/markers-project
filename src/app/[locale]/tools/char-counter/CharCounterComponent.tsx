'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../tools.module.css';

export default function CharCounterComponent() {
    const t = useTranslations();
    const [text, setText] = useState('');

    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split('\n').length : 0;
    const bytes = new TextEncoder().encode(text).length;

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    <span className="material-symbols-rounded">text_fields</span>
                    {t('tools.charCounter.name')}
                </h1>
                <p className={styles.pageDesc}>{t('tools.charCounter.desc')}</p>
            </div>

            <div className={styles.stats}>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>{chars}</div>
                    <div className={styles.statLabel}>{t('tools.charCounter.chars')}</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>{words}</div>
                    <div className={styles.statLabel}>{t('tools.charCounter.words')}</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>{lines}</div>
                    <div className={styles.statLabel}>{t('tools.charCounter.lines')}</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>{bytes}</div>
                    <div className={styles.statLabel}>{t('tools.charCounter.bytes')}</div>
                </div>
            </div>

            <div className={styles.card} style={{ marginTop: 'var(--space-md)' }}>
                <textarea
                    className={styles.textarea}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={t('tools.charCounter.placeholder')}
                />
            </div>
        </div>
    );
}
