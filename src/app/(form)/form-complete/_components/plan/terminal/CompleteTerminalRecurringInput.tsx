/**
 * 完結フォームプラン選択画面の端末代金入力部分コンポーネント
 * @module CompleteTerminalRecurringInput
 */
import React, { forwardRef } from 'react'
import { useStripeContext, useMicroCMSContext, microCMSTerminalsType } from '@/features/context'
import { RadioControl, RadioControlProps, RadioProps } from '@/components/form/field'
import { CardProps } from '@/components/elements'
import { useFormContext } from 'react-hook-form'
import { addComma } from '@/features/functions/number/addComma'

/**
 * 端末代金入力部分コンポーネントのプロパティ
 * @typedef {Object} CompleteTerminalRecurringInputProps
 * @property {RadioControlProps} - ラジオボタンコンポーネントのプロパティ
 */
export interface CompleteTerminalRecurringInputProps extends Omit<RadioControlProps, 'lists'> {}

/**
 * 端末代金入力部分コンポーネント
 * @param {CompleteTerminalRecurringInputProps} props - 端末代金入力部分コンポーネントのプロパティ
 * @returns {JSX.Element} - 端末代金入力部分コンポーネント
 */
export const CompleteTerminalRecurringInput: React.FC<CompleteTerminalRecurringInputProps> = forwardRef<HTMLInputElement, CompleteTerminalRecurringInputProps>((props, ref) => {
  const { getTerminalRecurring, getTerminal } = useMicroCMSContext()
  const { translateInterval, getLastPrice } = useStripeContext()
  const { watch } = useFormContext()

  const { nameId, label, note, required = undefined, error, ...radioProps } = props

  /**
   * 端末代金の選択肢を作成
   */
  // 選択されている端末のIDを取得
  const terminalId: microCMSTerminalsType['id'] = watch('terminal')

  // 端末が選択されていない場合は表示しない
  if (!terminalId) return <></>

  // 選択されている端末の色を取得
  const terminalColor = watch('terminalColor')

  // 端末の色が選択されていない場合は表示しない
  if (!terminalColor) return <></>

  // 端末情報を取得
  const terminal = getTerminal(terminalId)
  // 端末が取得できない場合は表示しない
  if (!terminal) return <></>

  // 端末代金を取得
  const recurrings = getTerminalRecurring({ obj: terminal, color: terminalColor })

  const lists = recurrings.map((recurring): RadioProps & Omit<CardProps, 'children' | 'labelType'> => {
    // Stripeから料金情報を取得
    const price = recurring.stripePricesId ? getLastPrice(recurring.stripePricesId) : undefined

    // labelContentsを作成
    const contents = (
      <div>
        <p>
          <span className="font-bold">{recurring.recurring[0]}</span>
        </p>
        {(!!price?.unit_amount || price?.unit_amount === 0) && (
          <p>
            {addComma(price.unit_amount)}円（税込）
            {price.recurring?.interval_count && (
              <span>
                &nbsp;/&nbsp;{price.recurring.interval_count !== 1 && price.recurring.interval_count}
                {price.recurring.interval_count !== 1 ? translateInterval(price.recurring.interval) : translateInterval(price.recurring.interval).slice(-1)}
              </span>
            )}
          </p>
        )}
      </div>
    )

    return {
      labelContents: contents,
      label: recurring.recurring[0],
      value: recurring.recurring[0],
      labelClassName: '!pl-14',
      radioClassName: '!left-6',
    }
  })

  return (
    <>
      <RadioControl nameId={nameId} label={label} note={note} required={required} error={error} lists={lists} ref={ref} labelType="card" contentWidth="full" {...radioProps} />
    </>
  )
})

CompleteTerminalRecurringInput.displayName = 'CompleteTerminalRecurringInput'
