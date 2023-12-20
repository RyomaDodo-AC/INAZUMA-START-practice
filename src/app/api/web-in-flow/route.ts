/**
 * WebInFlow にデータを送信するAPI
 */
import { NextResponse, NextRequest } from 'next/server'
import { sendWebInFlow, sendWebInFlowType, getSendData, getSendDataType } from './_config'

/**
 * リクエストの型
 * @param {object} body リクエストボディ
 * @param {object} body.data 送信データ
 * @param {string} body.data.formPath フォームのパス名
 * @param {string} body.data.formName フォーム名
 * @param {object} body.data.formValues フォームの値
 * @param {object} body.data.mergeObject カスタムで追加したいデータ
 * @param {object} body.data.clientID クライアントID
 * @param {object} body.data.acAsp アフィリエイトタグ識別子
 * @param {object} body.data.searchParams クエリパラメータ
 * @returns {object} レスポンス
 */
export interface requestType {
  body: {
    data: sendWebInFlowType['data']
  } & getSendDataType
}

/**
 * WebInFlow にデータを送信する関数
 * @param {requestType} req リクエスト
 * @returns {NextResponse} レスポンス
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

  // 送信データを生成
  const sendData = getSendData(req)

  // WebInFlow に送信
  const response = await sendWebInFlow(sendData)

  return NextResponse.json({ message: response }, { status: 200 })
}
