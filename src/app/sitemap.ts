import { MetadataRoute } from 'next';
import { tools } from '@/lib/tools';

// 本番環境のURLを設定（Vercelの自動環境変数や固定値を検討）
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://markers-project.vercel.app';
const locales = ['en', 'ja'];

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        ...tools.map((tool) => tool.path),
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    for (const locale of locales) {
        for (const route of routes) {
            sitemapEntries.push({
                url: `${BASE_URL}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: route === '' ? 1.0 : 0.8,
            });
        }
    }

    return sitemapEntries;
}
