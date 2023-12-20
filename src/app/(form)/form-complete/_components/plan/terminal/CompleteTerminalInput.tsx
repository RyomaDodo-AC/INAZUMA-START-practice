/**
 * 完結フォームプラン選択画面の端末入力部分コンポーネント
 * @module CompleteTerminalInput
 */
import React, { forwardRef, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { useStripeContext, useMicroCMSContext, microCMSTerminalsType } from '@/features/context'
import { RadioControl, RadioControlProps, RadioProps, Input } from '@/components/form/field'
import { CardProps } from '@/components/elements'
import type MicroCMS from 'microcms-js-sdk'
import { createCardContents } from '@/features/functions/form/createCardContents'
import { useFormContext } from 'react-hook-form'

/**
 * 端末入力部分コンポーネントのプロパティ
 * @typedef {Object} CompleteTerminalInputProps
 * @property {RadioControlProps} - ラジオボタンコンポーネントのプロパティ
 */
export interface CompleteTerminalInputProps extends Omit<RadioControlProps, 'lists'> {}

/**
 * 端末入力部分コンポーネント
 * @param {CompleteTerminalInputProps} props - 端末入力部分コンポーネントのプロパティ
 * @returns {JSX.Element} - 端末入力部分コンポーネント
 */
export const CompleteTerminalInput: React.FC<CompleteTerminalInputProps> = forwardRef<HTMLInputElement, CompleteTerminalInputProps>((props, ref) => {
  const { getTerminals, getTerminal, getPlan, getPlanTerminals, getProductId } = useMicroCMSContext()
  const { getProduct } = useStripeContext()
  const { watch, setValue, resetField, register } = useFormContext()

  const { nameId, label, note, required = undefined, error, ...radioProps } = props

  /**
   * 端末の選択肢を作成
   */
  // 選択されているプランのIDを取得
  const planId = watch('plan')
  const prevPlanId = useRef(planId)

  // プランの選択が変更された場合は端末の選択をリセット
  useEffect(() => {
    if (prevPlanId.current !== planId) {
      setValue(nameId, '')
    }
    prevPlanId.current = planId
  }, [planId, nameId, setValue])

  // 選択されている端末のIDを取得
  const terminalId: microCMSTerminalsType['id'] = watch(nameId)
  const [terminalIdState, setTerminalIdState] = useState(terminalId)
  const prevTerminalId = useRef(terminalId)

  useEffect(() => {
    setTerminalIdState(terminalId)
  }, [terminalId])

  // 端末の選択が変更された場合の処理
  useEffect(() => {
    // 選択されている端末からStripeの商品情報を取得
    const terminal = getTerminal(terminalIdState)
    const productId = terminal?.stripeProducts && getProductId(terminal.stripeProducts)
    const product = productId ? getProduct(productId) : undefined

    // 端末に紐づくStripe商品情報のメタデータに0以外のsimcardが含まれる場合、simcardをsetする
    if (product?.metadata.simcard && product?.metadata.simcard !== '0') {
      setValue('others.simcard', product.metadata.simcard)
    } else {
      setValue('others.simcard', undefined)
    }

    // 前回の端末の選択と現在の端末の選択が異なる場合はリセット
    if (prevTerminalId.current !== terminalIdState) {
      // 一度submitするとdefaultValuesが送信時の値に更新されるため、明示的にリセットする
      setValue('terminalRecurring', '')
      setValue('terminalColor', '')
      setValue('accessoryCharger', '')
      setValue('accessoryCradle', '')
    }
    prevTerminalId.current = terminalIdState
  }, [terminalIdState, setValue, getProduct, getTerminal, getProductId])

  // 表示する端末のフィルター配列を初期化
  const filterTerminalIds: microCMSTerminalsType['id'][] = []

  // プランが選択されている場合は端末のフィルター配列を作成
  if (planId) {
    // プラン情報を取得
    const plan = getPlan(planId)
    // プランが取得できない場合は処理をスルーする
    if (plan) {
      // プランに紐づく端末のIDを取得
      const planTerminalIds = getPlanTerminals(plan)
      // プランに紐づく端末が取得できた場合は端末のフィルター配列に追加
      if (planTerminalIds) {
        filterTerminalIds.push(...planTerminalIds)
      }
    }
  }

  // 端末の選択肢を動的に取得
  let terminals = getTerminals()
  // 手動で選択肢を設定する場合は以下のコメントアウトを外して使う
  // const terminalIds = ['terminal-a', 'terminal-b']
  // let terminals = terminalIds.map((terminalId) => getTerminal(terminalId)).filter((terminal) => terminal !== undefined)

  // terminalsが空の配列場合は空の要素を返す
  if (!terminals || terminals.length === 0) {
    return <></>
  }

  // フィルター配列がある場合は端末の選択肢をフィルターする
  if (filterTerminalIds.length > 0) {
    terminals = terminals.filter((terminal) => filterTerminalIds.includes(terminal.id))
  }

  const lists = (terminals as (MicroCMS.MicroCMSListContent & microCMSTerminalsType)[]).map((terminal): RadioProps & Omit<CardProps, 'children' | 'labelType'> => {
    // Stripeから商品画像を取得
    const productId = terminal.stripeProducts && getProductId(terminal.stripeProducts)
    const product = productId ? getProduct(productId) : undefined

    // labelContentsを作成
    const contents = (
      <div className="flex w-full flex-col items-center">
        {product?.images && (
          <div className="relative mb-7 flex h-20 w-full items-center md:h-28">
            <Image src={product.images[0]} alt={terminal.name} fill={true} style={{ objectFit: 'contain' }} sizes="(min-width: 768px) 15vw, 100vw" />
          </div>
        )}
        <p className="text-center">
          <span className="text-lg font-bold">{terminal.name}</span>
        </p>
        {/* 
          リッチエディタによるコンテンツがある場合表示
          （HTMLを解釈するため脆弱性に注意）
        */}
        {terminal.contents && (
          <>
            <hr className="mx-auto my-2 h-0.5 w-full rounded border-0 bg-gray-500" />
            <div className="max-w-full text-center md:w-48 lg:w-60" dangerouslySetInnerHTML={{ __html: terminal.contents }}></div>
          </>
        )}
      </div>
    )

    let resultObj = {
      labelContents: contents,
      label: terminal.name,
      value: terminal.id,
    }

    return createCardContents({
      type: 'radio',
      option: resultObj,
      ribbon: terminal.ribbon,
      inputPosition: 'top',
      inputFloat: true,
    })
  })

  return (
    <>
      <RadioControl
        nameId={nameId}
        label={label}
        note={note}
        required={required}
        error={error}
        ref={ref}
        {...radioProps}
        lists={lists}
        direction="row"
        contentWidth="full"
        labelType="card"
        radioPosition="top"
      />
    </>
  )
})

CompleteTerminalInput.displayName = 'CompleteTerminalInput'
