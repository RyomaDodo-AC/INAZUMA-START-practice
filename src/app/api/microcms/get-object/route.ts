/**
 * microCMSからオブジェクトAPIを取得する
 * @see https://github.com/microcmsio/microcms-js-sdk
 */
import { NextResponse } from 'next/server'
import { client } from '../_config'
import { GetObjectRequest } from 'microcms-js-sdk'

export const POST = async (request: Request) => {
  // リクエストボディを取得
  const req: GetObjectRequest = await request.json().catch(() => {
    return undefined
  })

  // リクエストボディがなければエラー
  if (!req) {
    return NextResponse.json({ error: 'request body is not defined' }, { status: 500 })
  }

  // endpointがなければエラー
  if (!req.endpoint) {
    return NextResponse.json({ error: 'endpoint is not defined' }, { status: 500 })
  }

  // Object APIを取得
  const object = await client
    .getObject({ ...req })
    .then((object) => {
      return NextResponse.json(object, { status: 200 })
    })
    .catch((error) => {
      return NextResponse.json({ error: error.message }, { status: 500 })
    })

  return object
}
