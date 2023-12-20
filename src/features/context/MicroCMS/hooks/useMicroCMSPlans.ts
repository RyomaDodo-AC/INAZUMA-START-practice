/**
 * microCMSから料金プランマスタ
 */
'use client'
import { useState, useEffect } from 'react'
import type MicroCMS from 'microcms-js-sdk'
import { microCMSPlansType } from '../types'
import { getPlanTerminals, getPlanTerminalsReturnType } from '../features'

/**
 * microCMSから料金プランマスタの戻り値
 */
export type microCMSPlansReturnType = {
  /**
   * 料金プランマスタ一覧の値を取得する関数
   */
  getPlans: () => (MicroCMS.MicroCMSListContent & microCMSPlansType)[]
  /**
   * 料金プランマスタの値を取得する関数
   */
  getPlan: (id: microCMSPlansType['id']) => (MicroCMS.MicroCMSListContent & microCMSPlansType) | undefined
  /**
   * プランマスタから端末情報を取得する関数
   */
  getPlanTerminals: (obj: microCMSPlansType) => getPlanTerminalsReturnType
}

/**
 * microCMSから料金プランマスタのカスタムフック
 * @return {microCMSPlansReturnType}
 */
export const useMicroCMSPlans = () => {
  // 料金プランマスタ
  const [plans, setPlans] = useState<(MicroCMS.MicroCMSListContent & microCMSPlansType)[]>([])

  /**
   * 初期値をAPIから並行取得する
   */
  useEffect(() => {
    /**
     * microCMSからマスタを取得する関数
     */
    // 料金プランマスタを取得する
    fetch('/api/microcms/fetch/get-plans', { next: { tags: ['microCMS'] } }).then(async (res) => {
      const response = await res.json()

      // 返り値が空のオブジェクトの場合、何もしない
      if (Object.keys(response).length === 0) return

      // 料金プランマスタを更新する
      setPlans((response as MicroCMS.MicroCMSListResponse<microCMSPlansType>).contents)
    })
  }, [])

  /**
   * 料金プランマスタ一覧の値を取得する関数
   * @return {MicroCMS.MicroCMSListContent[]} - 料金プランマスタ一覧の値
   */
  const getPlans = (): (MicroCMS.MicroCMSListContent & microCMSPlansType)[] => plans

  /**
   * 料金プランマスタの値を取得する関数
   * @param {microCMSPlansType['id']} id - 料金プランマスタのID
   * @return {(MicroCMS.MicroCMSListContent & microCMSPlansType) | undefined} - 料金プランマスタの値
   */
  const getPlan = (id: microCMSPlansType['id']): (MicroCMS.MicroCMSListContent & microCMSPlansType) | undefined => plans.find((plan) => plan.id === id)

  return {
    getPlans,
    getPlan,
    getPlanTerminals,
  }
}
