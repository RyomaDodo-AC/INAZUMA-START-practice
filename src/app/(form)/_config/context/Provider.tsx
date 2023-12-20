/**
 * 共通フォームのコンテキストコンポーネントProvider
 * @module InquiryContextProvider
 */
'use client'
import React from 'react'
import { CommonFormContext } from './Context'
import { useCommonFormState, commonFormStateReturnType, defaultValues, useCommonFormUniqueId, commonFormUniqueIdReturnType } from './hooks'

/**
 * 共通フォームのコンテキストコンポーネントのProps
 */
export type CommonFormContextProviderProps = {
  /**
   * 子要素
   */
  children: React.ReactNode
  /**
   * フォームの初期値
   */
  defaultValues: defaultValues
}

/**
 * 共通フォームのコンテキストコンポーネントProviderメソッド
 */
export interface commonFormContextProviderMethods extends commonFormStateReturnType, commonFormUniqueIdReturnType {}

export const CommonFormContextProvider: React.FC<CommonFormContextProviderProps> = ({ children, defaultValues }) => {
  /**
   * フォームの値
   */
  const { setValues, resetValues, getValues } = useCommonFormState({ defaultValues })

  /**
   * 直アクセスを防止するためのユニークなID
   */
  const { getUniqueId, createUniqueId } = useCommonFormUniqueId()

  const methods: commonFormContextProviderMethods = {
    setValues,
    resetValues,
    getValues,
    getUniqueId,
    createUniqueId,
  }

  return <CommonFormContext.Provider value={methods}>{children}</CommonFormContext.Provider>
}
