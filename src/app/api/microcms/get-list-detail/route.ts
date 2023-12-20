/**
 * microCMSからのリスト詳細APIを取得する
 * @see https://github.com/microcmsio/microcms-js-sdk
 */
import { NextResponse } from 'next/server'
import { client } from '../_config'
import { GetListDetailRequest } from 'microcms-js-sdk'

export const POST = async (request: Request) => {
  // リクエストボディを取得
  const req: GetListDetailRequest = await request.json().catch(() => {
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

  // contentIdがなければエラー
  if (!req.contentId) {
    return NextResponse.json({ error: 'contentId is not defined' }, { status: 500 })
  }

  // List Detail APIを取得
  const listDetail = await client
    .getListDetail({ ...req })
    .then((listDetail) => {
      return NextResponse.json(listDetail, { status: 200 })
    })
    .catch((error) => {
      return NextResponse.json({ error: error.message }, { status: 500 })
    })

  return listDetail
}
