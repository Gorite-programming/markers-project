import { useTranslations } from 'next-intl';
import { tools, categories } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import styles from './page.module.css';

export default function HomePage() {
    const t = useTranslations();

    return (
        <div className={styles.home}>
            {categories.map((cat) => {
                const catTools = tools.filter((tool) => tool.category === cat.key);
                if (catTools.length === 0) return null;
                return (
                    <section key={cat.key} className={styles.section}>
                        <h2 className={styles.sectionTitle}>{t(cat.labelKey)}</h2>
                        <div className={styles.grid}>
                            {catTools.map((tool) => (
                                <ToolCard key={tool.id} tool={tool} />
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
