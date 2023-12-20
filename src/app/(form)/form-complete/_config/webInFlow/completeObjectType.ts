import { type } from 'os'

/**
 * 完結フォーム用のオブジェクトの型
 * @todo string部分を指定した型に変更する
 */
export interface completeObjectType {
  /**
   * 申込情報
   */
  // Stripe料金ID
  price_id0?: string | undefined
  price_id1?: string | undefined
  price_id2?: string | undefined
  price_id3?: string | undefined
  price_id4?: string | undefined
  price_id5?: string | undefined
  price_id6?: string | undefined
  price_id7?: string | undefined
  price_id8?: string | undefined
  price_id9?: string | undefined
  // Stripe料金名
  price_name0?: string | undefined
  price_name1?: string | undefined
  price_name2?: string | undefined
  price_name3?: string | undefined
  price_name4?: string | undefined
  price_name5?: string | undefined
  price_name6?: string | undefined
  price_name7?: string | undefined
  price_name8?: string | undefined
  price_name9?: string | undefined
  // Stripe料金説明
  price_description0?: string | undefined
  price_description1?: string | undefined
  price_description2?: string | undefined
  price_description3?: string | undefined
  price_description4?: string | undefined
  price_description5?: string | undefined
  price_description6?: string | undefined
  price_description7?: string | undefined
  price_description8?: string | undefined
  price_description9?: string | undefined
  // Stripe料金備考
  price_remarks0?: string | undefined
  price_remarks1?: string | undefined
  price_remarks2?: string | undefined
  price_remarks3?: string | undefined
  price_remarks4?: string | undefined
  price_remarks5?: string | undefined
  price_remarks6?: string | undefined
  price_remarks7?: string | undefined
  price_remarks8?: string | undefined
  price_remarks9?: string | undefined
  // Stripe支払いタイプ
  type0?: string | undefined
  type1?: string | undefined
  type2?: string | undefined
  type3?: string | undefined
  type4?: string | undefined
  type5?: string | undefined
  type6?: string | undefined
  type7?: string | undefined
  type8?: string | undefined
  type9?: string | undefined
  // StripeクーポンID
  coupon_id0?: string | undefined
  coupon_id1?: string | undefined
  coupon_id2?: string | undefined
  coupon_id3?: string | undefined
  coupon_id4?: string | undefined
  coupon_id5?: string | undefined
  coupon_id6?: string | undefined
  coupon_id7?: string | undefined
  coupon_id8?: string | undefined
  coupon_id9?: string | undefined
  // Stripe税率ID
  tax_rates0?: string | undefined
  tax_rates1?: string | undefined
  tax_rates2?: string | undefined
  tax_rates3?: string | undefined
  tax_rates4?: string | undefined
  tax_rates5?: string | undefined
  tax_rates6?: string | undefined
  tax_rates7?: string | undefined
  tax_rates8?: string | undefined
  tax_rates9?: string | undefined

  /**
   * その他申込情報
   */
  // 支払方法
  payment_method?: string | undefined
  // 端末名
  TERMINAL?: string | undefined
  // プラン名
  PLAN_NAME?: string | undefined

  /**
   * Stripe情報
   */
  // Stripeトークン
  stripe_token?: string | undefined
  // StripeSetupIntentID
  Stripe_SetupIntent?: string | undefined
  // StripePaymentMethodID
  Stripe_PaymentMethod?: string | undefined
  // カード判定
  stripe_radar_result?: string | undefined

  /**
   * その他データ類用
   */
  // [key: string]: string | undefined
}
