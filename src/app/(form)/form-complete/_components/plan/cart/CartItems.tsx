/**
 * 選択中の内容
 * @module CartItems
 * @todo watchの引数をtypeセーフにする
 */
import React from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import { useMicroCMSContext, useStripeContext } from '@/features/context'
import { HeadingCaption } from '@/components/elements'

/**
 * 選択中の内容のコンポーネント
 */
export const CartItems: React.FC = () => {
  // 現在選択中の内容を取得
  const { watch } = useFormContext()
  const { getPlan, getTerminal, getAccessory, getTerminalDetail, getGuarantee, getOption, getProductId } = useMicroCMSContext()
  const { getProduct } = useStripeContext()

  /**
   * 現在選択中のプランからDOMを作成する
   * @param {string} title - タイトル
   * @param {string|string[]} value - 値
   * @param {string} type - microCMSのAPIキー名
   * @returns {JSX.Element} - DOM
   */
  const createDOM = ({ title, value, type }: { title: string; value?: string | string[]; type: string }) => {
    // typeによって表示内容を変更
    let contents: React.ReactNode | undefined = undefined
    switch (type) {
      case 'plan':
        if (typeof value === 'string') {
          contents = <p className="text-sm">{getPlan(value)?.name}</p>
        } else {
          contents = undefined
        }
        break
      case 'terminal':
        if (typeof value === 'string') {
          const terminal = getTerminal(value)
          if (!terminal) return undefined
          const terminalColor = watch('terminalColor')
          const terminalRecurring = watch('terminalRecurring')

          // 端末情報を取得
          const terminalDetail = getTerminalDetail({ obj: terminal, color: terminalColor, recurring: terminalRecurring })

          // Stripeから商品画像を取得
          const productId = terminalDetail?.stripeProducts && getProductId(terminalDetail.stripeProducts)
          const product = productId ? getProduct(productId) : undefined
          const image = product?.images?.[0]

          // 付属品のDOMを作成
          const selectAccessories = []
          selectAccessories.push(watch('accessoryCharger'))
          selectAccessories.push(watch('accessoryCradle'))

          const accessories = selectAccessories
            .map((v) => {
              const accessory = getAccessory(v)
              return accessory?.name
            })
            .filter((v) => v)

          contents = (
            <div className="flex items-center gap-2">
              {image && (
                <div className="bg-white p-3">
                  <Image src={image} width={108} height={108} alt={terminal.name} className="h-auto w-auto max-w-[108px]" />
                </div>
              )}
              <div>
                <p className="text-sm font-bold">{terminal.name}</p>
                {terminalColor && <p className="text-sm">{terminalColor}</p>}
                {terminalRecurring && <p className="text-sm">{terminalRecurring}</p>}
                {accessories.length > 0 && (
                  <ul className="list-inside list-disc text-sm">
                    {accessories.map((v) => (
                      <li key={v}>{v}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )
        } else {
          contents = undefined
        }
        break
      case 'guarantee':
        if (typeof value === 'string' && value !== 'null') {
          contents = <p className="text-sm">{getGuarantee(value)?.name}</p>
        } else {
          contents = undefined
        }
        break
      case 'option':
        if (typeof value === 'object') {
          const list = value.map((v) => getOption(v))

          contents =
            list.length > 0 ? (
              <ul className="list-inside list-disc space-y-1 text-sm">
                {list.map((v) => (
                  <li key={v?.id}>{v?.name}</li>
                ))}
              </ul>
            ) : undefined
        } else {
          contents = undefined
        }
        break
    }

    return (
      <>
        {value && contents && (
          <div className="py-3">
            <h3 className="mb-2 font-bold before:content-['【'] after:content-['】']">{title}</h3>
            {contents}
          </div>
        )}
      </>
    )
  }

  // 料金プラン
  const plan = createDOM({ title: '料金プラン', value: watch('plan'), type: 'plan' })
  // 機種
  const terminal = createDOM({ title: '機種', value: watch('terminal'), type: 'terminal' })
  // 端末保証
  const guarantee = createDOM({ title: '端末保証', value: watch('guarantee'), type: 'guarantee' })
  // オプション
  const option = createDOM({ title: 'オプション', value: watch('option'), type: 'option' })

  return (
    <div>
      <HeadingCaption tag="h2" className="mb-4 text-lg font-bold">
        選択中の内容
      </HeadingCaption>
      <div className="divide-y divide-gray-500">
        {plan}
        {terminal}
        {guarantee}
        {option}
      </div>
    </div>
  )
}
