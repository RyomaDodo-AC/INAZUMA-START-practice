/**
 * 完結フォームプラン選択画面の端末保証入力部分コンポーネント
 * @module CompleteGuaranteeInput
 */
import React, { forwardRef } from 'react'
import { useStripeContext, useMicroCMSContext, microCMSGuaranteesType } from '@/features/context'
import { RadioControl, RadioControlProps, RadioProps } from '@/components/form/field'
import { CardProps } from '@/components/elements'
import type MicroCMS from 'microcms-js-sdk'
import { addComma } from '@/features/functions/number/addComma'
import { createCardContents } from '@/features/functions/form/createCardContents'

/**
 * 完結フォームプラン選択画面の端末保証入力部分コンポーネントのプロパティ
 * @typedef {Object} CompleteGuaranteeInputProps
 * @property {RadioControlProps} - チェックボックスコンポーネントのプロパティ
 */
export interface CompleteGuaranteeInputProps extends Omit<RadioControlProps, 'lists'> {}

/**
 * 完結フォームプラン選択画面の端末保証入力部分コンポーネント
 * @param {CompleteGuaranteeInputProps} props - 完結フォームプラン選択画面の端末保証入力部分コンポーネントのプロパティ
 * @returns {JSX.Element} - 完結フォームプラン選択画面の端末保証入力部分コンポーネント
 */
export const CompleteGuaranteeInput: React.FC<CompleteGuaranteeInputProps> = forwardRef<HTMLInputElement, CompleteGuaranteeInputProps>((props, ref) => {
  const { getGuarantees, getGuarantee, getPriceId } = useMicroCMSContext()
  const { translateInterval, getLastPrice } = useStripeContext()

  const { nameId, label, note, required = undefined, error, ...radioProps } = props

  /**
   * 端末保証の選択肢を作成
   */
  // 端末保証の選択肢を動的に取得
  const guarantees = getGuarantees()
  // 手動で選択肢を設定する場合は以下のコメントアウトを外して使う
  // const guaranteeIds = ['guarantee-a', 'guarantee-b']
  // const guarantees = guaranteeIds.map((guaranteeId) => getGuarantee(guaranteeId)).filter((guarantee) => guarantee !== undefined)

  // guaranteesが空の配列場合は空の要素を返す
  if (!guarantees || guarantees.length === 0) {
    return <></>
  }

  const lists = (guarantees as (MicroCMS.MicroCMSListContent & microCMSGuaranteesType)[]).map((guarantee): RadioProps & Omit<CardProps, 'children' | 'labelType'> => {
    // Stripeから料金情報を取得
    const priceId = guarantee.stripe?.prices && getPriceId(guarantee.stripe?.prices)
    const price = priceId ? getLastPrice(priceId) : undefined

    // labelContentsを作成
    const contents = (
      <div>
        <p>
          <span className="font-bold">{guarantee.name}</span>
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
        {guarantee.contents && <div dangerouslySetInnerHTML={{ __html: guarantee.contents }}></div>}
      </div>
    )

    let resultObj = {
      labelContents: contents,
      label: guarantee.name,
      value: guarantee.id,
    }

    return createCardContents({ type: 'radio', option: resultObj, ribbon: guarantee.ribbon })
  })

  return (
    <>
      <RadioControl nameId={nameId} label={label} note={note} required={required} error={error} lists={lists} ref={ref} {...radioProps} direction="col" labelType="card" contentWidth="full" />
    </>
  )
})

CompleteGuaranteeInput.displayName = 'CompleteGuaranteeInput'
