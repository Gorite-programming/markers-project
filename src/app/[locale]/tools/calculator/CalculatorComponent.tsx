'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../tools.module.css';

export default function CalculatorComponent() {
    const t = useTranslations();
    const [display, setDisplay] = useState('0');
    const [expression, setExpression] = useState('');
    const [resetOnNext, setResetOnNext] = useState(false);

    const handleNumber = useCallback((num: string) => {
        if (resetOnNext) {
            setDisplay(num);
            setResetOnNext(false);
        } else {
            setDisplay((prev) => (prev === '0' ? num : prev + num));
        }
    }, [resetOnNext]);

    const handleOperator = useCallback((op: string) => {
        setExpression((prev) => prev + display + ' ' + op + ' ');
        setResetOnNext(true);
    }, [display]);

    const handleEqual = useCallback(() => {
        try {
            const fullExpr = expression + display;
            const sanitized = fullExpr.replace(/[^0-9+\-*/.() ]/g, '');
            const result = new Function('return ' + sanitized)();
            const formatted = Number.isFinite(result)
                ? parseFloat(result.toFixed(10)).toString()
                : 'Error';
            setDisplay(formatted);
            setExpression('');
            setResetOnNext(true);
        } catch {
            setDisplay('Error');
            setExpression('');
            setResetOnNext(true);
        }
    }, [expression, display]);

    const handleClear = useCallback(() => {
        setDisplay('0');
        setExpression('');
        setResetOnNext(false);
    }, []);

    const handleDecimal = useCallback(() => {
        if (resetOnNext) {
            setDisplay('0.');
            setResetOnNext(false);
        } else if (!display.includes('.')) {
            setDisplay((prev) => prev + '.');
        }
    }, [display, resetOnNext]);

    const handlePercent = useCallback(() => {
        const num = parseFloat(display);
        if (!isNaN(num)) {
            setDisplay((num / 100).toString());
            setResetOnNext(true);
        }
    }, [display]);

    const handleToggleSign = useCallback(() => {
        setDisplay((prev) => {
            if (prev === '0') return prev;
            return prev.startsWith('-') ? prev.slice(1) : '-' + prev;
        });
    }, []);

    const buttons = [
        { label: 'AC', type: 'op', action: handleClear, wide: false },
        { label: '+/-', type: 'op', action: handleToggleSign, wide: false },
        { label: '%', type: 'op', action: handlePercent, wide: false },
        { label: '÷', type: 'op', action: () => handleOperator('/'), wide: false },
        { label: '7', type: 'num', action: () => handleNumber('7'), wide: false },
        { label: '8', type: 'num', action: () => handleNumber('8'), wide: false },
        { label: '9', type: 'num', action: () => handleNumber('9'), wide: false },
        { label: '×', type: 'op', action: () => handleOperator('*'), wide: false },
        { label: '4', type: 'num', action: () => handleNumber('4'), wide: false },
        { label: '5', type: 'num', action: () => handleNumber('5'), wide: false },
        { label: '6', type: 'num', action: () => handleNumber('6'), wide: false },
        { label: '-', type: 'op', action: () => handleOperator('-'), wide: false },
        { label: '1', type: 'num', action: () => handleNumber('1'), wide: false },
        { label: '2', type: 'num', action: () => handleNumber('2'), wide: false },
        { label: '3', type: 'num', action: () => handleNumber('3'), wide: false },
        { label: '+', type: 'op', action: () => handleOperator('+'), wide: false },
        { label: '0', type: 'num', action: () => handleNumber('0'), wide: true },
        { label: '.', type: 'num', action: handleDecimal, wide: false },
        { label: '=', type: 'equal', action: handleEqual, wide: false },
    ];

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    <span className="material-symbols-rounded">calculate</span>
                    {t('tools.calculator.name')}
                </h1>
                <p className={styles.pageDesc}>{t('tools.calculator.desc')}</p>
            </div>

            <div className={styles.card} style={{ maxWidth: 360 }}>
                <div className={styles.calcDisplay}>
                    <div className={styles.calcExpression}>{expression || '\u00A0'}</div>
                    <div className={styles.calcValue}>{display}</div>
                </div>
                <div className={styles.calcGrid}>
                    {buttons.map((btn, i) => (
                        <button
                            key={i}
                            className={`${styles.calcBtn} ${btn.type === 'num' ? styles.calcBtnNum :
                                    btn.type === 'equal' ? styles.calcBtnEqual :
                                        styles.calcBtnOp
                                } ${btn.wide ? styles.calcBtnWide : ''}`}
                            onClick={btn.action}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
