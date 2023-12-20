/**
 * productオブジェクトのmetaデータの型
 */
import Stripe from 'stripe'

export type ProductMeta = {
  // SIMカードのID
  simcard?: Stripe.Price['id']
  // その他のメタデータ
  // [key: string]: string | undefined
}
