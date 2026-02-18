'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../tools.module.css';

export default function JsonFormatterComponent() {
    const t = useTranslations();
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [status, setStatus] = useState<'valid' | 'error' | null>(null);
    const [copied, setCopied] = useState(false);

    const handleFormat = () => {
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, 2));
            setStatus('valid');
        } catch {
            setStatus('error');
            setOutput('');
        }
    };

    const handleMinify = () => {
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setStatus('valid');
        } catch {
            setStatus('error');
            setOutput('');
        }
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    <span className="material-symbols-rounded">data_object</span>
                    {t('tools.jsonFormatter.name')}
                </h1>
                <p className={styles.pageDesc}>{t('tools.jsonFormatter.desc')}</p>
            </div>

            <div className={styles.card}>
                <div className={styles.actions} style={{ marginBottom: 'var(--space-md)' }}>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleFormat}>
                        {t('common.format')}
                    </button>
                    <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleMinify}>
                        {t('common.minify')}
                    </button>
                    <button
                        className={`${styles.btn} ${styles.btnSecondary}`}
                        onClick={handleCopy}
                        disabled={!output}
                    >
                        {copied ? t('common.copied') : t('common.copy')}
                    </button>
                    {status === 'valid' && (
                        <span className={styles.statusValid}>{t('common.valid')} JSON</span>
                    )}
                    {status === 'error' && (
                        <span className={styles.statusError}>{t('common.invalid')} JSON</span>
                    )}
                </div>

                <div className={styles.splitView}>
                    <textarea
                        className={styles.textarea}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t('tools.jsonFormatter.inputPlaceholder')}
                    />
                    <textarea
                        className={styles.textarea}
                        value={output}
                        readOnly
                        placeholder={t('tools.jsonFormatter.outputPlaceholder')}
                    />
                </div>
            </div>
        </div>
    );
}
