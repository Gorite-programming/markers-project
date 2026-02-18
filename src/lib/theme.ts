export type ThemeMode = 'auto' | 'light' | 'dark';

export function getTimeBasedTheme(): string {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 17) return 'morning';
    if (hour >= 17 && hour < 20) return 'evening';
    return 'night';
}

export function getEffectiveTheme(mode: ThemeMode): string {
    if (mode === 'auto') return getTimeBasedTheme();
    return mode;
}
