/**
 * 完結フォームプラン選択画面の端末色入力部分コンポーネント
 * @module CompleteTerminalColorInput
 */
import React, { forwardRef, useEffect, useState, useRef } from 'react'
import { useMicroCMSContext, microCMSTerminalsType } from '@/features/context'
import { RadioControl, RadioControlProps, RadioProps } from '@/components/form/field'
import { CardProps } from '@/components/elements'
import { useFormContext } from 'react-hook-form'

/**
 * 端末の色入力部分コンポーネントのプロパティ
 * @typedef {Object} CompleteTerminalColorInputProps
 * @property {RadioControlProps} - ラジオボタンコンポーネントのプロパティ
 */
export interface CompleteTerminalColorInputProps extends Omit<RadioControlProps, 'lists'> {}

/**
 * 端末の色入力部分コンポーネント
 * @param {CompleteTerminalColorInputProps} props - 端末の色入力部分コンポーネントのプロパティ
 * @returns {JSX.Element} - 端末の色入力部分コンポーネント
 */
export const CompleteTerminalColorInput: React.FC<CompleteTerminalColorInputProps> = forwardRef<HTMLInputElement, CompleteTerminalColorInputProps>((props, ref) => {
  const { getTerminalColors, getTerminal } = useMicroCMSContext()
  const { watch, setValue } = useFormContext()

  const { nameId, label, note, required = undefined, error, ...radioProps } = props

  /**
   * 端末の色の選択肢を作成
   */
  // 選択されている端末のIDを取得
  const terminalId: microCMSTerminalsType['id'] = watch('terminal')

  // 選択されている端末の色を取得
  const terminalColor = watch(nameId)
  const [terminalColorState, setTerminalColorState] = useState(terminalColor)
  const prevTerminalColor = useRef(terminalColor)

  useEffect(() => {
    setTerminalColorState(terminalColor)
  }, [terminalColor])

  // 端末の色の選択が変更された場合の処理
  useEffect(() => {
    // 前回の端末の選択と現在の端末の選択が異なる場合はリセット
    if (prevTerminalColor.current !== terminalColorState) {
      // 一度submitするとdefaultValuesが送信時の値に更新されるため、明示的にリセットする
      setValue('terminalRecurring', '')
    }
    prevTerminalColor.current = terminalColorState
  }, [terminalColorState, setValue])

  // 端末が選択されていない場合は表示しない
  if (!terminalId) return <></>

  // 端末情報を取得
  const terminal = getTerminal(terminalId)
  // 端末が取得できない場合は表示しない
  if (!terminal) return <></>

  // 端末の色を取得
  const colors = getTerminalColors(terminal)

  const lists = colors.map((color): RadioProps & Omit<CardProps, 'children' | 'labelType'> => {
    // 色コードから背景色を作成
    let backgroundColor = ''
    let style = undefined
    switch (color.colorCode) {
      case 'gold':
        backgroundColor = 'bg-gold'
        break
      case 'silver':
        backgroundColor = 'bg-silver'
        break
      case 'bronze':
        backgroundColor = 'bg-bronze'
        break
      default:
        style = { backgroundColor: color.colorCode }
    }

    // labelContentsを作成
    const contents = (
      <p className="flex items-center">
        <span className={`mr-2 inline-block h-5 w-5 rounded-full ring-1 ring-gray-500 ring-offset-2 ${backgroundColor}`} style={style}></span>
        <span className="font-bold">{color.colorName}</span>
      </p>
    )

    return {
      labelContents: contents,
      label: color.colorName,
      value: color.colorName,
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

CompleteTerminalColorInput.displayName = 'CompleteTerminalColorInput'
