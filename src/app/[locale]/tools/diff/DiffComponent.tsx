'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../tools.module.css';

export default function DiffComponent() {
    const t = useTranslations();
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [diff, setDiff] = useState<{ type: 'added' | 'removed' | 'same'; text: string }[]>([]);

    const handleCompare = () => {
        const lines1 = text1.split('\n');
        const lines2 = text2.split('\n');
        const result: { type: 'added' | 'removed' | 'same'; text: string }[] = [];

        const maxLines = Math.max(lines1.length, lines2.length);
        for (let i = 0; i < maxLines; i++) {
            if (lines1[i] === lines2[i]) {
                if (lines1[i] !== undefined) result.push({ type: 'same', text: lines1[i] });
            } else {
                if (lines1[i] !== undefined) result.push({ type: 'removed', text: `- ${lines1[i]}` });
                if (lines2[i] !== undefined) result.push({ type: 'added', text: `+ ${lines2[i]}` });
            }
        }
        setDiff(result);
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    <span className="material-symbols-rounded">compare</span>
                    {t('tools.diff.name')}
                </h1>
                <p className={styles.pageDesc}>{t('tools.diff.desc')}</p>
            </div>

            <div className={styles.card}>
                <div className={styles.splitView} style={{ marginBottom: 'var(--space-md)' }}>
                    <div>
                        <label className={styles.paletteLabel}>{t('tools.diff.original')}</label>
                        <textarea
                            className={styles.textarea}
                            value={text1}
                            onChange={(e) => setText1(e.target.value)}
                            placeholder="Paste original text..."
                        />
                    </div>
                    <div>
                        <label className={styles.paletteLabel}>{t('tools.diff.modified')}</label>
                        <textarea
                            className={styles.textarea}
                            value={text2}
                            onChange={(e) => setText2(e.target.value)}
                            placeholder="Paste modified text..."
                        />
                    </div>
                </div>

                <div className={styles.actions} style={{ marginBottom: 'var(--space-md)' }}>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleCompare}>
                        <span className="material-symbols-rounded">compare_arrows</span>
                        {t('tools.diff.compare')}
                    </button>
                </div>

                {diff.length > 0 && (
                    <div className={styles.preview} style={{ fontFamily: 'var(--font-mono)' }}>
                        {diff.map((line, i) => (
                            <div
                                key={i}
                                className={`${styles.diffLine} ${line.type === 'added' ? styles.diffAdded :
                                        line.type === 'removed' ? styles.diffRemoved : ''
                                    }`}
                            >
                                {line.text || '\u00A0'}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
