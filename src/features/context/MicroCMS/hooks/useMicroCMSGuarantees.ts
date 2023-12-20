/**
 * microCMSから端末補償マスタ
 */
'use client'
import { useState, useEffect } from 'react'
import type MicroCMS from 'microcms-js-sdk'
import { microCMSGuaranteesType } from '../types'

/**
 * microCMSから端末補償マスタの戻り値
 */
export type microCMSGuaranteesReturnType = {
  /**
   * 端末補償マスタ一覧の値を取得する関数
   */
  getGuarantees: () => (MicroCMS.MicroCMSListContent & microCMSGuaranteesType)[]
  /**
   * 端末補償マスタの値を取得する関数
   */
  getGuarantee: (id: microCMSGuaranteesType['id']) => (MicroCMS.MicroCMSListContent & microCMSGuaranteesType) | undefined
}

/**
 * microCMSから端末補償マスタのカスタムフック
 * @return {microCMSGuaranteesReturnType}
 */
export const useMicroCMSGuarantees = () => {
  // 端末補償マスタ
  const [guarantees, setGuarantees] = useState<(MicroCMS.MicroCMSListContent & microCMSGuaranteesType)[]>([])

  /**
   * 初期値をAPIから並行取得する
   */
  useEffect(() => {
    /**
     * microCMSからマスタを取得する関数
     */
    // 端末補償マスタを取得する
    fetch('/api/microcms/fetch/get-guarantees', { next: { tags: ['microCMS'] } }).then(async (res) => {
      const response = await res.json()

      // 返り値が空のオブジェクトの場合、何もしない
      if (Object.keys(response).length === 0) return

      // 端末補償マスタを更新する
      setGuarantees((response as MicroCMS.MicroCMSListResponse<microCMSGuaranteesType>).contents)
    })
  }, [])

  /**
   * 端末補償マスタ一覧の値を取得する関数
   * @return {MicroCMS.MicroCMSListContent[]}
   */
  const getGuarantees = (): (MicroCMS.MicroCMSListContent & microCMSGuaranteesType)[] => guarantees

  /**
   * 端末補償マスタの値を取得する関数
   * @param {microCMSGuaranteesType['id']}
   * @return {(MicroCMS.MicroCMSListContent & microCMSGuaranteesType) | undefined} - 端末補償マスタの値
   */
  const getGuarantee = (id: microCMSGuaranteesType['id']): (MicroCMS.MicroCMSListContent & microCMSGuaranteesType) | undefined => guarantees.find((guarantee) => guarantee.id === id)

  return { getGuarantees, getGuarantee }
}
