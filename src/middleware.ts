import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // sitemap.xml と robots.txt、および静的ファイルを対象外にする
    matcher: ['/((?!api|_next|_vercel|sitemap\\.xml|robots\\.txt|[\\w-]+\\.\\w+).*)']
};
