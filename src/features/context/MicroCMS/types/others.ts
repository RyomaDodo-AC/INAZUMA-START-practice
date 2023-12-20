/**
 * その他APIスキーマ
 * @see https://inazuma-start.microcms.io/apis/others
 */
import type MicroCMS from 'microcms-js-sdk'
import type { microCMSProductsType } from './products'
import type { microCMSPricesType } from './prices'

export type microCMSOthersType = {
  /**
   * 名前
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
} & MicroCMS.MicroCMSContentId
