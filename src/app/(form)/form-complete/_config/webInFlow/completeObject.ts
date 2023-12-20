/**
 * 完結フォーム用のオブジェクト
 */
import { completeDefaultValuesType } from '../../_config'
import { completeObjectType } from './completeObjectType'
import type { useMicroCMSContext, useStripeContext } from '@/features/context'
import Stripe from 'stripe'

/**
 * 完結フォーム用のオブジェクトのprops
 */
export interface completeObjectProps {
  /**
   * 完結フォームの送信データ
   */
  formValues: completeDefaultValuesType
  /**
   * MicroCMSのカスタムフック
   */
  useMicroCMS: ReturnType<typeof useMicroCMSContext>
  /**
   * Stripeのカスタムフック
   */
  useStripe: ReturnType<typeof useStripeContext>
}

/**
 * 完結フォーム用のオブジェクトのデフォルト値を返す関数
 * @returns {completeObjectType} 完結フォーム用のオブジェクト
 */
export const getCompleteObject = (props: completeObjectProps): completeObjectType => {
  const { formValues, useMicroCMS, useStripe } = props

  /**
   * Stripeの情報を取得
   */
  const { getPriceId, getProductId } = useMicroCMS
  const { getPrice, getProduct } = useStripe
  type stripeIdType = 'price' | 'product'
  // 0:プラン（plan）
  const plan = (stripeIdType: stripeIdType) => {
    if (!formValues.plan) return undefined

    if (stripeIdType === 'price') {
      const stripeID = getPriceId(useMicroCMS.getPlan(formValues.plan)?.stripe.prices)

      if (!stripeID) return undefined
      return getPrice(stripeID)
    } else if (stripeIdType === 'product') {
      const stripeID = getProductId(useMicroCMS.getPlan(formValues.plan)?.stripe.products)

      if (!stripeID) return undefined
      return getProduct(stripeID)
    }
  }
  // 1:オプション（option.option-a）
  const optionA = () => {
    if (!formValues.option?.includes('option-a')) return undefined
    const stripeID = getPriceId(useMicroCMS.getOption('option-a')?.stripe.prices)

    if (!stripeID) return undefined
    return getPrice(stripeID)
  }
  // 2:端末（terminal）
  const terminal = (stripeIdType: stripeIdType) => {
    if (!formValues.terminal || !formValues.terminalColor || !formValues.terminalRecurring) return undefined

    const terminal = useMicroCMS.getTerminal(formValues.terminal)
    if (!terminal) return undefined

    const terminalDetail = useMicroCMS.getTerminalDetail({
      obj: terminal,
      color: formValues.terminalColor,
      recurring: formValues.terminalRecurring,
    })
    if (!terminalDetail) return undefined

    if (stripeIdType === 'price') {
      const stripeID = getPriceId(terminalDetail.stripePrices)
      if (!stripeID) return undefined

      return getPrice(stripeID)
    } else if (stripeIdType === 'product') {
      const stripeID = getProductId(terminalDetail.stripeProducts)
      if (!stripeID) return undefined

      return getProduct(stripeID)
    }
  }
  // 3:端末保証（guarantee）
  const guarantee = () => {
    if (!formValues.guarantee) return undefined
    const stripeID = getPriceId(useMicroCMS.getGuarantee(formValues.guarantee)?.stripe?.prices)

    if (!stripeID) return undefined
    return getPrice(stripeID)
  }
  // 4:PC設定サポート（option.option-b）
  const optionB = () => {
    if (!formValues.option?.includes('option-b')) return undefined
    const stripeID = getPriceId(useMicroCMS.getOption('option-b')?.stripe.prices)

    if (!stripeID) return undefined
    return getPrice(stripeID)
  }
  // 5:電話サポート（option.option-c）
  const optionC = () => {
    if (!formValues.option?.includes('option-c')) return undefined
    const stripeID = getPriceId(useMicroCMS.getOption('option-c')?.stripe.prices)

    if (!stripeID) return undefined
    return getPrice(stripeID)
  }
  // 6:充電器（accessoryCharger）
  const accessoryCharger = () => {
    if (!formValues.accessoryCharger) return undefined
    const stripeID = getPriceId(useMicroCMS.getAccessory(formValues.accessoryCharger)?.stripe.prices)

    if (!stripeID) return undefined
    return getPrice(stripeID)
  }
  // 7:クレードル（accessoryCradle）
  const accessoryCradle = () => {
    if (!formValues.accessoryCradle) return undefined
    const stripeID = getPriceId(useMicroCMS.getAccessory(formValues.accessoryCradle)?.stripe.prices)

    if (!stripeID) return undefined
    return getPrice(stripeID)
  }
  // 8:SIM（others.simcard）
  const simcard = () => {
    if (!formValues.others?.simcard) return undefined
    const stripeID = formValues.others.simcard

    return getPrice(stripeID)
  }
  // 9:事務手数料（others.administrativeFee）
  const administrativeFee = () => {
    if (!formValues.others?.administrativeFee) return undefined
    const stripeID = getPriceId(useMicroCMS.getOther(formValues.others.administrativeFee)?.stripe.prices)

    if (!stripeID) return undefined
    return getPrice(stripeID)
  }

  return {
    /**
     * 申込情報
     * 0:プラン（plan）
     * 1:オプション（option.option-a）
     * 2:端末（terminal）
     * 3:端末保証（guarantee）
     * 4:PC設定サポート（option.option-b）
     * 5:電話サポート（option.option-c）
     * 6:充電器（accessoryCharger）
     * 7:クレードル（accessoryCradle）
     * 8:SIM（others.simcard）
     * 9:事務手数料（others.administrativeFee）
     */
    // Stripe料金ID
    price_id0: (plan('price') as Stripe.Price)?.id,
    price_id1: optionA()?.id,
    price_id2: (terminal('price') as Stripe.Price)?.id,
    price_id3: guarantee()?.id,
    price_id4: optionB()?.id,
    price_id5: optionC()?.id,
    price_id6: accessoryCharger()?.id,
    price_id7: accessoryCradle()?.id,
    price_id8: simcard()?.id,
    price_id9: administrativeFee()?.id,
    // Stripe料金名
    price_name0: (plan('price') as Stripe.Price)?.nickname ? ((plan('price') as Stripe.Price)?.nickname as string) : undefined,
    price_name1: optionA()?.nickname ? (optionA()?.nickname as string) : undefined,
    price_name2: (terminal('price') as Stripe.Price)?.nickname ? ((terminal('price') as Stripe.Price)?.nickname as string) : undefined,
    price_name3: guarantee()?.nickname ? (guarantee()?.nickname as string) : undefined,
    price_name4: optionB()?.nickname ? (optionB()?.nickname as string) : undefined,
    price_name5: optionC()?.nickname ? (optionC()?.nickname as string) : undefined,
    price_name6: accessoryCharger()?.nickname ? (accessoryCharger()?.nickname as string) : undefined,
    price_name7: accessoryCradle()?.nickname ? (accessoryCradle()?.nickname as string) : undefined,
    price_name8: simcard()?.nickname ? (simcard()?.nickname as string) : undefined,
    price_name9: administrativeFee()?.nickname ? (administrativeFee()?.nickname as string) : undefined,
    // Stripe料金説明
    price_description0: (plan('price') as Stripe.Price)?.metadata?.price_description,
    price_description1: optionA()?.metadata?.price_description,
    price_description2: (terminal('price') as Stripe.Price)?.metadata?.price_description,
    price_description3: guarantee()?.metadata?.price_description,
    price_description4: optionB()?.metadata?.price_description,
    price_description5: optionC()?.metadata?.price_description,
    price_description6: accessoryCharger()?.metadata?.price_description,
    price_description7: accessoryCradle()?.metadata?.price_description,
    price_description8: simcard()?.metadata?.price_description,
    price_description9: administrativeFee()?.metadata?.price_description,
    // Stripe料金備考
    price_remarks0: (plan('price') as Stripe.Price)?.metadata?.remarks,
    price_remarks1: optionA()?.metadata?.remarks,
    price_remarks2: (terminal('price') as Stripe.Price)?.metadata?.remarks,
    price_remarks3: guarantee()?.metadata?.remarks,
    price_remarks4: optionB()?.metadata?.remarks,
    price_remarks5: optionC()?.metadata?.remarks,
    price_remarks6: accessoryCharger()?.metadata?.remarks,
    price_remarks7: accessoryCradle()?.metadata?.remarks,
    price_remarks8: simcard()?.metadata?.remarks,
    price_remarks9: administrativeFee()?.metadata?.remarks,
    // Stripe支払いタイプ
    type0: (plan('price') as Stripe.Price)?.type,
    type1: optionA()?.type,
    type2: (terminal('price') as Stripe.Price)?.type,
    type3: guarantee()?.type,
    type4: optionB()?.type,
    type5: optionC()?.type,
    type6: accessoryCharger()?.type,
    type7: accessoryCradle()?.type,
    type8: simcard()?.type,
    type9: administrativeFee()?.type,
    // StripeクーポンID
    coupon_id0: (plan('price') as Stripe.Price)?.metadata?.coupon_id,
    coupon_id1: optionA()?.metadata?.coupon_id,
    coupon_id2: (terminal('price') as Stripe.Price)?.metadata?.coupon_id,
    coupon_id3: guarantee()?.metadata?.coupon_id,
    coupon_id4: optionB()?.metadata?.coupon_id,
    coupon_id5: optionC()?.metadata?.coupon_id,
    coupon_id6: accessoryCharger()?.metadata?.coupon_id,
    coupon_id7: accessoryCradle()?.metadata?.coupon_id,
    coupon_id8: simcard()?.metadata?.coupon_id,
    coupon_id9: administrativeFee()?.metadata?.coupon_id,
    // Stripe税率ID
    tax_rates0: (plan('price') as Stripe.Price)?.metadata?.tax_rates,
    tax_rates1: optionA()?.metadata?.tax_rates,
    tax_rates2: (terminal('price') as Stripe.Price)?.metadata?.tax_rates,
    tax_rates3: guarantee()?.metadata?.tax_rates,
    tax_rates4: optionB()?.metadata?.tax_rates,
    tax_rates5: optionC()?.metadata?.tax_rates,
    tax_rates6: accessoryCharger()?.metadata?.tax_rates,
    tax_rates7: accessoryCradle()?.metadata?.tax_rates,
    tax_rates8: simcard()?.metadata?.tax_rates,
    tax_rates9: administrativeFee()?.metadata?.tax_rates,

    /**
     * その他申込情報
     */
    // 支払方法
    payment_method: 'クレジットカード',
    // 端末名
    TERMINAL: (terminal('product') as Stripe.Product).name,
    // プラン名
    PLAN_NAME: (plan('product') as Stripe.Product).name,

    /**
     * Stripe情報
     */
    // Stripeトークン
    stripe_token: undefined,
    // StripeSetupIntentID
    Stripe_SetupIntent: formValues.stripeSetupIntent || undefined,
    // StripePaymentMethodID
    Stripe_PaymentMethod: formValues.stripePaymentMethod || undefined,
    // カード判定
    stripe_radar_result: formValues.stripeSetupIntent ? 'OK' : undefined,
  }
}
