/**
 * デバイス判定をするAPI
 */
import { NextResponse, NextRequest } from 'next/server'
import { getDevice } from '../_config'

/**
 * デバイス判定をする関数
 */
export const POST = async (request: NextRequest) => {
  // リクエストボディを取得
  const req = await request.json().catch(() => {
    return undefined
  })

  // リクエストボディがなければエラー
  if (!req) {
    return NextResponse.json({ error: 'request body is not defined' }, { status: 500 })
  }

  // デバイスを判定
  const device = getDevice(req.searchParams)

  return NextResponse.json({ device }, { status: 200 })
}
