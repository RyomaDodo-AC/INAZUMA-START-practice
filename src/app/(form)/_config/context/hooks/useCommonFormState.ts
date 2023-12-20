/**
 * 共通フォームステートフック
 */
'use client'
import { useState } from 'react'
import { inquiryDefaultValuesType } from '@/app/(form)/form-inquiry/_config'
import { completeDefaultValuesType } from '@/app/(form)/form-complete/_config'

/**
 * フォームのデフォルト値の型
 */
export type defaultValues = inquiryDefaultValuesType | completeDefaultValuesType

/**
 * 共通フォームステートフックのProps
 */
export type commonFormStateProps = {
  defaultValues: defaultValues
}

/**
 * 共通フォームステートフックの戻り値
 */
export type commonFormStateReturnType = {
  /**
   * フォームの値を更新する関数
   */
  setValues: React.Dispatch<React.SetStateAction<defaultValues>>
  /**
   * フォームの値をリセットする関数
   */
  resetValues: () => void
  /**
   * フォームの値を取得する関数
   */
  getValues: (key?: keyof defaultValues) => defaultValues | string | string[] | undefined
}

/**
 * 共通フォームステートフック
 */
export const useCommonFormState = (props: commonFormStateProps) => {
  const { defaultValues } = props
  /**
   * フォームの値
   */
  const [values, setValues] = useState<commonFormStateProps['defaultValues']>(defaultValues)

  // フォームの値をリセットする
  const resetValues: commonFormStateReturnType['resetValues'] = () => {
    setValues(defaultValues)
  }

  // フォームの値を取得する
  const getValues: commonFormStateReturnType['getValues'] = (key?: keyof typeof defaultValues) => {
    // keyがある場合はその値を返す
    if (key) {
      return values[key]
    }

    // keyがない場合は全ての値を返す
    return values
  }

  return {
    setValues,
    resetValues,
    getValues,
  }
}
