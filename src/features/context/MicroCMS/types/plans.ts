/**
 * 料金プランAPIスキーマ
 * @see https://inazuma-start.microcms.io/apis/plan
 */
import type MicroCMS from 'microcms-js-sdk'
import type { microCMSProductsType } from './products'
import type { microCMSPricesType } from './prices'
import type { microCMSTerminalsType } from './terminals'

export type microCMSPlansType = {
  /**
   * プラン名
   */
  name: string
  /**
   * Stripe
   */
  stripe: {
    /**
     * Stripe料金
     */
    prices: microCMSPricesType
    /**
     * Stripe商品
     */
    products: microCMSProductsType
  }
  /**
   * 表示コンテンツ
   */
  contents?: React.ReactNode
  /**
   * リボン
   */
  ribbon?: {
    /**
     * ラベル
     */
    label?: string
    /**
     * おすすめ
     */
    recommend: boolean
  }
  /**
   * 料金説明内コンテンツ
   */
  planContents?: React.ReactNode
  /**
   * 対象端末
   */
  terminals: [
    {
      /**
       * 端末名
       */
      name: microCMSTerminalsType['name']
      /**
       * 表示コンテンツ
       */
      contents?: microCMSTerminalsType['contents']
      /**
       * リボン
       */
      ribbon?: microCMSTerminalsType['ribbon']
      /**
       * Stripeデフォルト商品
       */
      stripeProducts: MicroCMS.MicroCMSContentId
      /**
       * 端末情報
       */
      terminals: [
        {
          /**
           * 表示色名
           */
          colorName?: microCMSTerminalsType['terminals'][0]['colorName']
          /**
           * 表示カラーコード
           */
          colorCode?: microCMSTerminalsType['terminals'][0]['colorCode']
          /**
           * 支払い方法
           */
          recurring: microCMSTerminalsType['terminals'][0]['recurring']
          /**
           * Stripe料金
           */
          stripePrices: MicroCMS.MicroCMSContentId
          /**
           * Stripe商品
           */
          stripeProducts: MicroCMS.MicroCMSContentId
        },
      ]
      /**
       * 付属品
       */
      accessories?: [{} & MicroCMS.MicroCMSContentId]
    } & MicroCMS.MicroCMSContentId,
  ]
} & MicroCMS.MicroCMSContentId
