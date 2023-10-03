import { NextRequest , NextResponse } from 'next/server'
import { createI18nMiddleware } from 'next-international/middleware'

const isPasswordEnabled = !!process.env.PASSWORD_PROTECT

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'de'],
  defaultLocale: 'de'
})

export async function middleware(request) {

  const isLoggedIn = request.cookies.has('login');
  const isPathPasswordProtect = request.nextUrl.pathname.includes("/password")
  if(isPasswordEnabled && !isLoggedIn && !isPathPasswordProtect){

    return NextResponse.redirect(new URL("/password", request.url))
  }
  return I18nMiddleware(request)
}
 
export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}