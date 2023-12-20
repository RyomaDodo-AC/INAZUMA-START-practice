/**
 * microCMSマスタのコンテキスト
 * @module MicroCMSContext
 */
'use client'
import { useContext } from 'react'
import { createContext } from 'react'
import { MicroCMSContextProviderMethods } from './Provider'

/**
 * microCMSマスタのコンテキストを作成する
 */
export const MicroCMSContext = createContext<MicroCMSContextProviderMethods>({
  getPlans: () => [],
  getPlan: () => undefined,
  getPlanTerminals: () => [],
  getTerminals: () => [],
  getTerminal: () => undefined,
  getTerminalDetail: () => undefined,
  getTerminalColors: () => [],
  getTerminalRecurring: () => [],
  getTerminalAccessories: () => [],
  getAccessories: () => [],
  getAccessory: () => undefined,
  getGuarantees: () => [],
  getGuarantee: () => undefined,
  getOptions: () => [],
  getOption: () => undefined,
  getOthers: () => [],
  getOther: () => undefined,
  getPriceId: () => undefined,
  getProductId: () => undefined,
})

/**
 * microCMSマスタのコンテキストを使用する
 */
export const useMicroCMSContext = () => useContext(MicroCMSContext)
