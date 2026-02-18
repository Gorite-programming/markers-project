'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../tools.module.css';

export default function MarkdownComponent() {
    const t = useTranslations();
    const [markdown, setMarkdown] = useState('');

    const parseMarkdown = (text: string) => {
        let html = text
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gm, '<em>$1</em>')
            .replace(/\[(.*)\]\((.*)\)/gm, '<a href="$2">$1</a>')
            .replace(/^\- (.*$)/gm, '<li>$1</li>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');

        html = `<p>${html}</p>`;
        html = html.replace(/(<li>.*?<\/li>)(?=<br>|<\/p>|$)/gs, '<ul>$1</ul>');
        html = html.replace(/<\/ul><br><ul>/g, '');

        return html;
    };

    const handleCopyHtml = async () => {
        const html = parseMarkdown(markdown);
        await navigator.clipboard.writeText(html);
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    <span className="material-symbols-rounded">description</span>
                    {t('tools.markdown.name')}
                </h1>
                <p className={styles.pageDesc}>{t('tools.markdown.desc')}</p>
            </div>

            <div className={styles.card}>
                <div className={styles.actions} style={{ marginBottom: 'var(--space-md)' }}>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleCopyHtml}>
                        <span className="material-symbols-rounded">code</span>
                        {t('tools.markdown.copyHtml')}
                    </button>
                </div>

                <div className={styles.splitView}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label className={styles.paletteLabel}>{t('tools.markdown.editor')}</label>
                        <textarea
                            className={styles.textarea}
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            placeholder={t('tools.markdown.placeholder')}
                            style={{ flex: 1, minHeight: 400 }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label className={styles.paletteLabel}>{t('tools.markdown.preview')}</label>
                        <div
                            className={styles.preview}
                            style={{ flex: 1, overflowY: 'auto' }}
                            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
