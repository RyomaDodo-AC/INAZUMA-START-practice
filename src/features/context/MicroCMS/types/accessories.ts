/**
 * 付属品APIスキーマ
 * @see https://inazuma-start.microcms.io/apis/accessories
 */
import type MicroCMS from 'microcms-js-sdk'
import type { microCMSProductsType } from './products'
import type { microCMSPricesType } from './prices'

export type microCMSAccessoriesType = {
  /**
   * 付属品名
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
   * 注釈
   */
  notes?: {
    /**
     * 注釈数値化
     */
    noteDecimal?: boolean
    /**
     * 注釈文
     */
    noteList?: { list: string }[]
  }
} & MicroCMS.MicroCMSContentId
