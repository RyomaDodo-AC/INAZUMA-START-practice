/**
 * 閲覧デバイスを判定する
 */
import { getAdDevice } from './getAdDevice'
import { getUach } from './getUach'
import { getUserAgent } from './getUserAgent'
import { searchParamsContextType } from '@/features/context'

/**
 * レスポンスの型定義
 */
export type getDeviceType = 'pc' | 'sp' | 'tablet' | '不明'

/**
 * 閲覧デバイスを判定する関数
 */
export const getDevice = ({ searchParams }: { searchParams?: searchParamsContextType['values'] }): getDeviceType => {
  // クエリパラメータから判別
  const adDevice = getAdDevice(searchParams)
  if (adDevice) return adDevice

  // UA-CHから判別
  const uach = getUach()
  if (uach) return uach

  // UAから判別
  const userAgent = getUserAgent()
  if (userAgent) return userAgent

  return '不明'
}
