/**
 * StripeIdsから請求金額を作成する
 */
import Stripe from 'stripe'
import deepmerge from 'deepmerge'
import type { stripeId, stripeIds } from '../createStripeIds'
import { StripeContextProviderMethods } from '@/features/context'
import { getStripeItems } from './getStripeItems'
import { getStripeCoupons } from './getStripeCoupons'

/**
 * StripeIdsから請求金額を作成する関数のprops
 */
export type createBillingAmountProps = {
  stripeIds: { [key: string]: stripeIds }
  useStripeContext: StripeContextProviderMethods
  unitLimit?: 'start' | 'end'
}

/**
 * StripeIdsから請求金額を作成する関数の返り値
 */
export type createBillingAmountReturn = {
  /**
   * 請求期間
   */
  recurring: string
  /**
   * 請求期間スコア
   */
  recurringScore: number
  /**
   * 請求期間単位
   */
  recurringUnit: Stripe.Price.Recurring.Interval
  /**
   * 商品情報
   */
  items: {
    /**
     * 単発決済
     */
    oneTime: {
      /**
       * 商品名
       */
      name: stripeId['name']
      /**
       * 料金情報
       */
      price: ReturnType<StripeContextProviderMethods['getPrice']>
    }[]
    /**
     * 継続決済
     */
    recurring: {
      /**
       * 商品名
       */
      name: stripeId['name']
      /**
       * 料金情報
       */
      price: ReturnType<StripeContextProviderMethods['getPrice']>
    }[]
  }
  /**
   * クーポン情報
   */
  coupons: ReturnType<StripeContextProviderMethods['getCoupon']>[]
  /**
   * 合計金額
   */
  total: number
  /**
   * 注釈
   */
  note?: string
}[]

/**
 * StripeIdsから請求金額を作成する関数
 */
export const createBillingAmount = ({ stripeIds, useStripeContext, unitLimit = 'start' }: createBillingAmountProps): createBillingAmountReturn => {
  // stripeIdsから商品情報を取得
  const items = getStripeItems({ stripeIds, useStripeContext })

  // クーポン情報を取得
  const coupons = getStripeCoupons({ items, useStripeContext })

  // 請求金額を作成
  const billingAmount: createBillingAmountReturn = [
    // 初回請求を初期値として追加
    {
      recurring: '',
      recurringScore: 0,
      recurringUnit: 'month',
      items: {
        oneTime: [],
        recurring: [],
      },
      coupons: [],
      total: 0,
    },
  ]
  items.map((item) => {
    // itemが存在しない場合は何も返さない
    if (!item) return

    // pricesが存在しない場合は何も返さない
    if (!item.prices) return

    item.prices.map((price) => {
      // priceが存在しない場合は何も返さない
      if (!price) return

      const obj: createBillingAmountReturn[0] = {
        recurring: '',
        recurringScore: 0,
        recurringUnit: 'month',
        items: {
          oneTime: [],
          recurring: [],
        },
        coupons: [],
        total: 0,
      }

      // recurringScoreを算出
      if (price.type === 'one_time') {
        obj.recurringScore = 0
      }
      if (price.type === 'recurring' && price.recurring?.interval && price.recurring.interval_count && price.metadata?.end_interval_count) {
        // recurringScoreを算出
        if (price.metadata?.end_interval_count === '0') {
          // end_interval_countが0の場合は初回請求に混ぜる
          obj.recurringScore = 0
        } else {
          obj.recurringScore = getIntervalScore(price.recurring.interval) * price.recurring.interval_count * (Number(price.metadata.end_interval_count) + 1)
        }
        // recurringUnitを格納
        obj.recurringUnit = price.recurring.interval
      }

      // itemsを格納
      if (price.type === 'one_time') {
        obj.items.oneTime?.push({ name: item.name, price })
      }
      if (price.type === 'recurring') {
        obj.items.recurring?.push({ name: item.name, price })
      }

      billingAmount.push(obj)
    })
  })

  // recurringScoreが同じものをマージ
  const mergeBillingAmount = deepmerge.all(
    billingAmount.map((billingAmount) => {
      return { [billingAmount.recurringScore]: billingAmount }
    }),
  ) as {
    [key: createBillingAmountReturn[0]['recurringScore']]: createBillingAmountReturn[0]
  }

  // mergeBillingAmountを反転
  const reverseMergeBillingAmount = Object.values(mergeBillingAmount).reverse()

  // reverseMergeBillingAmountのitemsを次のindexの配列にも追加する
  reverseMergeBillingAmount.map((billingAmount, index) => {
    // 最初のindexの場合は何もしない
    if (index === 0) return

    // 前のindexのitemsを追加
    // 前のindexのitemsと同じ名前のitemがある場合、そのitemは追加しない
    billingAmount.items.oneTime = [
      ...billingAmount.items.oneTime,
      ...reverseMergeBillingAmount[index - 1].items.oneTime.filter((item) => !billingAmount.items.oneTime?.find((item2) => item2.name === item.name)),
    ]

    // 前のindexのitemsと同じ名前のitemがある場合、そのitemは追加しない
    billingAmount.items.recurring = [
      ...billingAmount.items.recurring,
      ...reverseMergeBillingAmount[index - 1].items.recurring.filter((item) => !billingAmount.items.recurring?.find((item2) => item2.name === item.name)),
    ]
  })

  // recurringScoreを昇順に並び変えた配列に変換
  const sortBillingAmount = Object.values(reverseMergeBillingAmount).sort((a, b) => {
    if (a.recurringScore < b.recurringScore) return -1
    if (a.recurringScore > b.recurringScore) return 1
    return 0
  })

  // recurringに値をセット
  sortBillingAmount.map((billingAmount, index) => {
    // recurringScoreが0の場合は初回請求をセット
    if (billingAmount.recurringScore === 0) {
      billingAmount.recurring = '初回請求'

      return
    }

    // 単位を取得
    const unit = useStripeContext.translateInterval(billingAmount.recurringUnit)

    // unitLimitがstartの場合は〇〇目～という表記にする
    if (unitLimit === 'start') {
      // recurringScoreが0でない場合は前のrecurringScoreと比較してrecurringに値をセット
      if (index > 0) {
        // 前のrecurringScoreをrecurringUnitで割って1を足す
        const recurringScore = sortBillingAmount[index - 1].recurringScore / getIntervalScore(sortBillingAmount[index - 1].recurringUnit) + 1

        billingAmount.recurring = `${recurringScore}${unit}目～`
      } else {
        // 今のrecurringScoreをrecurringUnitで割って1を足す
        const recurringScore = billingAmount.recurringScore / getIntervalScore(billingAmount.recurringUnit) + 1

        billingAmount.recurring = `${recurringScore}${unit}目～`
      }
    } else {
      // unitLimitがendの場合は～〇〇目という表記にする

      // 配列の最後のindexの場合は以降という表記にする
      if (index === sortBillingAmount.length - 1) {
        billingAmount.recurring = `以降`
      } else {
        // 今のrecurringScoreをrecurringUnitで割る
        const recurringScore = billingAmount.recurringScore / getIntervalScore(billingAmount.recurringUnit)

        billingAmount.recurring = `～${recurringScore}${unit}目`
      }
    }
  })

  // items内のpriceに適用条件を満たしたクーポンがある場合はcouponsに追加
  sortBillingAmount.map((billingAmount) => {
    billingAmount.items.oneTime.map((item) => {
      // itemが存在しない場合は何も返さない
      if (!item) return

      // priceが存在しない場合は何も返さない
      if (!item.price) return

      // priceにmetadataが存在する場合はクーポン情報を取得
      const coupon = item.price?.metadata?.coupon_id ? coupons.find((coupon) => coupon?.id === item.price?.metadata.coupon_id) : undefined

      // couponが存在する場合はcouponsに追加
      coupon && billingAmount.coupons.push(coupon)
    })

    billingAmount.items.recurring.map((item) => {
      // itemが存在しない場合は何も返さない
      if (!item) return

      // priceが存在しない場合は何も返さない
      if (!item.price) return

      // priceにmetadataが存在する場合はクーポン情報を取得
      const coupon = item.price?.metadata?.coupon_id ? coupons.find((coupon) => coupon?.id === item.price?.metadata.coupon_id) : undefined

      // couponが存在する場合はcouponsに追加
      coupon && billingAmount.coupons.push(coupon)
    })
  })

  // recurringScoreが0のものに注釈を追加
  sortBillingAmount.map((billingAmount) => {
    if (billingAmount.recurringScore === 0) {
      // itemsの中でpriceのtypeがrecurringのものがあるか
      const recurring = billingAmount.items.recurring.find((item) => item.price?.type === 'recurring')

      // recurringが存在する場合は注釈を追加する
      if (recurring) {
        // 単位の最後の1文字を取得
        const unit = useStripeContext.translateInterval(billingAmount.recurringUnit).slice(-1)
        const distribution = billingAmount.recurringUnit === 'day' ? '秒' : '日'
        billingAmount.note = `初${unit}は${distribution}割り計算となります。`
      }
    }
  })

  // totalを算出
  sortBillingAmount.map((billingAmount) => {
    // totalを算出
    const total = billingAmount.items.oneTime.reduce((prev, current) => {
      // priceが存在しない場合は何も返さない
      if (!current.price) return prev

      // amountを加算
      return current.price.unit_amount ? prev + current.price.unit_amount : prev
    }, 0)

    // totalを算出
    const total2 = billingAmount.items.recurring.reduce((prev, current) => {
      // priceが存在しない場合は何も返さない
      if (!current.price) return prev

      // amountを加算
      return current.price.unit_amount ? prev + current.price.unit_amount : prev
    }, 0)

    // totalに加算
    billingAmount.total = total + total2

    // couponsが存在する場合はtotalに加算
    billingAmount.coupons.map((coupon) => {
      // couponが存在しない場合は何も返さない
      if (!coupon) return

      // couponのamount_offが存在する場合はtotalに加算
      coupon.amount_off && (billingAmount.total -= coupon.amount_off)

      // couponのpercent_offが存在する場合はtotalに加算
      coupon.percent_off && (billingAmount.total -= billingAmount.total * (coupon.percent_off / 100))

      // totalが端数の場合は四捨五入
      billingAmount.total = Math.round(billingAmount.total)
    })
  })

  return sortBillingAmount
}

/**
 * 継続課金の請求期間を取得する
 * @param {Stripe.Price.Recurring.Interval} interval - 料金の継続単位
 * @returns {number} - 請求期間のスコア
 */
export const getIntervalScore = (interval: Stripe.Price.Recurring.Interval): number => {
  switch (interval) {
    case 'day':
      return 1
    case 'week':
      return 7
    case 'month':
      return 30
    case 'year':
      return 365
    default:
      return 0
  }
}
