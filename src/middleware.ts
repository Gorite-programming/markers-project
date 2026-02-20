// src/middleware.ts
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false
})

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // sitemap・robots・静的ファイルは完全スキップ
  if (
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return  // ← NextResponse.next()じゃなくてreturnだけでOK
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/(.*?)']  // ← 全パスにマッチさせて、上のif文で制御する
}