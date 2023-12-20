/**
 * マスタに紐づく料金IDを取得する関数
 * @param {microCMSProductsType} obj - 料金プランマスタの値
 * @return {string | undefined} - 料金ID
 */
import { DEPLOY_ENV } from '@/config'
import { microCMSProductsType } from '../types'

export const getProductId = (obj: microCMSProductsType | undefined): string | undefined => {
  // 料金プランマスタの値がない場合、undefinedを返す
  if (!obj) return undefined

  // 料金プランマスタの値がある場合、DEPLOY_ENVによって返す値を変える
  return DEPLOY_ENV === 'prod' ? obj.products_id_prod : obj.products_id_dev
}
