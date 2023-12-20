/**
 * 共通フォームのユニークIDフック
 */
'use client'
import { useState } from 'react'

/**
 * 共通フォームのユニークIDフックの戻り値
 */
export type commonFormUniqueIdReturnType = {
  /**
   * ユニークなIDを取得する関数
   */
  getUniqueId: () => string | undefined
  /**
   * ユニークなIDを生成して保存する関数
   */
  createUniqueId: () => void
}

/**
 * 共通フォームのユニークIDフック
 */
export const useCommonFormUniqueId = () => {
  /**
   * 直アクセスを防止するためのユニークなID
   */
  const [uniqueId, setUniqueId] = useState<string>()

  // ユニークなIDを取得する
  const getUniqueId: commonFormUniqueIdReturnType['getUniqueId'] = () => {
    return uniqueId
  }

  // ユニークなIDを生成して保存する
  const createUniqueId: commonFormUniqueIdReturnType['createUniqueId'] = () => {
    const id = Math.random().toString(32).substring(2)
    setUniqueId(id)
  }

  return {
    getUniqueId,
    createUniqueId,
  }
}
