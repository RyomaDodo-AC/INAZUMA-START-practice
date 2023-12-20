/**
 * 端末APIスキーマ
 * @see https://inazuma-start.microcms.io/apis/terminal
 */
import type MicroCMS from 'microcms-js-sdk'
import type { microCMSProductsType } from './products'
import type { microCMSPricesType } from './prices'
import type { microCMSAccessoriesType } from './accessories'

export type microCMSTerminalsType = {
  /**
   * 端末名
   */
  name: string
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
   * Stripeデフォルト商品
   */
  stripeProducts: microCMSProductsType
  /**
   * 端末情報
   */
  terminals: [
    {
      /**
       * 表示色名
       */
      colorName?: string
      /**
       * 表示カラーコード
       */
      colorCode?: `#${string}` | 'gold' | 'silver' | 'bronze'
      /**
       * 支払い方法
       */
      recurring: ('一括払い' | '分割払い（36回）')[]
      /**
       * Stripe料金
       */
      stripePrices: microCMSPricesType
      /**
       * Stripe商品
       */
      stripeProducts: microCMSProductsType
    },
  ]
  /**
   * 付属品
   */
  accessories?: [
    {
      /**
       * 付属品名
       */
      name: microCMSAccessoriesType['name']
      /**
       * Stripe
       */
      stripe?: {
        /**
         * Stripe料金
         */
        prices?: MicroCMS.MicroCMSContentId['id']
        /**
         * Stripe商品
         */
        products?: MicroCMS.MicroCMSContentId['id']
      }
      /**
       * 表示コンテンツ
       */
      contents?: microCMSAccessoriesType['contents']
    } & MicroCMS.MicroCMSContentId,
  ]
} & MicroCMS.MicroCMSContentId
