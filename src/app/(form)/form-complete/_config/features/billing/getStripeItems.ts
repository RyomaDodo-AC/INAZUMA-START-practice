/**
 * StripeIdsからStripe情報を付与したオブジェクトを返す関数
 * @param {createBillingAmountProps} props - props
 * @returns {getStripeItemsReturn} - getStripeItemsReturn
 */
import type { stripeId } from '../createStripeIds'
import { StripeContextProviderMethods } from '@/features/context'
import { createBillingAmountProps } from './createBillingAmount'

/**
 * StripeIdsからStripe情報を付与したオブジェクトを返す関数の返り値
 */
export type getStripeItemsReturn = {
  /**
   * 商品名
   */
  name: stripeId['name']
  /**
   * 料金情報
   */
  prices: ReturnType<StripeContextProviderMethods['getPrice']>[]
}[]

/**
 * StripeIdsからStripe情報を付与したオブジェクトを返す関数
 * @param {createBillingAmountProps} props - props
 * @returns {getStripeItemsReturn} - getStripeItemsReturn
 */
export const getStripeItems = ({ stripeIds, useStripeContext }: createBillingAmountProps): getStripeItemsReturn => {
  // stripeIdsを配列に変換
  const ids = Object.values(stripeIds)

  // stripeItemsを初期化
  const stripeItems: getStripeItemsReturn = []

  ids.map((stripeIds) => {
    // stripeIdが存在しない場合は何も返さない
    if (!stripeIds) return

    stripeIds.map((stripeId) => {
      // stripeIdが存在しない場合は何も返さない
      if (!stripeId) return

      // stripeIdからpriceを取得
      const prices: getStripeItemsReturn[0]['prices'] = []
      const price = stripeId.priceId ? useStripeContext.getPrice(stripeId.priceId) : undefined

      // priceにnext_price_idが存在する場合は再帰的にpriceを取得してpricesに追加
      const getNestPrice = (price: ReturnType<StripeContextProviderMethods['getPrice']>) => {
        if (!price) return

        prices.push(price)

        useStripeContext.getNextPrice(price.id) && getNestPrice(useStripeContext.getNextPrice(price.id))
      }

      price && getNestPrice(price)

      // stripeItemsにstripeIdとpriceを追加
      stripeItems.push({
        name: stripeId.name,
        prices,
      })
    })
  })

  return stripeItems
}
