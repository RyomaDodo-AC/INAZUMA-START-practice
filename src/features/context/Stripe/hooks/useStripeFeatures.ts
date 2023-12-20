/**
 * マスタを加工する関数フック
 */
'use client'
import Stripe from 'stripe'
import { stripePriceReturnType } from './useStripePrices'
import { priceMeta } from '../types'

/**
 * マスタを加工する関数フックの戻り値
 */
export type stripeMastersReturnType = {
  /**
   * 次の料金を取得する関数
   */
  getNextPrice: (id: Stripe.Price['id']) => Stripe.Price | undefined
  /**
   * 最後の料金を取得する関数
   */
  getLastPrice: (id: Stripe.Price['id']) => Stripe.Price | undefined
  /**
   * 最初から最後までの料金IDを取得する関数
   */
  getNextPriceIds: (id: Stripe.Price['id']) => Stripe.Price['id'][]
}

/**
 * マスタを加工する関数のカスタムフック
 */
export const useStripeFeatures = ({ prices }: { prices: stripePriceReturnType }): stripeMastersReturnType => {
  /**
   * 料金マスタのカスタムフックから値を取得する
   */
  const { getPrices, getPrice } = prices

  /**
   * 次の料金オブジェクトを取得する関数
   * @param {Stripe.Price['id']} priceId - 現在の料金オブジェクトのID
   * @returns {Stripe.Price | undefined} - 次の料金オブジェクト
   */
  const getNextPrice = (priceId: Stripe.Price['id']): Stripe.Price | undefined => {
    // 料金マスタ一覧が存在しない場合
    if (!getPrices()) return undefined

    // 料金マスタ一覧から現在の料金オブジェクトを取得する
    const currentPrice = getPrice(priceId)

    // 現在の料金オブジェクトが存在しない場合
    if (!currentPrice) return undefined

    // 現在の料金オブジェクトのmetaデータから次の料金オブジェクトのIDを取得する
    const metadata: priceMeta = currentPrice.metadata
    const nextPriceId = metadata.next_price_id

    // 次の料金オブジェクトのIDが存在しないか'0'の場合
    if (!nextPriceId || nextPriceId === '0') return undefined

    // 次の料金オブジェクトを返す
    return getPrice(nextPriceId)
  }

  /**
   * 最後の料金オブジェクトを取得する関数
   * getNextPrice関数を再帰的に呼び出して最後の料金オブジェクトを取得する
   */
  const getLastPrice = (priceId: Stripe.Price['id']): Stripe.Price | undefined => {
    // 料金マスタ一覧が存在しない場合
    if (!getPrices()) return undefined

    // 料金マスタ一覧から現在の料金オブジェクトを取得する
    const currentPrice = getPrice(priceId)

    // 現在の料金オブジェクトが存在しない場合
    if (!currentPrice) return undefined

    // 現在の料金オブジェクトのmetaデータから次の料金オブジェクトのIDを取得する
    const metadata: priceMeta = currentPrice.metadata

    // 次の料金オブジェクトのIDが存在しないか'0'の場合は現在の料金オブジェクトを返す
    if (!metadata.next_price_id || metadata.next_price_id === '0') return currentPrice

    // 次の料金オブジェクトを取得する
    const nextPrice = getNextPrice(priceId)

    // 次の料金オブジェクトが存在しない場合は現在の料金オブジェクトを返す
    if (!nextPrice) return currentPrice

    // 次の料金オブジェクトを引数にして再帰的に呼び出す
    return getLastPrice(nextPrice.id)
  }

  /**
   * 最初から最後までの料金IDを取得する関数
   * @param {Stripe.Price['id']} priceId - 現在の料金オブジェクトのID
   * @returns {Stripe.Price[]} - 最初から最後までの料金ID
   */
  const getNextPriceIds = (priceId: Stripe.Price['id']): Stripe.Price['id'][] => {
    // 料金マスタ一覧が存在しない場合
    if (!getPrices()) return []

    // 料金マスタ一覧から現在の料金オブジェクトを取得する
    const currentPrice = getPrice(priceId)

    // 現在の料金オブジェクトが存在しない場合
    if (!currentPrice) return []

    // 現在の料金オブジェクトのmetaデータから次の料金オブジェクトのIDを取得する
    const metadata: priceMeta = currentPrice.metadata
    const nextPriceId = metadata.next_price_id

    // 次の料金オブジェクトのIDが存在しないか'0'の場合は現在の料金オブジェクトのIDを返す
    if (!nextPriceId || nextPriceId === '0') return [currentPrice.id]

    // 次の料金オブジェクトを取得する
    const nextPrice = getNextPrice(priceId)

    // 次の料金オブジェクトが存在しない場合は現在の料金オブジェクトのIDを返す
    if (!nextPrice) return [currentPrice.id]

    // 次の料金オブジェクトを引数にして再帰的に呼び出す
    return [currentPrice.id, ...getNextPriceIds(nextPrice.id)]
  }

  return {
    getNextPrice,
    getLastPrice,
    getNextPriceIds,
  }
}
