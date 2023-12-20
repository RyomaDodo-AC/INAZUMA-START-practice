/**
 * 共通フォームのコンテキスト
 */
'use client'
import { useContext } from 'react'
import { createContext } from 'react'
import { commonFormContextProviderMethods } from './Provider'

/**
 * 共通フォームのコンテキストの型
 */
export interface commonFormContextType extends commonFormContextProviderMethods {}

/**
 * 共通フォームのコンテキストを作成する
 */
export const CommonFormContext = createContext<commonFormContextType>({
  setValues: () => {},
  resetValues: () => {},
  getValues: () => undefined,
  getUniqueId: () => undefined,
  createUniqueId: () => {},
})

/**
 * 共通フォームのコンテキストを使用する
 */
export const useCommonFormContext = () => useContext(CommonFormContext)
