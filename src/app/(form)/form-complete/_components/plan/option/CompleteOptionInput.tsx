/**
 * 完結フォームプラン選択画面のオプション入力部分コンポーネント
 * @module CompleteOptionInput
 */
import React, { forwardRef } from 'react'
import { useStripeContext, useMicroCMSContext, microCMSOptionsType } from '@/features/context'
import { CheckboxControl, CheckboxControlProps, CheckboxProps } from '@/components/form/field'
import { CardProps } from '@/components/elements'
import type MicroCMS from 'microcms-js-sdk'
import { addComma } from '@/features/functions/number/addComma'
import { createCardContents } from '@/features/functions/form/createCardContents'

/**
 * 完結フォームプラン選択画面のオプション入力部分コンポーネントのプロパティ
 * @typedef {Object} CompleteOptionInputProps
 * @property {CheckboxControlProps} - チェックボックスコンポーネントのプロパティ
 */
export interface CompleteOptionInputProps extends Omit<CheckboxControlProps, 'lists'> {}

/**
 * 完結フォームプラン選択画面のオプション入力部分コンポーネント
 * @param {CompleteOptionInputProps} props - 完結フォームプラン選択画面のオプション入力部分コンポーネントのプロパティ
 * @returns {JSX.Element} - 完結フォームプラン選択画面のオプション入力部分コンポーネント
 */
export const CompleteOptionInput: React.FC<CompleteOptionInputProps> = forwardRef<HTMLInputElement, CompleteOptionInputProps>((props, ref) => {
  const { getOptions, getOption, getPriceId } = useMicroCMSContext()
  const { translateInterval, getLastPrice } = useStripeContext()

  const { nameId, label, note, required = undefined, error, ...checkboxProps } = props

  /**
   * オプションの選択肢を作成
   */
  // オプションの選択肢を動的に取得
  const options = getOptions()
  // 手動で選択肢を設定する場合は以下のコメントアウトを外して使う
  // const optionIds = ['option-a', 'option-b']
  // const options = optionIds.map((optionId) => getOption(optionId)).filter((option) => option !== undefined)

  // optionsが空の配列場合は空の要素を返す
  if (!options || options.length === 0) {
    return <></>
  }

  const lists = (options as (MicroCMS.MicroCMSListContent & microCMSOptionsType)[]).map((option): CheckboxProps & Omit<CardProps, 'children' | 'labelType'> => {
    // Stripeから料金情報を取得
    const priceId = option.stripe?.prices && getPriceId(option.stripe?.prices)
    const price = priceId ? getLastPrice(priceId) : undefined

    // labelContentsを作成
    const contents = (
      <div>
        <p>
          <span className="font-bold">{option.name}</span>
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
        {option.contents && <div dangerouslySetInnerHTML={{ __html: option.contents }}></div>}
      </div>
    )

    let resultObj = {
      labelContents: contents,
      label: option.name,
      value: option.id,
    }

    return createCardContents({ type: 'checkbox', option: resultObj, ribbon: option.ribbon })
  })

  return (
    <>
      <CheckboxControl nameId={nameId} label={label} note={note} required={required} error={error} ref={ref} {...checkboxProps} lists={lists} direction="col" labelType="card" contentWidth="full" />
    </>
  )
})

CompleteOptionInput.displayName = 'CompleteOptionInput'
