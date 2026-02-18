'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeMode, getEffectiveTheme, getTimeBasedTheme } from '@/lib/theme';

interface ThemeContextType {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    effectiveTheme: string;
}

const ThemeContext = createContext<ThemeContextType>({
    mode: 'auto',
    setMode: () => { },
    effectiveTheme: 'morning',
});

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<ThemeMode>('auto');
    const [effectiveTheme, setEffectiveTheme] = useState('morning');

    useEffect(() => {
        const saved = localStorage.getItem('theme-mode') as ThemeMode | null;
        if (saved && ['auto', 'light', 'dark'].includes(saved)) {
            setMode(saved);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('theme-mode', mode);
        const update = () => setEffectiveTheme(getEffectiveTheme(mode));
        update();

        if (mode === 'auto') {
            const interval = setInterval(update, 60000);
            return () => clearInterval(interval);
        }
    }, [mode]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', effectiveTheme);
    }, [effectiveTheme]);

    return (
        <ThemeContext.Provider value={{ mode, setMode, effectiveTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
