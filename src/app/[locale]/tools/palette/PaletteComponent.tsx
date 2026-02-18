'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../tools.module.css';

function generatePalette(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const complementary = `#${(255 - r).toString(16).padStart(2, '0')}${(255 - g).toString(16).padStart(2, '0')}${(255 - b).toString(16).padStart(2, '0')}`;

    const shades = [0.2, 0.4, 0.6, 0.8, 1.0].map(s => {
        return `#${Math.round(r * s).toString(16).padStart(2, '0')}${Math.round(g * s).toString(16).padStart(2, '0')}${Math.round(b * s).toString(16).padStart(2, '0')}`;
    });

    return { complementary, shades };
}

export default function PaletteComponent() {
    const t = useTranslations();
    const [color, setColor] = useState('#2563eb');
    const [copied, setCopied] = useState('');

    const { complementary, shades } = generatePalette(color);

    const handleCopy = useCallback(async (val: string) => {
        await navigator.clipboard.writeText(val);
        setCopied(val);
        setTimeout(() => setCopied(''), 2000);
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    <span className="material-symbols-rounded">gradient</span>
                    {t('tools.palette.name')}
                </h1>
                <p className={styles.pageDesc}>{t('tools.palette.desc')}</p>
            </div>

            <div className={styles.card}>
                <div className={styles.colorRow}>
                    <div style={{ flex: 1 }}>
                        <div className={styles.paletteLabel}>{t('tools.palette.baseColor')}</div>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className={styles.input}
                            style={{ padding: 2, height: 44 }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div className={styles.paletteLabel}>{t('tools.palette.complementary')}</div>
                        <div
                            className={styles.paletteSwatch}
                            style={{ background: complementary, width: '100%' }}
                            onClick={() => handleCopy(complementary)}
                        />
                        <div className={styles.paletteHex}>{complementary.toUpperCase()}</div>
                    </div>
                </div>

                <div className={styles.paletteSection}>
                    <div className={styles.paletteLabel}>{t('tools.palette.shades')}</div>
                    <div className={styles.paletteColors}>
                        {shades.map((c, i) => (
                            <div key={i} style={{ flex: 1 }}>
                                <div
                                    className={styles.paletteSwatch}
                                    style={{ background: c, width: '100%' }}
                                    onClick={() => handleCopy(c)}
                                />
                                <div className={styles.paletteHex}>{c.toUpperCase()}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {copied && (
                    <div className={styles.statusValid} style={{ marginTop: 'var(--space-md)', textAlign: 'center' }}>
                        {t('common.copied')}: {copied.toUpperCase()}
                    </div>
                )}
            </div>
        </div>
    );
}
