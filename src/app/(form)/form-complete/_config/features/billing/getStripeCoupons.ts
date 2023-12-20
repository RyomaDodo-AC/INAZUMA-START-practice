/**
 * 商品情報からStripeのクーポン情報を取得する関数
 */
import { StripeContextProviderMethods } from '@/features/context'
import type { getStripeItemsReturn } from './getStripeItems'

/**
 * 商品情報からStripeのクーポン情報を取得する関数の返り値
 */
export type getStripeCouponsReturn = ReturnType<StripeContextProviderMethods['getCoupon']>[]

/**
 * 商品情報からStripeのクーポン情報を取得する関数
 * @param {getStripeCouponsProps} props - props
 * @returns {getStripeCouponsReturn} - getStripeCouponsReturn
 */
export const getStripeCoupons = ({ items, useStripeContext }: { items: getStripeItemsReturn; useStripeContext: StripeContextProviderMethods }): getStripeCouponsReturn => {
  // クーポン情報を初期化
  const coupons: getStripeCouponsReturn = []

  // itemsからクーポン情報を取得
  items.map((item) => {
    item.prices.map((price) => {
      // priceにmetadataが存在する場合はクーポン情報を取得
      if (price?.metadata?.coupon_id && price?.metadata?.coupon_id !== '0') {
        // クーポンが適用条件を満たしているかを判定
        const isCoupon = isCouponValid({ coupon: useStripeContext.getCoupon(price.metadata.coupon_id), items })

        if (!isCoupon) return
        coupons.push(useStripeContext.getCoupon(price.metadata.coupon_id))
      }
    })
  })

  // couponsからundefinedと重複を削除
  return coupons.filter((coupon, index, self) => coupon && self.findIndex((c) => c?.id === coupon?.id) === index)
}

/**
 * クーポンの適用条件を満たしているかを判定する
 * @param {getStripeCouponsProps} props - props
 * @returns {boolean} - boolean
 */
export const isCouponValid = ({ coupon, items }: { coupon: getStripeCouponsReturn[0]; items: getStripeItemsReturn }): boolean => {
  // クーポンが存在しない場合はfalseを返す
  if (!coupon) return false

  // クーポンの適用条件が存在しない場合はtrueを返す
  if (!coupon.metadata) return true

  // カンマ区切りになっているクーポンの適用条件を配列に変換
  const couponMetadata = Object.entries(coupon.metadata).map(([key, value]) => {
    // valueが'0'の場合はtrueを返す
    if (value === '0') return { key, value: true }
    return { key, value: value?.split(',') }
  })

  // クーポンの適用条件を満たしているかを判定
  return couponMetadata.every((metadata) => {
    // metadata.valueがtrueの場合はtrueを返す
    if (metadata.value === true) return true

    // metadata.valueが配列の場合はitemsからmetadata.keyに該当するものが存在するかを判定
    if (Array.isArray(metadata.value)) {
      return metadata.value.some((value) => {
        // items配列内のprices配列内のpriceオブジェクトのidとmetadata.valueが一致するものが存在するかを判定
        return items.some((item) => {
          return item.prices.some((price) => {
            return price?.id === value
          })
        })
      })
    }

    // metadata.valueが配列でもtrueでもない場合はfalseを返す
    return false
  })
}
