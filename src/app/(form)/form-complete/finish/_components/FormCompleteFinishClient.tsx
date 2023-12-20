/**
 * 完結フォームの完了画面のクライアントサイドコンポーネント
 */
'use client'
import React, { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useCommonFormContext } from '@/app/(form)/_config/context'
import { NODE_ENV } from '@/config'

export const FormCompleteFinishClient: React.FC = () => {
  /**
   * 初期設定
   */
  // コンテキストから値を取得
  const { getUniqueId, resetValues } = useCommonFormContext()

  // フォームの情報をリセット
  useEffect(() => {
    resetValues()
  }, [resetValues])

  /**
   * 直アクセスの場合は入力画面に戻る
   */
  // routerの設定
  const router = useRouter()
  const pathname = usePathname()

  // ユニークIDがundefinedの場合もしくは開発環境以外の場合は入力画面に戻る
  if (!getUniqueId() && NODE_ENV !== 'development') {
    router.push(pathname.replace(/\/finish$/, ''))
    return null
  }

  return <></>
}
