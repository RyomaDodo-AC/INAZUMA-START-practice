/**
 * microCMSからリストAPIを取得する
 * @see https://github.com/microcmsio/microcms-js-sdk
 */
import { NextResponse } from 'next/server'
import { client } from '../_config'
import { GetListRequest } from 'microcms-js-sdk'

export const POST = async (request: Request) => {
  // リクエストボディを取得
  const req: GetListRequest = await request.json().catch(() => {
    return undefined
  })

  // リクエストボディがなければエラー
  if (!req) {
    return NextResponse.json({ error: 'request body is not defined' }, { status: 500 })
  }

  if (!req.endpoint) {
    return NextResponse.json({ error: 'endpoint is not defined' }, { status: 500 })
  }

  // List APIを取得
  const list = await client
    .getList({ ...req })
    .then((list) => {
      return NextResponse.json(list, { status: 200 })
    })
    .catch((error) => {
      return NextResponse.json({ error: error.message }, { status: 500 })
    })

  return list
}
