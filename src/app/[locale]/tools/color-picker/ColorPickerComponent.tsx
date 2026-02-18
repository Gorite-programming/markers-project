'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../tools.module.css';

function hexToRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0, s = 0;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
}

export default function ColorPickerComponent() {
    const t = useTranslations();
    const [color, setColor] = useState('#2563eb');
    const [copied, setCopied] = useState('');

    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const formats = [
        { label: t('tools.colorPicker.hex'), value: color.toUpperCase() },
        { label: t('tools.colorPicker.rgb'), value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
        { label: t('tools.colorPicker.hsl'), value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    ];

    const handleCopy = useCallback(async (val: string) => {
        await navigator.clipboard.writeText(val);
        setCopied(val);
        setTimeout(() => setCopied(''), 2000);
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    <span className="material-symbols-rounded">palette</span>
                    {t('tools.colorPicker.name')}
                </h1>
                <p className={styles.pageDesc}>{t('tools.colorPicker.desc')}</p>
            </div>

            <div className={styles.card}>
                <div
                    className={styles.colorSwatch}
                    style={{ background: color }}
                />
                <div style={{ marginTop: 'var(--space-md)' }}>
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        style={{ width: '100%', height: 40, cursor: 'pointer', border: 'none' }}
                    />
                </div>
                <div style={{ marginTop: 'var(--space-md)' }}>
                    {formats.map((f) => (
                        <div key={f.label} className={styles.colorRow}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', width: 40, fontFamily: 'var(--font-mono)' }}>{f.label}</span>
                            <code style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: 13 }}>{f.value}</code>
                            <button
                                className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSmall}`}
                                onClick={() => handleCopy(f.value)}
                            >
                                {copied === f.value ? t('common.copied') : t('common.copy')}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
