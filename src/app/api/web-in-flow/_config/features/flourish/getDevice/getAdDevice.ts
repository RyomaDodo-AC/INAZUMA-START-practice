/**
 * ルートパラメータから判別
 * @param {searchParamsContextType['values']} searchParams クエリパラメータ
 * @returns {getDeviceType | undefined} 閲覧デバイスの種類
 */
import { routeType } from '../routeType'
import { getDeviceType } from './'
import { searchParamsContextType } from '@/features/context'

export const getAdDevice = (searchParams?: searchParamsContextType['values']): getDeviceType | undefined => {
  if (!searchParams) return undefined

  // addevice判定リスト
  const deviceList = {
    pc: ['DESKTOP', 'TABLET', 't', 'c'],
    sp: ['SMARTPHONE', 'WAP_MOBILE', 'm'],
  }

  const addevice = searchParams[routeType + '_addevice']
  if (!addevice || typeof addevice !== 'string') return undefined

  // addeviceの値がdeviceListに含まれていればpcかspを返す
  return deviceList.pc.includes(addevice) ? 'pc' : deviceList.sp.includes(addevice) ? 'sp' : undefined
}
