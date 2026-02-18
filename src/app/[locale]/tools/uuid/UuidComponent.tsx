'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../tools.module.css';

export default function UuidComponent() {
    const t = useTranslations();
    const [history, setHistory] = useState<string[]>([]);
    const [bulkCount, setBulkCount] = useState(5);

    const generateUuid = () => {
        const uuid = crypto.randomUUID();
        setHistory(prev => [uuid, ...prev].slice(0, 50));
        return uuid;
    };

    const handleBulkGenerate = () => {
        const newUuids = Array.from({ length: bulkCount }, () => crypto.randomUUID());
        setHistory(prev => [...newUuids, ...prev].slice(0, 50));
    };

    const handleCopy = async (val: string) => {
        await navigator.clipboard.writeText(val);
    };

    const handleCopyAll = async () => {
        await navigator.clipboard.writeText(history.join('\n'));
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    <span className="material-symbols-rounded">fingerprint</span>
                    {t('tools.uuid.name')}
                </h1>
                <p className={styles.pageDesc}>{t('tools.uuid.desc')}</p>
            </div>

            <div className={styles.card}>
                <div className={styles.actions} style={{ marginBottom: 'var(--space-lg)' }}>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={generateUuid}>
                        <span className="material-symbols-rounded">add</span>
                        {t('tools.uuid.generateOne')}
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginLeft: 'auto' }}>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t('tools.uuid.count')}</span>
                        <input
                            type="number"
                            className={styles.input}
                            style={{ width: 80, height: 36 }}
                            value={bulkCount}
                            onChange={(e) => setBulkCount(Number(e.target.value))}
                            min={1}
                            max={100}
                        />
                        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleBulkGenerate}>
                            {t('tools.uuid.generateBulk')}
                        </button>
                    </div>
                </div>

                {history.length > 0 && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
                            <div className={styles.paletteLabel}>{t('tools.uuid.history')}</div>
                            <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSmall}`} onClick={handleCopyAll}>
                                <span className="material-symbols-rounded">content_copy</span>
                                {t('tools.uuid.copyAll')}
                            </button>
                        </div>
                        <div className={styles.uuidList}>
                            {history.map((id, i) => (
                                <div key={i} className={styles.uuidItem}>
                                    <code>{id}</code>
                                    <button
                                        className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSmall}`}
                                        onClick={() => handleCopy(id)}
                                        title={t('common.copy')}
                                    >
                                        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>content_copy</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
