/**
 * microCMSマスタのコンテキストコンポーネントProvider
 * @module MicroCMSContextProvider
 */
'use client'
import React from 'react'
import { MicroCMSContext } from './Context'
import { getPriceId, getProductId } from './features'
import {
  useMicroCMSPlans,
  microCMSPlansReturnType,
  useMicroCMSTerminals,
  microCMSTerminalsReturnType,
  useMicroCMSAccessories,
  microCMSAccessoriesReturnType,
  useMicroCMSGuarantees,
  microCMSGuaranteesReturnType,
  useMicroCMSOptions,
  microCMSOptionsReturnType,
  useMicroCMSOthers,
  microCMSOthersReturnType,
} from './hooks'

/**
 * microCMSマスタのコンテキストコンポーネントのProps
 */
export type MicroCMSContextProviderProps = {
  /**
   * 子要素
   */
  children: React.ReactNode
}

/**
 * microCMSマスタのコンテキストの型
 */
export interface MicroCMSContextProviderMethods
  extends microCMSPlansReturnType,
    microCMSTerminalsReturnType,
    microCMSAccessoriesReturnType,
    microCMSGuaranteesReturnType,
    microCMSOptionsReturnType,
    microCMSOthersReturnType {
  /**
   * 料金プランIDを取得する
   */
  getPriceId: typeof getPriceId
  /**
   * 商品IDを取得する
   */
  getProductId: typeof getProductId
}

/**
 * microCMSマスタのコンテキストコンポーネント
 * @param {React.ReactNode} children - 子要素
 * @return {React.FC} - microCMSマスタのコンテキストコンポーネント
 */
export const MicroCMSContextProvider: React.FC<MicroCMSContextProviderProps> = ({ children }) => {
  // 料金プランマスタ
  const plans = useMicroCMSPlans()
  // 端末マスタ
  const terminals = useMicroCMSTerminals()
  // 端末補償マスタ
  const guarantees = useMicroCMSGuarantees()
  // 付属品マスタ
  const accessories = useMicroCMSAccessories()
  // オプションマスタ
  const options = useMicroCMSOptions()
  // その他マスタ
  const others = useMicroCMSOthers()

  // microCMSマスタのコンテキストメソッド
  const methods: MicroCMSContextProviderMethods = {
    getPriceId,
    getProductId,
    ...plans,
    ...terminals,
    ...guarantees,
    ...accessories,
    ...options,
    ...others,
  }

  // microCMSマスタのコンテキスト
  return <MicroCMSContext.Provider value={methods}>{children}</MicroCMSContext.Provider>
}
