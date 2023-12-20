/**
 * couponオブジェクトのmetaデータの型
 */
import Stripe from 'stripe'

export type couponMeta = {
  /**
   * クーポンの適用条件
   * 値はカンマ区切りでどれかのidに該当するものを選択している場合は適用
   * 他のキーにも値がある場合はそれぞれのキーがAND条件で適用
   */
  // その他のメタデータ
  [key: string]: string | undefined
}
