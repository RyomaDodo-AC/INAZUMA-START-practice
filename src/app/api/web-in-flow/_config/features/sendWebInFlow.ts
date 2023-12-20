/**
 * WebInFlowにデータを送信する関数
 */
import { webInFlowDefaultObjectType } from '@/app/api/web-in-flow/_config'
import { getWebInFlowEndpoint, getWebInFlowHeaders } from './headers'

/**
 * 引数の型
 */
export interface sendWebInFlowType {
  sender: webInFlowDefaultObjectType['sender']
  data: {
    [key: string]: string | undefined
  } & webInFlowDefaultObjectType['data']
}

export const sendWebInFlow = async (data: sendWebInFlowType) => {
  if (!data) {
    throw new Error('送信データがありません')
  }
  // JSONに変換
  const jsonData = JSON.stringify(data)

  // WebInFlowにPOST送信
  const response = await fetch(getWebInFlowEndpoint(), {
    method: 'POST',
    headers: getWebInFlowHeaders(),
    body: jsonData,
  })

  // レスポンスを取得
  const responseData = await response.json()

  // レスポンスを返す
  return responseData
}
