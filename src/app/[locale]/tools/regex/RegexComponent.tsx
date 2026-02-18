'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../tools.module.css';

export default function RegexComponent() {
    const t = useTranslations();
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState('g');
    const [testString, setTestString] = useState('');

    let matches: RegExpExecArray[] = [];
    let error = '';

    try {
        if (pattern) {
            const regex = new RegExp(pattern, flags);
            let match;
            if (flags.includes('g')) {
                while ((match = regex.exec(testString)) !== null) {
                    matches.push(match);
                    if (match.index === regex.lastIndex) regex.lastIndex++;
                }
            } else {
                match = regex.exec(testString);
                if (match) matches.push(match);
            }
        }
    } catch (e) {
        error = (e as Error).message;
    }

    const renderHighlighted = () => {
        if (!pattern || error || matches.length === 0) return testString;

        const parts = [];
        let lastIndex = 0;

        matches.forEach((match, i) => {
            parts.push(testString.slice(lastIndex, match.index));
            parts.push(
                <mark key={i} className={styles.matchHighlight}>
                    {match[0]}
                </mark>
            );
            lastIndex = match.index + match[0].length;
        });
        parts.push(testString.slice(lastIndex));

        return parts;
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    <span className="material-symbols-rounded">manage_search</span>
                    {t('tools.regex.name')}
                </h1>
                <p className={styles.pageDesc}>{t('tools.regex.desc')}</p>
            </div>

            <div className={styles.card}>
                <div className={styles.splitView} style={{ marginBottom: 'var(--space-md)' }}>
                    <div>
                        <label className={styles.paletteLabel}>{t('tools.regex.pattern')}</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={pattern}
                            onChange={(e) => setPattern(e.target.value)}
                            placeholder="^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$"
                        />
                    </div>
                    <div style={{ maxWidth: 120 }}>
                        <label className={styles.paletteLabel}>{t('tools.regex.flags')}</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={flags}
                            onChange={(e) => setFlags(e.target.value)}
                            placeholder="g, i, m..."
                        />
                    </div>
                </div>

                {error && <p className={styles.statusError} style={{ marginBottom: 'var(--space-md)' }}>{error}</p>}

                <div className={styles.splitView}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label className={styles.paletteLabel}>{t('tools.regex.testString')}</label>
                        <textarea
                            className={styles.textarea}
                            value={testString}
                            onChange={(e) => setTestString(e.target.value)}
                            placeholder="Enter text to test..."
                            style={{ flex: 1 }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label className={styles.paletteLabel}>{t('tools.regex.matches')} ({matches.length})</label>
                        <div className={styles.preview} style={{ flex: 1, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                            {renderHighlighted()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
