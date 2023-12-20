/**
 * 完結フォームプラン選択画面の顧客タイプ入力部分コンポーネント
 * @module CompleteCustomerTypeInput
 */
import React from 'react'
import { RadioControl, RadioControlProps } from '@/components/form/field'
import { customerTypeItems } from '@/app/(form)/_config'

/**
 * 完結フォームプラン選択画面の顧客タイプ入力部分コンポーネントのプロパティ
 * @typedef {Object} CompleteCustomerTypeInputProps
 */
export interface CompleteCustomerTypeInputProps {
  /**
   * 顧客タイプ入力部分のProps
   */
  customerTypeInputProps: Omit<RadioControlProps, 'lists'>
}

/**
 * 完結フォームプラン選択画面の顧客タイプ入力部分コンポーネント
 * @param {CompleteCustomerTypeInputProps} props - 完結フォームプラン選択画面の顧客タイプ入力部分コンポーネントのプロパティ
 * @returns {React.FC} - 完結フォームプラン選択画面の顧客タイプ入力部分コンポーネント
 */
export const CompleteCustomerTypeInput: React.FC<CompleteCustomerTypeInputProps> = (props) => {
  const { customerTypeInputProps } = props

  // customerTypeItemsの中身を拡張する
  const lists = customerTypeItems.map((item) => {
    // 顧客タイプが法人の場合は、法人名を追加する
    return {
      ...item,
      labelClassName: '!pl-14',
      radioClassName: '!left-6',
    }
  })

  return <RadioControl lists={lists} {...customerTypeInputProps} />
}
