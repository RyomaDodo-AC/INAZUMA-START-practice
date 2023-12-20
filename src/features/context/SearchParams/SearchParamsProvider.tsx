/**
 * クエリパラメータを管理するコンテキストのプロバイダー
 * @module SearchParamsProvider
 */
'use client'
import { searchParamsContext, searchParamsContextType } from './context'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

/**
 * クエリパラメータを管理するコンテキストのプロバイダー
 */
export const SearchParamsProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchParams, setSearchParams] = useState<searchParamsContextType['values']>({})

  // クエリパラメータを取得して更新があったら既存のクエリパラメータとマージする
  const query = useSearchParams()
  useEffect(() => {
    const params = Object.fromEntries(query.entries())
    setSearchParams((prev) => ({ ...prev, ...params }))
  }, [query])

  // クエリパラメータを取得する関数
  const getValues = (key?: keyof searchParamsContextType['values']) => {
    if (key) {
      return searchParams[key]
    } else {
      return searchParams
    }
  }

  // プロバイダーのメソッド
  const methods: searchParamsContextType = {
    values: searchParams,
    setValues: setSearchParams,
    getValues,
  }

  return <searchParamsContext.Provider value={methods}>{children}</searchParamsContext.Provider>
}
