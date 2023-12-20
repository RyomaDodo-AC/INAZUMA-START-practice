/**
 * microCMSから端末マスタ
 */
'use client'
import { useState, useEffect } from 'react'
import type MicroCMS from 'microcms-js-sdk'
import { microCMSTerminalsType } from '../types'
import {
  getTerminalDetail,
  getTerminalColors,
  getTerminalColorsReturnType,
  getTerminalRecurring,
  getTerminalRecurringReturnType,
  getTerminalAccessories,
  getTerminalAccessoriesReturnType,
} from '../features'

/**
 * microCMSから端末マスタの戻り値
 */
export type microCMSTerminalsReturnType = {
  /**
   * 端末マスタ一覧の値を取得する関数
   */
  getTerminals: () => (MicroCMS.MicroCMSListContent & microCMSTerminalsType)[]
  /**
   * 端末マスタの値を取得する関数
   */
  getTerminal: (id: microCMSTerminalsType['id']) => (MicroCMS.MicroCMSListContent & microCMSTerminalsType) | undefined
  /**
   * 端末マスタから端末情報を取得する関数
   */
  getTerminalDetail: ({
    obj,
    color,
    recurring,
  }: {
    obj: microCMSTerminalsType
    color: microCMSTerminalsType['terminals'][0]['colorName']
    recurring: microCMSTerminalsType['terminals'][0]['recurring'][0] | ''
  }) => microCMSTerminalsType['terminals'][0] | undefined
  /**
   * 端末マスタから色情報を取得する関数
   */
  getTerminalColors: (obj: microCMSTerminalsType) => getTerminalColorsReturnType
  /**
   * 端末マスタから端末代金情報を取得する関数
   */
  getTerminalRecurring: ({ obj, color }: { obj: microCMSTerminalsType; color: microCMSTerminalsType['terminals'][0]['colorName'] }) => getTerminalRecurringReturnType
  /**
   * 端末マスタから付属品を取得する関数
   */
  getTerminalAccessories: (obj: microCMSTerminalsType) => getTerminalAccessoriesReturnType
}

/**
 * microCMSから端末マスタのカスタムフック
 * @return {microCMSTerminalsReturnType}
 */
export const useMicroCMSTerminals = () => {
  // 端末マスタ
  const [terminals, setTerminals] = useState<(MicroCMS.MicroCMSListContent & microCMSTerminalsType)[]>([])

  /**
   * 初期値をAPIから並行取得する
   */
  useEffect(() => {
    /**
     * microCMSからマスタを取得する関数
     */
    // 端末マスタを取得する
    fetch('/api/microcms/fetch/get-terminals', { next: { tags: ['microCMS'] } }).then(async (res) => {
      const response = await res.json()

      // 返り値が空のオブジェクトの場合、何もしない
      if (Object.keys(response).length === 0) return

      // 端末マスタを更新する
      setTerminals((response as MicroCMS.MicroCMSListResponse<microCMSTerminalsType>).contents)
    })
  }, [])

  /**
   * 端末マスタ一覧の値を取得する関数
   * @return {MicroCMS.MicroCMSListContent[]}
   */
  const getTerminals = (): (MicroCMS.MicroCMSListContent & microCMSTerminalsType)[] => terminals

  /**
   * 端末マスタの値を取得する関数
   * @param {microCMSTerminalsType['id']} id - 端末マスタのID
   * @return {(MicroCMS.MicroCMSListContent & microCMSTerminalsType) | undefined} - 端末マスタの値
   */
  const getTerminal = (id: microCMSTerminalsType['id']): (MicroCMS.MicroCMSListContent & microCMSTerminalsType) | undefined => terminals.find((terminal) => terminal.id === id)

  return { getTerminals, getTerminal, getTerminalDetail, getTerminalColors, getTerminalRecurring, getTerminalAccessories }
}
