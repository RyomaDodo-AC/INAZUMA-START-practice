/**
 * pricesAPIスキーマ
 * @see https://inazuma-start.microcms.io/apis/prices
 */
export type microCMSPricesType = {
  /**
   * 料金名
   */
  name: string
  /**
   * 料金ID（本番）
   */
  prices_id_prod?: string
  /**
   * 料金ID（開発）
   */
  prices_id_dev?: string
}
