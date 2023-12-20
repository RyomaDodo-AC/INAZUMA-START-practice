/**
 * pricesAPIスキーマ
 * @see https://inazuma-start.microcms.io/apis/products
 */
export type microCMSProductsType = {
  /**
   * 料金名
   */
  name: string
  /**
   * 料金ID（本番）
   */
  products_id_prod?: string
  /**
   * 料金ID（開発）
   */
  products_id_dev?: string
}
