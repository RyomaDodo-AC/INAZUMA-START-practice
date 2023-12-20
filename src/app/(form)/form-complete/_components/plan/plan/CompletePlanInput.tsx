/**
 * 完結フォームプラン選択画面の料金プラン入力部分コンポーネント
 * @module CompletePlanInput
 */
import React from 'react'
import { PlanInput, PlanInputProps } from './PlanInput'
import { PlanDescription } from './PlanDescription'

/**
 * 完結フォームプラン選択画面の料金プラン入力部分コンポーネントのプロパティ
 * @typedef {Object} CompletePlanInputProps
 */
export interface CompletePlanInputProps {
  /**
   * 料金プラン入力部分のProps
   */
  planInputProps: PlanInputProps
}

/**
 * 完結フォームプラン選択画面の料金プラン入力部分コンポーネント
 * @param {CompletePlanInputProps} props - 完結フォームプラン選択画面の料金プラン入力部分コンポーネントのプロパティ
 * @returns {React.FC} - 完結フォームプラン選択画面の料金プラン入力部分コンポーネント
 */
export const CompletePlanInput: React.FC<CompletePlanInputProps> = (props) => {
  const { planInputProps } = props

  return (
    <>
      <PlanInput {...planInputProps} />
      <PlanDescription nameId={planInputProps.nameId} />
    </>
  )
}
