import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
// import { routesPermission } from './routesPermission'

export async function middleware(request: NextRequest, _event: NextFetchEvent) {
  const hasAccessToken = request.cookies.has('accessToken')
  const pathname = request.nextUrl.pathname
  const isAuthRoutes = pathname.startsWith('/auth')
  const isPublic = ['/accept-invitation', '/access-denied'].includes(pathname)

  console.log(`MIDDLEWARE`, {
    pathname,
    isAuthRoutes,
    isPublic,
    hasAccessToken
  })

  if (!hasAccessToken && !isAuthRoutes && !isPublic) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // TODO create a check for auth routes
  if (hasAccessToken && isAuthRoutes) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Roles only exist based on identity change and work with same time as accessToken, 15 minutes
  // in case we are working on local or don't have roles for some reason we will skip that check
  // const rolesCookie = request.cookies.get('roles')?.value
  // const byPassCheckingRoles = !rolesCookie
  // if (byPassCheckingRoles) {
  //   return NextResponse.next()
  // }
  // const roles = JSON.parse(rolesCookie) as string[]

  // const route = routesPermission.find((route) => route.regExp?.test(request.nextUrl.pathname))

  // const noPermissionsRequired = !!route && !route?.roles.length

  // If route is not mapped inside routesPermission will be undefined
  // that make request redirect to /access-denied
  // const accessAllowed = noPermissionsRequired ? true : route?.roles.some((role) => roles.includes(role))

  // console.log(`MIDDLEWARE ${JSON.stringify({ accessAllowed, noPermissionsRequired, roles })}`)

  // if (accessAllowed) {
  //   return NextResponse.next()
  // } else {
  //   return NextResponse.redirect(new URL('/access-denied', request.url))
  // }
}

export const config = {
  matcher: [
    '/',
    '/auth/(.*)',
    '/management',
    '/management/(.*)',
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images
     * - access-denied
     * - forgot-password
     * - login
     * - logout
     * - mfa / mfa-pass-code
     * - reset-password
     */
    // '/((?!api|_next/static|_next/image|favicon.ico|images|access-denied|forgot-password|login|logout|mfa|reset-password).*)',
  ],
}