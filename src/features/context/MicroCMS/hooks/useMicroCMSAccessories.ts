/**
 * microCMSから付属品マスタ
 */
'use client'
import { useState, useEffect } from 'react'
import type MicroCMS from 'microcms-js-sdk'
import { microCMSAccessoriesType } from '../types'

/**
 * microCMSから付属品マスタの戻り値
 */
export type microCMSAccessoriesReturnType = {
  /**
   * 付属品マスタ一覧の値を取得する関数
   */
  getAccessories: () => (MicroCMS.MicroCMSListContent & microCMSAccessoriesType)[]
  /**
   * 付属品マスタの値を取得する関数
   */
  getAccessory: (id: microCMSAccessoriesType['id']) => (MicroCMS.MicroCMSListContent & microCMSAccessoriesType) | undefined
}

/**
 * microCMSから付属品マスタのカスタムフック
 * @return {microCMSAccessoriesReturnType}
 */
export const useMicroCMSAccessories = () => {
  // 付属品マスタ
  const [accessories, setAccessories] = useState<(MicroCMS.MicroCMSListContent & microCMSAccessoriesType)[]>([])

  /**
   * 初期値をAPIから並行取得する
   */
  useEffect(() => {
    /**
     * microCMSからマスタを取得する関数
     */
    // 付属品マスタを取得する
    fetch('/api/microcms/fetch/get-accessories', { next: { tags: ['microCMS'] } }).then(async (res) => {
      const response = await res.json()

      // 返り値が空のオブジェクトの場合、何もしない
      if (Object.keys(response).length === 0) return

      // 付属品マスタを更新する
      setAccessories((response as MicroCMS.MicroCMSListResponse<microCMSAccessoriesType>).contents)
    })
  }, [])

  /**
   * 付属品マスタ一覧の値を取得する関数
   * @return {MicroCMS.MicroCMSListContent[]}
   */
  const getAccessories = (): (MicroCMS.MicroCMSListContent & microCMSAccessoriesType)[] => accessories

  /**
   * 付属品マスタの値を取得する関数
   * @param {microCMSAccessoriesType['id']}
   * @return {(MicroCMS.MicroCMSListContent & microCMSAccessoriesType) | undefined} - 付属品マスタの値
   */
  const getAccessory = (id: microCMSAccessoriesType['id']): (MicroCMS.MicroCMSListContent & microCMSAccessoriesType) | undefined => accessories.find((accessory) => accessory.id === id)

  return { getAccessories, getAccessory }
}
