import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Desteklenen diller
const locales = ['tr', 'en', 'it']

function getLocale(request: NextRequest) {
  // URL'den dili al
  const pathname = request.nextUrl.pathname
  const pathnameLocale = locales.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameLocale) return pathnameLocale

  // Tarayıcı dilini al
  const acceptedLanguage = request.headers.get('accept-language')
  if (acceptedLanguage) {
    const browserLocale = acceptedLanguage.split(',')[0].split('-')[0]
    if (locales.includes(browserLocale)) {
      return browserLocale
    }
  }

  // Varsayılan dil
  return 'tr'
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Eğer URL'de dil yoksa, tarayıcı diline yönlendir
  if (!locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)) {
    const locale = getLocale(request)
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    return NextResponse.redirect(newUrl)
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 