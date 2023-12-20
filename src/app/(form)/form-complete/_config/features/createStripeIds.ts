/**
 * 渡された商品タイプからstripeIdsを作成する
 * @param {string} type - 商品タイプ
 * @param {Function} useFormContext - useFormContext
 * @param {Function} useMicroCMSContext - useMicroCMSContext
 * @returns {stripeIds} - stripeIds
 * @todo 複数選択の商品タイプ（配列）が渡された場合の処理を追加する
 */
import { UseFormReturn } from 'react-hook-form'
import { MicroCMSContextProviderMethods } from '@/features/context'
import type MicroCMS from 'microcms-js-sdk'

/**
 * 選択した商品の合計金額を表示するコンポーネント
 */
export type stripeId = {
  name: string | undefined
  priceId: string | undefined
}
export type stripeIds = stripeId[] | undefined

export const createStripeIds = ({ type, useFormContext, useMicroCMSContext }: { type: string; useFormContext: UseFormReturn; useMicroCMSContext: MicroCMSContextProviderMethods }): stripeIds => {
  // 現在選択中の内容を取得
  const { watch } = useFormContext
  const { getPlan, getTerminal, getTerminalDetail, getAccessory, getGuarantee, getOption, getOther, getPriceId } = useMicroCMSContext

  // microCMSからデータを取得する関数
  let stripeIds = []
  switch (type) {
    case 'plan':
      stripeIds.push({
        name: getPlan(watch(type))?.name,
        priceId: getPriceId(getPlan(watch(type))?.stripe?.prices),
      })
      break
    case 'terminal':
      // 選択されている端末を取得
      const terminal = getTerminal(watch(type))
      // 選択されている端末の色を取得
      const color = watch('terminalColor')
      // 選択されている端末代金を取得
      const recurring = watch('terminalRecurring')

      // 端末・色・代金が選択されている場合のみstripeIdを取得
      if (terminal && color && recurring) {
        // 選択されている端末情報を取得
        const terminalDetail = getTerminalDetail({ obj: terminal, color, recurring })

        stripeIds.push({
          name: terminal?.name,
          priceId: getPriceId(terminalDetail?.stripePrices),
        })
      }
      break
    case 'accessoryCharger':
    case 'accessoryCradle':
      stripeIds.push({
        name: getAccessory(watch(type))?.name,
        priceId: getPriceId(getAccessory(watch(type))?.stripe?.prices),
      })
      break
    case 'guarantee':
      stripeIds.push({
        name: getGuarantee(watch(type))?.name,
        priceId: getPriceId(getGuarantee(watch(type))?.stripe?.prices),
      })
      break
    case 'option':
      const options: MicroCMS.MicroCMSContentId['id'][] = watch(type)
      if (options.length > 0) {
        options.forEach((option) => {
          stripeIds.push({
            name: getOption(option)?.name,
            priceId: getPriceId(getOption(option)?.stripe?.prices),
          })
        })
      }
      break
    case 'others.administrativeFee':
      const value = watch(type)
      stripeIds.push({
        name: getOther(value)?.name,
        priceId: getPriceId(getOther(value)?.stripe?.prices),
      })
      break
  }

  // stripeIdsを返す
  return stripeIds.length > 0 ? stripeIds : undefined
}
