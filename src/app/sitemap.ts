import { MetadataRoute } from 'next';
import { tools } from '@/lib/tools';

const BASE_URL = 'https://markers-project.vercel.app';
const locales = ['en', 'ja'];

export const revalidate = 3600; // 1時間ごとに再生成

export default function sitemap(): MetadataRoute.Sitemap {
    const sitemapEntries: MetadataRoute.Sitemap = [];

    // トップページ (ja/en)
    locales.forEach((locale) => {
        sitemapEntries.push({
            url: `${BASE_URL}/${locale}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        });
    });

    // 全ツールの個別ページ (ja/en)
    tools.forEach((tool) => {
        locales.forEach((locale) => {
            sitemapEntries.push({
                url: `${BASE_URL}/${locale}${tool.path}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
            });
        });
    });

    return sitemapEntries;
}