/**
 * 支払いシミュレーションを計算するフック
 */
'use client'
import Stripe from 'stripe'
import { priceMeta } from '../types'
import { useStripePrices } from './useStripePrices'

/**
 * 支払いシミュレーションを計算するフックの戻り値
 */
// 引数の型を定義する
export type stripePaymentSimulationIdsType = [
  {
    name: string
    priceId: Stripe.Price['id']
  },
]

// 戻り値の基本型を定義する
export type stripePaymentSimulationObjectType = {
  /**
   * キーは、start-endの形式かonetime
   */
  [key: string]: {
    /**
     * 商品情報
     */
    data: [
      {
        /**
         * 商品名
         */
        name: string
        /**
         * 金額
         */
        amount: number
        /**
         * クーポンID
         */
        couponId?: string
      },
    ]
    /**
     * 期間継続の場合はオブジェクト、一回払いの場合は文字列onetime
     */
    period:
      | {
          /**
           * 開始日時
           */
          start: string
          /**
           * 終了日時
           */
          end: string
          /**
           * 単位
           */
          interval: string
        }
      | 'onetime'
  }
}

// 戻り値の型
export type stripePaymentSimulationReturnType = {
  /**
   * 初期費用のシミュレーションを計算する関数
   */
  getInitialPayment: (priceId?: stripePaymentSimulationIdsType) => (stripePaymentSimulationObjectType | undefined)[]
  /**
   * 継続費用のシミュレーションを計算する関数
   */
  getRecurringPayment: (priceId?: stripePaymentSimulationIdsType) => (stripePaymentSimulationObjectType | undefined)[]
  /**
   * クーポンのシミュレーションを計算する関数
   */
  getCouponPayment: (priceId?: stripePaymentSimulationIdsType) => (stripePaymentSimulationObjectType | undefined)[]
}
