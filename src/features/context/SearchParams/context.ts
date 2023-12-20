/**
 * クエリパラメータを管理するコンテキスト
 */
'use client'
import { useContext } from 'react'
import { createContext } from 'react'

/**
 * クエリパラメータのコンテキストの型
 */
export type searchParamsContextType = {
  /**
   * クエリパラメータの値
   */
  values: {
    /**
     * クエリパラメータの値
     */
    [key: string]: string | string[] | undefined
  }
  /**
   * クエリパラメータの値を更新する関数
   */
  setValues: (values: searchParamsContextType['values']) => void
  /**
   * クエリパラメータの値を取得する関数
   * 引数がある場合は、その引数の値を返す
   * 引数が無い場合は、全ての値オブジェクトで返す
   */
  getValues: (key?: string) => string | string[] | undefined | searchParamsContextType['values']
}

/**
 * クエリパラメータのコンテキストのデフォルト値
 */
export const searchParamsContextDefaultValue: searchParamsContextType = {
  values: {},
  setValues: () => {},
  getValues: () => undefined,
}

/**
 * クエリパラメータのコンテキスト
 */
export const searchParamsContext = createContext<searchParamsContextType>(searchParamsContextDefaultValue)

/**
 * クエリパラメータのコンテキストを取得するカスタムフック
 * @returns {searchParamsContextType} クエリパラメータのコンテキスト
 */
export const useSearchParamsContext = (): searchParamsContextType => {
  return useContext(searchParamsContext)
}
