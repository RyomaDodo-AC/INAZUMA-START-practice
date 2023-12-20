/**
 * 料金プラン入力部分のみを表示するコンポーネント
 * @module PlanInput
 */
import React, { forwardRef } from 'react'
import { useStripeContext, useMicroCMSContext, microCMSPlansType } from '@/features/context'
import { RadioControl, RadioControlProps, RadioProps } from '@/components/form/field'
import { CardProps } from '@/components/elements'
import type MicroCMS from 'microcms-js-sdk'
import { addComma } from '@/features/functions/number/addComma'
import { createCardContents } from '@/features/functions/form/createCardContents'

/**
 * 料金プラン入力部分コンポーネントのプロパティ
 * @typedef {Object} PlanInputProps
 * @property {RadioControlProps} - ラジオボタンコンポーネントのプロパティ
 */
export interface PlanInputProps extends Omit<RadioControlProps, 'lists'> {}

/**
 * 料金プラン入力部分コンポーネント
 * @param {PlanInputProps} props - 料金プラン入力部分コンポーネントのプロパティ
 * @returns {JSX.Element} - 料金プラン入力部分コンポーネント
 */
export const PlanInput: React.FC<PlanInputProps> = forwardRef<HTMLInputElement, PlanInputProps>((props, ref) => {
  const { getPlans, getPlan, getPriceId } = useMicroCMSContext()
  const { translateInterval, getLastPrice } = useStripeContext()

  const { nameId, label, note, required = undefined, error, ...radioProps } = props

  /**
   * 料金プランの選択肢を作成
   */
  // 料金プランの選択肢を動的に取得
  const plans = getPlans()
  // 手動で選択肢を設定する場合は以下のコメントアウトを外して使う
  // const planIds = ['plan-10', 'plan-30']
  // const plans = planIds.map((planId) => getPlan(planId)).filter((plan) => plan !== undefined)

  // plansが空の配列場合は空の要素を返す
  if (!plans || plans.length === 0) {
    return <></>
  }

  const lists = (plans as (MicroCMS.MicroCMSListContent & microCMSPlansType)[]).map((plan): RadioProps & Omit<CardProps, 'children' | 'labelType'> => {
    // Stripeから料金情報を取得
    const priceId = plan.stripe?.prices && getPriceId(plan.stripe?.prices)
    const price = priceId ? getLastPrice(priceId) : undefined

    // labelContentsを作成
    const contents = (
      <div>
        <p>
          <span className="font-bold">{plan.name}</span>
          {(!!price?.unit_amount || price?.unit_amount === 0) && (
            <span className="block md:ml-2 md:inline">
              {addComma(price.unit_amount)}円～（税込）
              {price.recurring?.interval_count && (
                <span>
                  &nbsp;/&nbsp;{price.recurring.interval_count !== 1 && price.recurring.interval_count}
                  {price.recurring.interval_count !== 1 ? translateInterval(price.recurring.interval) : translateInterval(price.recurring.interval).slice(-1)}
                </span>
              )}
            </span>
          )}
        </p>
        {/* 
          リッチエディタによるコンテンツがある場合表示
          （HTMLを解釈するため脆弱性に注意）
        */}
        {plan.contents && <div dangerouslySetInnerHTML={{ __html: plan.contents }}></div>}
      </div>
    )

    let resultObj = {
      labelContents: contents,
      label: plan.name,
      value: plan.id,
    }

    return createCardContents({ type: 'radio', option: resultObj, ribbon: plan.ribbon })
  })

  return (
    <>
      <RadioControl nameId={nameId} label={label} note={note} required={required} error={error} ref={ref} {...radioProps} lists={lists} direction="col" labelType="card" contentWidth="full" />
    </>
  )
})

PlanInput.displayName = 'PlanInput'
