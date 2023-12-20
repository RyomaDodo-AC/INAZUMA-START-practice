/**
 * ClientIDを返すAPI
 */
import { NextResponse, NextRequest } from 'next/server'
import { getGaClientId } from '../_config'

/**
 * ClientIDを返す関数
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

  // ClientIDを取得
  const clientID = getGaClientId(req.client_id)

  return NextResponse.json({ clientID }, { status: 200 })
}
