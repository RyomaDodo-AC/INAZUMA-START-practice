/**
 * User Agent Client Hintsを取得する
 * @returns {getDeviceType | undefined} 閲覧デバイスの種類
 * @see https://web.dev/user-agent-client-hints/
 * @see https://zenn.dev/kata_n/articles/c9da7a367847f8
 */
import { headers } from 'next/headers'
import { getDeviceType } from './'

export const getUach = (): getDeviceType | undefined => {
  const headersList = headers()
  const uaChMobile = headersList.get('sec-ch-ua-mobile')
  if (uaChMobile === null || uaChMobile === undefined) return undefined

  if (uaChMobile) {
    // PC・タブレットの場合はtrue（実機じゃないと検証できない？）
    return 'pc'
  } else {
    // スマホの場合はfalse
    return 'sp'
  }
}
