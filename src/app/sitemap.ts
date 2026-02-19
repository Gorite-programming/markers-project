import { MetadataRoute } from 'next';
import { tools } from '@/lib/tools';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://markers-project.vercel.app';

// ← これを追加！
export const contentType = 'application/xml';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        ...tools.map((tool) => tool.path),
    ];

    return routes.map((route) => ({
        url: `${BASE_URL}/ja${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
            languages: {
                en: `${BASE_URL}/en${route}`,
                ja: `${BASE_URL}/ja${route}`,
            },
        },
    }));
}
