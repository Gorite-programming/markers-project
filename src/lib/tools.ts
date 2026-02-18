export interface ToolInfo {
    id: string;
    nameKey: string;
    descKey: string;
    category: 'text' | 'color' | 'dev' | 'productivity' | 'basic';
    icon: string;
    path: string;
}

export const tools: ToolInfo[] = [
    {
        id: 'calculator',
        nameKey: 'tools.calculator.name',
        descKey: 'tools.calculator.desc',
        category: 'basic',
        icon: 'calculate',
        path: '/tools/calculator',
    },
    {
        id: 'char-counter',
        nameKey: 'tools.charCounter.name',
        descKey: 'tools.charCounter.desc',
        category: 'text',
        icon: 'text_fields',
        path: '/tools/char-counter',
    },
    {
        id: 'base64',
        nameKey: 'tools.base64.name',
        descKey: 'tools.base64.desc',
        category: 'text',
        icon: 'swap_horiz',
        path: '/tools/base64',
    },
    {
        id: 'json-formatter',
        nameKey: 'tools.jsonFormatter.name',
        descKey: 'tools.jsonFormatter.desc',
        category: 'text',
        icon: 'data_object',
        path: '/tools/json-formatter',
    },
    {
        id: 'color-picker',
        nameKey: 'tools.colorPicker.name',
        descKey: 'tools.colorPicker.desc',
        category: 'color',
        icon: 'palette',
        path: '/tools/color-picker',
    },
    {
        id: 'palette',
        nameKey: 'tools.palette.name',
        descKey: 'tools.palette.desc',
        category: 'color',
        icon: 'gradient',
        path: '/tools/palette',
    },
    {
        id: 'regex',
        nameKey: 'tools.regex.name',
        descKey: 'tools.regex.desc',
        category: 'dev',
        icon: 'manage_search',
        path: '/tools/regex',
    },
    {
        id: 'diff',
        nameKey: 'tools.diff.name',
        descKey: 'tools.diff.desc',
        category: 'dev',
        icon: 'compare',
        path: '/tools/diff',
    },
    {
        id: 'uuid',
        nameKey: 'tools.uuid.name',
        descKey: 'tools.uuid.desc',
        category: 'dev',
        icon: 'fingerprint',
        path: '/tools/uuid',
    },
    {
        id: 'pomodoro',
        nameKey: 'tools.pomodoro.name',
        descKey: 'tools.pomodoro.desc',
        category: 'productivity',
        icon: 'timer',
        path: '/tools/pomodoro',
    },
    {
        id: 'notepad',
        nameKey: 'tools.notepad.name',
        descKey: 'tools.notepad.desc',
        category: 'productivity',
        icon: 'edit_note',
        path: '/tools/notepad',
    },
    {
        id: 'markdown',
        nameKey: 'tools.markdown.name',
        descKey: 'tools.markdown.desc',
        category: 'productivity',
        icon: 'description',
        path: '/tools/markdown',
    },
];

export const categories = [
    { key: 'basic' as const, labelKey: 'nav.basic', icon: 'apps' },
    { key: 'text' as const, labelKey: 'nav.text', icon: 'text_fields' },
    { key: 'color' as const, labelKey: 'nav.color', icon: 'palette' },
    { key: 'dev' as const, labelKey: 'nav.dev', icon: 'code' },
    { key: 'productivity' as const, labelKey: 'nav.productivity', icon: 'task_alt' },
];
