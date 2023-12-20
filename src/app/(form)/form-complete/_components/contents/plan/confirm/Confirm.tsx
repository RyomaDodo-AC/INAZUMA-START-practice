/**
 * 完結フォームプラン選択画面の確認画面内容を定義するコンポーネント
 * @module CompletePlanConfirmContents
 */
import React, { useEffect } from 'react'
import { useCommonFormContext } from '@/app/(form)/_config/context'
import { useMicroCMSContext } from '@/features/context'
import { useFormContext } from 'react-hook-form'
import { ConfirmAmount } from './ConfirmAmount'
import { ConfirmItems } from './ConfirmItems'

/**
 * 完結フォームプラン選択画面の確認画面内容を定義するProps
 * @typedef CompletePlanConfirmContentsProps
 */
export interface CompletePlanConfirmContentsProps {}

/**
 * 完結フォームプラン選択画面の確認画面内容を定義するコンポーネント
 */
export const CompletePlanConfirmContents: React.FC<CompletePlanConfirmContentsProps> = () => {
  return (
    <div className="space-y-14">
      <ConfirmItems />
      <ConfirmAmount />
    </div>
  )
}
