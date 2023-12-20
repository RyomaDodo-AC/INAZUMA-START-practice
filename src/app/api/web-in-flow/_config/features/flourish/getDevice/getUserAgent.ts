/**
 * デバイスのユーザーエージェントを取得する
 * @memo PCの判別はできない
 * @see https://faisalman.github.io/ua-parser-js-docs/v2/api/ua-parser-js/get-device.html#type-string
 * @returns {getDeviceType | undefined} 閲覧デバイスの種類
 */
import { UAParser } from 'ua-parser-js'
import { headers } from 'next/headers'
import { getDeviceType } from './'

export const getUserAgent = (): getDeviceType | undefined => {
  const headersList = headers()
  const ua = headersList.get('user-agent')
  if (ua === null || ua === undefined) return undefined

  const { device } = UAParser(ua)
  const deviceType = device.type
  switch (deviceType) {
    case 'mobile':
      return 'sp'
    case 'tablet':
    // return 'tablet'
    case 'smarttv':
    // return 'tv'
    case 'console':
    // return 'game'
    case 'wearable':
    // return 'wearable'
    case 'embedded':
    // return 'embedded'
    default:
      return undefined
  }
}
