import { MetadataRoute } from 'next';
import { tools } from '@/lib/tools';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://markers-project.vercel.app';
const locales = ['en', 'ja'];

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        ...tools.map((tool) => tool.path),
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    locales.forEach((locale) => {
        routes.forEach((route) => {
            sitemapEntries.push({
                url: `${BASE_URL}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: route === '' ? 1.0 : 0.8,
                alternates: {
                    languages: {
                        en: `${BASE_URL}/en${route}`,
                        ja: `${BASE_URL}/ja${route}`,
                    },
                },
            });
        });
    });

    return sitemapEntries;
}
