/**
 * microCMSからオプションマスタ
 */
'use client'
import { useState, useEffect } from 'react'
import type MicroCMS from 'microcms-js-sdk'
import { microCMSOptionsType } from '../types'

/**
 * microCMSからオプションマスタの戻り値
 */
export type microCMSOptionsReturnType = {
  /**
   * オプションマスタ一覧の値を取得する関数
   */
  getOptions: () => (MicroCMS.MicroCMSListContent & microCMSOptionsType)[]
  /**
   * オプションマスタの値を取得する関数
   */
  getOption: (id: microCMSOptionsType['id']) => (MicroCMS.MicroCMSListContent & microCMSOptionsType) | undefined
}

/**
 * microCMSからオプションマスタのカスタムフック
 * @return {microCMSOptionsReturnType}
 */
export const useMicroCMSOptions = () => {
  // オプションマスタ
  const [options, setOptions] = useState<(MicroCMS.MicroCMSListContent & microCMSOptionsType)[]>([])

  /**
   * 初期値をAPIから並行取得する
   */
  useEffect(() => {
    /**
     * microCMSからマスタを取得する関数
     */
    // オプションマスタを取得する
    fetch('/api/microcms/fetch/get-options', { next: { tags: ['microCMS'] } }).then(async (res) => {
      const response = await res.json()

      // 返り値が空のオブジェクトの場合、何もしない
      if (Object.keys(response).length === 0) return

      // オプションマスタを更新する
      setOptions((response as MicroCMS.MicroCMSListResponse<microCMSOptionsType>).contents)
    })
  }, [])

  /**
   * オプションマスタ一覧の値を取得する関数
   * @return {MicroCMS.MicroCMSListContent[]}
   */
  const getOptions = (): (MicroCMS.MicroCMSListContent & microCMSOptionsType)[] => options

  /**
   * オプションマスタの値を取得する関数
   * @param {microCMSOptionsType['id']}
   * @return {(MicroCMS.MicroCMSListContent & microCMSOptionsType) | undefined} - オプションマスタの値
   */
  const getOption = (id: microCMSOptionsType['id']): (MicroCMS.MicroCMSListContent & microCMSOptionsType) | undefined => options.find((option) => option.id === id)

  return { getOptions, getOption }
}
