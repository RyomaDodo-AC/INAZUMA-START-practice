/**
 * 端末補償APIスキーマ
 * @see https://inazuma-start.microcms.io/apis/guarantees
 */
import type MicroCMS from 'microcms-js-sdk'
import type { microCMSProductsType } from './products'
import type { microCMSPricesType } from './prices'

export type microCMSGuaranteesType = {
  /**
   * 端末補償名
   */
  name: string
  /**
   * Stripe
   */
  stripe?: {
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
