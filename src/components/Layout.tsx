'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { tools, categories } from '@/lib/tools';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './Layout.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const t = useTranslations();
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);

    const locale = pathname.split('/')[1] || 'ja';

    const filteredTools = searchQuery.trim()
        ? tools.filter(
            (tool) =>
                t(tool.nameKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
                t(tool.descKey).toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const handleSearchSelect = useCallback(
        (path: string) => {
            setSearchQuery('');
            setSearchOpen(false);
            router.push(`/${locale}${path}`);
        },
        [locale, router]
    );

    const closeSidebar = useCallback(() => setSidebarOpen(false), []);

    return (
        <div className={styles.layout}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <button
                        className={styles.menuButton}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-rounded">
                            {sidebarOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                    <Link href={`/${locale}`} className={styles.logo}>
                        {t('siteName')}
                    </Link>
                </div>

                <div className={styles.headerCenter}>
                    <div className={styles.searchWrapper}>
                        <span className={`material-symbols-rounded ${styles.searchIcon}`}>search</span>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder={t('nav.search')}
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setSearchOpen(e.target.value.length > 0);
                            }}
                            onFocus={() => searchQuery && setSearchOpen(true)}
                            onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                        />
                        {searchOpen && filteredTools.length > 0 && (
                            <div className={styles.searchDropdown}>
                                {filteredTools.map((tool) => (
                                    <button
                                        key={tool.id}
                                        className={styles.searchItem}
                                        onMouseDown={() => handleSearchSelect(tool.path)}
                                    >
                                        <span className="material-symbols-rounded">{tool.icon}</span>
                                        <span>{t(tool.nameKey)}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.headerRight}>
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                </div>
            </header>

            {/* Sidebar overlay */}
            {sidebarOpen && (
                <div className={styles.overlay} onClick={closeSidebar} />
            )}

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
                <nav className={styles.nav}>
                    <Link
                        href={`/${locale}`}
                        className={`${styles.navItem} ${pathname === `/${locale}` ? styles.navActive : ''}`}
                        onClick={closeSidebar}
                    >
                        <span className="material-symbols-rounded">home</span>
                        <span>{t('nav.home')}</span>
                    </Link>

                    {categories.map((cat) => {
                        const catTools = tools.filter((tool) => tool.category === cat.key);
                        return (
                            <div key={cat.key} className={styles.navGroup}>
                                <div className={styles.navLabel}>
                                    {t(cat.labelKey)}
                                </div>
                                {catTools.map((tool) => (
                                    <Link
                                        key={tool.id}
                                        href={`/${locale}${tool.path}`}
                                        className={`${styles.navItem} ${pathname === `/${locale}${tool.path}` ? styles.navActive : ''
                                            }`}
                                        onClick={closeSidebar}
                                    >
                                        <span className="material-symbols-rounded">{tool.icon}</span>
                                        <span>{t(tool.nameKey)}</span>
                                    </Link>
                                ))}
                            </div>
                        );
                    })}
                </nav>
            </aside>

            {/* Main */}
            <main className={styles.main}>
                <div className={styles.content}>{children}</div>
            </main>
        </div>
    );
}
