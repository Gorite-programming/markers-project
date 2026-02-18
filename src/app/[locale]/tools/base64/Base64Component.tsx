'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../tools.module.css';

export default function Base64Component() {
    const t = useTranslations();
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const handleEncode = () => {
        try {
            const encoded = btoa(unescape(encodeURIComponent(input)));
            setOutput(encoded);
        } catch {
            setOutput('Error: Invalid input');
        }
    };

    const handleDecode = () => {
        try {
            const decoded = decodeURIComponent(escape(atob(input)));
            setOutput(decoded);
        } catch {
            setOutput('Error: Invalid Base64');
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
                    <span className="material-symbols-rounded">swap_horiz</span>
                    {t('tools.base64.name')}
                </h1>
                <p className={styles.pageDesc}>{t('tools.base64.desc')}</p>
            </div>

            <div className={styles.card}>
                <div className={styles.splitView}>
                    <div>
                        <textarea
                            className={styles.textarea}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t('tools.base64.inputPlaceholder')}
                        />
                        <div className={styles.actions} style={{ marginTop: 'var(--space-sm)' }}>
                            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleEncode}>
                                {t('common.encode')}
                            </button>
                            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleDecode}>
                                {t('common.decode')}
                            </button>
                        </div>
                    </div>
                    <div>
                        <textarea
                            className={styles.textarea}
                            value={output}
                            readOnly
                            placeholder={t('tools.base64.outputPlaceholder')}
                        />
                        <div className={styles.actions} style={{ marginTop: 'var(--space-sm)' }}>
                            <button
                                className={`${styles.btn} ${styles.btnSecondary}`}
                                onClick={handleCopy}
                                disabled={!output}
                            >
                                {copied ? t('common.copied') : t('common.copy')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
