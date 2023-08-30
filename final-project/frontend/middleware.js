import { NextResponse } from 'next/server'
import { baseURL } from './lib/fetch'

export async function middleware(request) {
  // const res = await fetch(baseURL + '/users/current_user/', {
  //   cache: 'no-store',
  // })
  // const user = await res.json()
  // const inAuthGroup =
  //   request.nextUrl.pathname.startsWith('/auth') ||
  //   request.nextUrl.pathname === '/'
  // console.log(user, inAuthGroup)
  // if (!user.id && !inAuthGroup) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // } else if (user.id && inAuthGroup) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url))
  // }
  // return NextResponse.next()
}

export const config = {
  matcher: '/dashboard',
}
