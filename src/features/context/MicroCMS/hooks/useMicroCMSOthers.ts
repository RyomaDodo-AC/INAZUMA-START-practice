/**
 * microCMSからその他マスタ
 */
'use client'
import { useState, useEffect } from 'react'
import type MicroCMS from 'microcms-js-sdk'
import { microCMSOthersType } from '../types'

/**
 * microCMSからその他マスタの戻り値
 */
export type microCMSOthersReturnType = {
  /**
   * その他マスタ一覧の値を取得する関数
   */
  getOthers: () => (MicroCMS.MicroCMSListContent & microCMSOthersType)[]
  /**
   * その他マスタの値を取得する関数
   */
  getOther: (id: microCMSOthersType['id']) => (MicroCMS.MicroCMSListContent & microCMSOthersType) | undefined
}

/**
 * microCMSからその他マスタのカスタムフック
 * @return {microCMSOthersReturnType}
 */
export const useMicroCMSOthers = () => {
  // その他マスタ
  const [others, setOthers] = useState<(MicroCMS.MicroCMSListContent & microCMSOthersType)[]>([])

  /**
   * 初期値をAPIから並行取得する
   */
  useEffect(() => {
    /**
     * microCMSからマスタを取得する関数
     */
    // その他マスタを取得する
    fetch('/api/microcms/fetch/get-others', { next: { tags: ['microCMS'] } }).then(async (res) => {
      const response = await res.json()

      // 返り値が空のオブジェクトの場合、何もしない
      if (Object.keys(response).length === 0) return

      // その他マスタを更新する
      setOthers((response as MicroCMS.MicroCMSListResponse<microCMSOthersType>).contents)
    })
  }, [])

  /**
   * その他マスタ一覧の値を取得する関数
   * @return {MicroCMS.MicroCMSListContent[]}
   */
  const getOthers = (): (MicroCMS.MicroCMSListContent & microCMSOthersType)[] => others

  /**
   * その他マスタの値を取得する関数
   * @param {microCMSOthersType['id']}
   * @return {(MicroCMS.MicroCMSListContent & microCMSOthersType) | undefined} - その他マスタの値
   */
  const getOther = (id: microCMSOthersType['id']): (MicroCMS.MicroCMSListContent & microCMSOthersType) | undefined => others.find((other) => other.id === id)

  return { getOthers, getOther }
}
