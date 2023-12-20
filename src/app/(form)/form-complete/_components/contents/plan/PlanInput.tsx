/**
 * 完結フォームプラン選択画面の内容を定義するコンポーネント
 * @module CompletePlanInputContents
 */
import React, { useEffect } from 'react'
// import { completeTypeItems } from './items'
import { HeadingLine } from '@/components/elements'
import { Required } from '@/components/form/parts'
import { useCommonFormContext } from '@/app/(form)/_config/context'
import {
  CompleteCustomerTypeInput,
  CompletePlanInput,
  CompleteTerminalInput,
  CompleteTerminalColorInput,
  CompleteTerminalRecurringInput,
  CompleteAccessoryInput,
  CompleteGuaranteeInput,
  CompleteOptionInput,
} from '@/app/(form)/form-complete/_components'
import { completeDefaultValues, completeDefaultValuesType } from '@/app/(form)/form-complete/_config'
import { useMicroCMSContext } from '@/features/context'
import { useFormContext } from 'react-hook-form'

/**
 * 完結フォームプラン選択画面の内容を定義するProps
 * @typedef CompletePlanInputContentsProps
 */
export interface CompletePlanInputContentsProps {}

/**
 * 完結フォームプラン選択画面の内容を定義するコンポーネント
 * @param {CompletePlanInputContentsProps} props - 完結フォームプラン選択画面の内容を定義するコンポーネントのプロパティ
 * @returns {JSX.Element} 完結フォームプラン選択画面の内容を定義するコンポーネント
 */
export const CompletePlanInputContents: React.FC<CompletePlanInputContentsProps> = (props: CompletePlanInputContentsProps) => {
  const {
    register,
    setValue,
    getValues,
    trigger,
    watch,
    resetField,
    formState: { errors },
  } = useFormContext()
  const { setValues, getValues: getContextValues } = useCommonFormContext()
  const { getTerminalColors, getTerminalRecurring, getTerminalAccessories, getTerminal, getAccessories } = useMicroCMSContext()

  /**
   * 選択されている端末情報を取得
   */
  const getTerminalObject = () => {
    // 選択されている端末のIDを取得
    const terminalId = watch('terminal')
    // 端末が選択されていない場合は何も返さない
    if (!terminalId) return undefined

    // 端末情報を取得
    return getTerminal(terminalId)
  }

  const terminalObject = getTerminalObject()

  /**
   * 端末の色の選択肢があるかどうかを判定
   * @returns {boolean} 端末の色の選択肢があるかどうか
   */
  const hasTerminalColor = (): boolean => {
    // 端末が取得できない場合は表示しない
    if (!terminalObject) return false

    // 端末の色を取得
    const colors = getTerminalColors(terminalObject)

    return colors.length > 0
  }

  /**
   * 端末の代金情報の選択肢があるかどうかを判定
   * @returns {boolean} 端末の代金情報の選択肢があるかどうか
   */
  const hasTerminalRecurring = (): boolean => {
    // 端末が取得できない場合は表示しない
    if (!terminalObject) return false

    // 選択されている端末の色を取得
    const terminalColor = watch('terminalColor')

    // 端末の色が選択されていない場合は表示しない
    if (!terminalColor) return false

    // 端末の代金情報を取得
    const recurrings = getTerminalRecurring({ obj: terminalObject, color: terminalColor })

    return recurrings.length > 0
  }

  /**
   * 付属品の選択肢を作成
   */
  const getAccessoryLists = () => {
    // 選択されている端末から付属品のIDを取得
    const terminalAccessories = terminalObject && getTerminalAccessories(terminalObject)

    // 付属品を取得
    const accessories = getAccessories()

    // 付属品から選択されている端末の付属品でないものを除外して返す
    return accessories.filter((accessory) => terminalAccessories?.includes(accessory.id))
  }

  return (
    <div className="space-y-12">
      <div>
        <HeadingLine tag="h2" className="mb-8 text-lg md:text-2xl">
          <span className="inline-flex items-center gap-x-2">
            <Required required={true} />
            <span>お申込み種別</span>
          </span>
        </HeadingLine>

        <CompleteCustomerTypeInput customerTypeInputProps={{ nameId: 'customerType', labelType: 'card', contentWidth: 'full', error: errors.customerType, ...register('customerType') }} />
      </div>

      <div>
        <HeadingLine tag="h2" className="mb-8 text-lg md:text-2xl">
          <span className="inline-flex items-center gap-x-2">
            <Required required={true} />
            <span>プランを選択する</span>
          </span>
        </HeadingLine>

        <CompletePlanInput planInputProps={{ nameId: 'plan', error: errors.plan, ...register('plan') }} />
      </div>

      <div>
        <HeadingLine tag="h2" className="mb-8 text-lg md:text-2xl">
          <span className="inline-flex items-center gap-x-2">
            <Required required={true} />
            <span>機種を選択する</span>
          </span>
        </HeadingLine>

        <CompleteTerminalInput nameId="terminal" error={errors.terminal} {...register('terminal')} />
      </div>

      {hasTerminalColor() && (
        <div>
          <HeadingLine tag="h2" className="mb-8 text-lg md:text-2xl">
            <span className="inline-flex items-center gap-x-2">
              <Required required={true} />
              <span>機種のカラーを選択する</span>
            </span>
          </HeadingLine>

          <CompleteTerminalColorInput nameId="terminalColor" error={errors.terminalColor} {...register('terminalColor')} />
        </div>
      )}

      {hasTerminalRecurring() && (
        <div>
          <HeadingLine tag="h2" className="mb-8 text-lg md:text-2xl">
            <span className="inline-flex items-center gap-x-2">
              <Required required={true} />
              <span>機種の代金を選択する</span>
            </span>
          </HeadingLine>

          <CompleteTerminalRecurringInput nameId="terminalRecurring" error={errors.terminalRecurring} {...register('terminalRecurring')} />
        </div>
      )}

      {getAccessoryLists().map((accessory) => {
        const nameId = 'accessory' + accessory.id.charAt(0).toUpperCase() + accessory.id.slice(1)
        return (
          <div key={nameId}>
            <HeadingLine tag="h2" className="mb-8 text-lg md:text-2xl">
              <span className="inline-flex items-center gap-x-2">
                <Required required={true} />
                <span>{accessory.name}を選択する</span>
              </span>
            </HeadingLine>

            <CompleteAccessoryInput nameId={nameId} error={errors[nameId]} {...register(nameId)} accessoryId={accessory.id} />
          </div>
        )
      })}

      <div>
        <HeadingLine tag="h2" className="mb-8 text-lg md:text-2xl">
          <span className="inline-flex items-center gap-x-2">
            <Required required={true} />
            <span>故障やトラブルに備えた端末保証</span>
          </span>
        </HeadingLine>

        <CompleteGuaranteeInput nameId="guarantee" error={errors.guarantee} {...register('guarantee')} />
      </div>

      <div>
        <HeadingLine tag="h2" className="mb-8 text-lg md:text-2xl">
          <span className="inline-flex items-center gap-x-2">
            <Required required={false} />
            <span>その他の充実オプション</span>
          </span>
        </HeadingLine>

        <CompleteOptionInput nameId="option" error={errors.option} {...register('option')} />
      </div>
    </div>
  )
}
