/**
 * GoogleAnalyticsのクライアントIDを取得する
 * @returns {string | undefined} クライアントID
 * @todo リクエストbodyに値を入れて繋げなくても next/headers でcookieを取得できるようにする
 */
import { cookies } from 'next/headers'

export const getGaClientId = (client_id: string = '') => {
  const gaCookie = cookies().get('_ga')
  if (gaCookie || client_id) {
    let clientID = client_id

    if (gaCookie) {
      // 値を文字列に変換
      clientID = gaCookie.value || ''
    }

    // 2つ目のドット以降の文字を返す
    const index: number = clientID.indexOf('.', clientID.indexOf('.') + 1) + 1
    const result: string = clientID.substring(index)
    return result
  }
  return undefined
}
