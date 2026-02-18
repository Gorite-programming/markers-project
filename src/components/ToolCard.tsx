'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ToolInfo } from '@/lib/tools';
import styles from './ToolCard.module.css';

interface Props {
    tool: ToolInfo;
}

export default function ToolCard({ tool }: Props) {
    const t = useTranslations();
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'ja';

    return (
        <Link
            href={`/${locale}${tool.path}`}
            className={styles.card}
        >
            <div className={styles.iconWrap}>
                <span className="material-symbols-rounded">{tool.icon}</span>
            </div>
            <div className={styles.info}>
                <h3 className={styles.name}>{t(tool.nameKey)}</h3>
                <p className={styles.desc}>{t(tool.descKey)}</p>
            </div>
            <span className={`material-symbols-rounded ${styles.arrow}`}>arrow_forward</span>
        </Link>
    );
}
