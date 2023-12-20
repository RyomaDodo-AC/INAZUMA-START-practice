/**
 * Stripeマスタのコンテキストコンポーネント
 * @modue StripeContext
 */
'use client'
import { useContext } from 'react'
import { createContext } from 'react'
import { StripeContextProviderMethods } from './Provider'

/**
 * Stripeマスタのコンテキストを作成する
 */
export const StripeContext = createContext<StripeContextProviderMethods>({
  getPrices: () => [],
  getPrice: () => undefined,
  getProducts: () => [],
  getProduct: () => undefined,
  getCoupons: () => [],
  getCoupon: () => undefined,
  translateInterval: () => '',
  getNextPrice: () => undefined,
  getLastPrice: () => undefined,
  getNextPriceIds: () => [],
})

/**
 * Stripeマスタのコンテキストコンポーネントを使用する
 */
export const useStripeContext = () => useContext(StripeContext)
