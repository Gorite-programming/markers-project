'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../tools.module.css';

export default function NotepadComponent() {
    const t = useTranslations();
    const [text, setText] = useState('');
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('markers_notepad');
        if (saved) setText(saved);
    }, []);

    const handleChange = (val: string) => {
        setText(val);
        localStorage.setItem('markers_notepad', val);
        setLastSaved(new Date());
    };

    const handleDownload = () => {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `markers_note_${new Date().toISOString().slice(0, 10)}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const chars = text.length;
    const lines = text ? text.split('\n').length : 0;

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    <span className="material-symbols-rounded">edit_note</span>
                    {t('tools.notepad.name')}
                </h1>
                <p className={styles.pageDesc}>{t('tools.notepad.desc')}</p>
            </div>

            <div className={styles.card}>
                <div className={styles.actions} style={{ marginBottom: 'var(--space-sm)', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                            {chars} {t('tools.notepad.chars')} / {lines} {t('tools.notepad.lines')}
                        </span>
                        {lastSaved && (
                            <span className={styles.statusValid} style={{ fontSize: 11 }}>
                                {t('tools.notepad.autosaved')} {lastSaved.toLocaleTimeString()}
                            </span>
                        )}
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                        <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSmall}`} onClick={handleDownload}>
                            <span className="material-symbols-rounded">download</span>
                            {t('common.download')}
                        </button>
                        <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSmall}`} onClick={() => handleChange('')}>
                            <span className="material-symbols-rounded">delete</span>
                            {t('common.clear')}
                        </button>
                    </div>
                </div>
                <textarea
                    className={styles.textarea}
                    value={text}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder={t('tools.notepad.placeholder')}
                    style={{ minHeight: '60vh' }}
                />
            </div>
        </div>
    );
}
