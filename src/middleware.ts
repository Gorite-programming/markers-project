import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false
})

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 🔥 sitemap / robots / 静的ファイルは完全スルー
  if (
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_vercel') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // それ以外は next-intl に渡す
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|sitemap.xml|robots.txt|.*\\..*).*)'
  ]
}
