import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware({
    ...routing,
    // 検索エンジンのクローラーへの干渉を防ぐため、リダイレクトをオフにする
    localeDetection: false
});

export const config = {
    // sitemap.xml, robots.txt, favicon.ico および静的ファイルを完全に除外
    matcher: ['/((?!api|_next|_vercel|[\\w-]+\\.\\w+).*)']
};
