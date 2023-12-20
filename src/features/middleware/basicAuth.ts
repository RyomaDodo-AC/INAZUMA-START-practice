/**
 * BASIC認証を設定
 * @see https://blog.kimizuka.org/entry/2023/04/07/190722
 * @todo テストコード作る（new Responseのモックが上手く作れず断念）
 */
import { NextRequest, NextResponse } from 'next/server'
import { BASIC_USER_NAME, BASIC_PASSWORD } from '@/config'

export const basicAuth = (req: NextRequest) => {
  // BASIC認証のID・PWが未設定の場合はスルーさせる
  if ((BASIC_USER_NAME === undefined || BASIC_USER_NAME === '') && (BASIC_PASSWORD === undefined || BASIC_PASSWORD === '')) {
    return NextResponse.next()
  }

  // /api以下の場合はスルーさせる
  if (req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const auth = basicAuth.split(' ')[1]
    const [user, password] = atob(auth).split(':')

    if (user === BASIC_USER_NAME && password === BASIC_PASSWORD) {
      return NextResponse.next()
    }
  }

  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}
