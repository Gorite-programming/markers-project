import { tools } from '@/lib/tools';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://markers-project.vercel.app';

export async function GET() {
    const routes = [
        '',
        ...tools.map((tool) => tool.path),
    ];

    const urls = routes.map((route) => `
    <url>
        <loc>${BASE_URL}/ja${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${route === '' ? '1.0' : '0.8'}</priority>
        <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en${route}"/>
        <xhtml:link rel="alternate" hreflang="ja" href="${BASE_URL}/ja${route}"/>
    </url>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}