import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  // Only handle root path for subdomain routing
  // Let all other paths pass through (API routes, static files, etc.)
  if (pathname !== '/') {
    return NextResponse.next()
  }

  // Extract subdomain
  // Handles: christmas.gracewoodlands.com, welcome.gracewoodlands.com
  // Also handles local development: christmas.localhost:3000
  let subdomain: string | null = null

  // Production: *.gracewoodlands.com
  if (hostname.includes('gracewoodlands.com')) {
    const parts = hostname.split('.')
    if (parts.length >= 3 && parts[0] !== 'www') {
      subdomain = parts[0]
    }
  }
  // Local development: *.localhost:3000
  else if (hostname.includes('localhost')) {
    const parts = hostname.split('.')
    if (parts.length >= 2 && parts[0] !== 'localhost') {
      subdomain = parts[0]
    }
  }

  // Route based on subdomain
  if (subdomain === 'christmas') {
    // Rewrite to Christmas page
    const url = request.nextUrl.clone()
    url.pathname = '/christmas'
    return NextResponse.rewrite(url)
  }

  // welcome subdomain or no subdomain = home page (default behavior)
  // Just pass through to normal routing
  return NextResponse.next()
}

export const config = {
  // Only run middleware on these paths
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webm|mp4)$).*)',
  ],
}

