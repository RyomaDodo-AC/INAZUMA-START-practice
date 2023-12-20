/**
 * priceオブジェクトのmetaデータの型
 */
import Stripe from 'stripe'

export type priceMeta = {
  // 次の料金のID（0の時は次の料金は無し）
  next_price_id?: Stripe.Price['id'] | '0'
  // 税率のID
  tax_rates?: Stripe.TaxRate['id']
  // 何回支払いが行われたか
  end_interval_count?: string | '999'
  // その他のメタデータ
  // [key: string]: string | undefined
}
