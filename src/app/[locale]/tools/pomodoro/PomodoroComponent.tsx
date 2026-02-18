'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../tools.module.css';

type Mode = 'focus' | 'shortBreak' | 'longBreak';

const SETTINGS = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
};

export default function PomodoroComponent() {
    const t = useTranslations();
    const [mode, setMode] = useState<Mode>('focus');
    const [timeLeft, setTimeLeft] = useState(SETTINGS.focus);
    const [isActive, setIsActive] = useState(false);
    const [sessions, setSessions] = useState(0);

    const resetTimer = useCallback((newMode: Mode) => {
        setMode(newMode);
        setTimeLeft(SETTINGS[newMode]);
        setIsActive(false);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (mode === 'focus') setSessions(s => s + 1);
            alert(mode === 'focus' ? 'Time to break!' : 'Time to focus!');
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    <span className="material-symbols-rounded">timer</span>
                    {t('tools.pomodoro.name')}
                </h1>
                <p className={styles.pageDesc}>{t('tools.pomodoro.desc')}</p>
            </div>

            <div className={styles.card} style={{ maxWidth: 500, margin: '0 auto' }}>
                <div className={styles.timerModes}>
                    {(['focus', 'shortBreak', 'longBreak'] as Mode[]).map(m => (
                        <button
                            key={m}
                            className={`${styles.btn} ${mode === m ? styles.btnPrimary : styles.btnSecondary}`}
                            onClick={() => resetTimer(m)}
                        >
                            {t(`tools.pomodoro.${m}`)}
                        </button>
                    ))}
                </div>

                <div className={styles.timerDisplay}>
                    {formatTime(timeLeft)}
                </div>

                <div className={styles.timerActions}>
                    <button
                        className={`${styles.btn} ${styles.btnPrimary}`}
                        style={{ padding: 'var(--space-md) var(--space-xl)', fontSize: 16 }}
                        onClick={() => setIsActive(!isActive)}
                    >
                        <span className="material-symbols-rounded">{isActive ? 'pause' : 'play_arrow'}</span>
                        {isActive ? t('common.stop') : t('common.start')}
                    </button>
                    <button
                        className={`${styles.btn} ${styles.btnSecondary}`}
                        onClick={() => resetTimer(mode)}
                    >
                        <span className="material-symbols-rounded">replay</span>
                        {t('common.reset')}
                    </button>
                </div>

                <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)', color: 'var(--text-muted)', fontSize: 13 }}>
                    {t('tools.pomodoro.sessions')}: <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{sessions}</span>
                </div>
            </div>
        </div>
    );
}
