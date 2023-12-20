/**
 * オプションAPIスキーマ
 * @see https://inazuma-start.microcms.io/apis/options
 */
import type MicroCMS from 'microcms-js-sdk'
import type { microCMSProductsType } from './products'
import type { microCMSPricesType } from './prices'

export type microCMSOptionsType = {
  /**
   * オプション名
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
} & MicroCMS.MicroCMSContentId
