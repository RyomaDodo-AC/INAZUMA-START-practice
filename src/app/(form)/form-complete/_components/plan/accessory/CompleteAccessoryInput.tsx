/**
 * 完結フォームプラン選択画面の付属品入力部分コンポーネント
 * @module CompleteAccessoryInput
 */
import React, { forwardRef } from 'react'
import Image from 'next/image'
import { useStripeContext, useMicroCMSContext, microCMSTerminalsType } from '@/features/context'
import { RadioControl, RadioControlProps } from '@/components/form/field'
import { NoteProps } from '@/components/elements'
import { useFormContext } from 'react-hook-form'
import { addComma } from '@/features/functions/number/addComma'

/**
 * 付属品入力部分コンポーネントのプロパティ
 * @typedef {Object} CompleteAccessoryInputProps
 * @property {RadioControlProps} - ラジオボタンコンポーネントのプロパティ
 */
export interface CompleteAccessoryInputProps extends Omit<RadioControlProps, 'lists'> {
  /**
   * 付属品ObjectのID
   */
  accessoryId: microCMSTerminalsType['id']
}

/**
 * 付属品入力部分コンポーネント
 * @param {CompleteAccessoryInputProps} props - 付属品入力部分コンポーネントのプロパティ
 * @returns {JSX.Element} - 付属品入力部分コンポーネント
 */
export const CompleteAccessoryInput: React.FC<CompleteAccessoryInputProps> = forwardRef<HTMLInputElement, CompleteAccessoryInputProps>((props, ref) => {
  const { getAccessory, getTerminal, getTerminalAccessories, getPriceId, getProductId } = useMicroCMSContext()
  const { getLastPrice, getProduct } = useStripeContext()
  const { watch } = useFormContext()

  const { nameId, label, required = undefined, error, accessoryId, ...radioProps } = props

  /**
   * 付属品の選択肢を作成
   */
  // 選択されている端末のIDを取得
  const terminalId: microCMSTerminalsType['id'] = watch('terminal')

  // 端末が選択されていない場合は表示しない
  if (!terminalId) return <></>

  // 端末情報を取得
  const terminal = getTerminal(terminalId)
  // 端末が取得できない場合は表示しない
  if (!terminal) return <></>

  // 表示する付属品のフィルター配列を初期化
  const filterAccessoryIds = getTerminalAccessories(terminal)

  // 付属品Objectがフィルター配列に含まれていない場合は表示しない
  if (!filterAccessoryIds.includes(accessoryId)) return <></>

  // 付属品を取得
  let accessory = getAccessory(accessoryId)

  // 付属品が取得できない場合は表示しない
  if (!accessory) return <></>

  // Stripeから料金情報を取得
  const priceId = accessory.stripe?.prices && getPriceId(accessory.stripe?.prices)
  const price = priceId ? getLastPrice(priceId) : undefined
  const amount = !!price?.unit_amount || price?.unit_amount === 0 ? addComma(price.unit_amount) + '円（税込）' : undefined

  // Stripeから商品情報を取得
  const productId = accessory.stripe?.products && getProductId(accessory.stripe?.products)
  const product = productId ? getProduct(productId) : undefined
  const image = product?.images ? product.images[0] : undefined

  // ラジオボタンの選択肢を作成
  const lists = [
    {
      labelContents: (
        <div>
          <p className="font-bold">希望する</p>
          {amount && <p> {amount}</p>}
        </div>
      ),
      label: accessory.name,
      value: accessory.id,
      labelClassName: '!pl-14 h-full flex items-center',
      radioClassName: '!left-6',
    },
    {
      labelContents: (
        <p>
          <span className="font-bold">希望しない</span>
        </p>
      ),
      label: '希望しない',
      value: 'null',
      labelClassName: '!pl-14 h-full flex items-center',
      radioClassName: '!left-6',
    },
  ]

  // 注釈を作成
  const noteList: NoteProps['list'] = []
  if (accessory.notes?.noteList) {
    accessory.notes?.noteList.map((note) => {
      noteList.push(note.list)
    })
  }

  const note: NoteProps = {
    tag: accessory.notes?.noteDecimal ? 'ol' : 'ul',
    list: noteList,
  }

  return (
    <div>
      {/* 
      リッチエディタによるコンテンツがある場合表示
      （HTMLを解釈するため脆弱性に注意）
    */}
      {accessory.contents && (
        <div className="mb-4 flex justify-between gap-2">
          <div className="prose" dangerouslySetInnerHTML={{ __html: accessory.contents }} />
          {image && (
            <div>
              <Image src={image} width={100} height={100} alt={accessory.name} />
            </div>
          )}
        </div>
      )}

      <RadioControl nameId={nameId} label={label} note={note} required={required} error={error} lists={lists} ref={ref} labelType="card" contentWidth="full" {...radioProps} />
    </div>
  )
})

CompleteAccessoryInput.displayName = 'CompleteAccessoryInput'
