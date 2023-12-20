/**
 * フォームの進捗を表示するコンポーネント
 * @module FormProgress
 */
'use client'

import React from 'react'
import { Flow, FlowProps } from '@/components/parts'
import { usePathname } from 'next/navigation'

/**
 * フォームの進捗を表示するコンポーネントのプロパティ
 */
interface FormProgressProps {
  /**
   * パス名（ほぼStorybook用）
   */
  path?: string
}

/**
 * フォームの進捗を表示するコンポーネント
 * @returns {React.FC} - フォームの進捗を表示するコンポーネント
 */
export const FormProgress: React.FC<FormProgressProps> = ({ path }) => {
  // 現在のパスを取得
  const navigationPathname = usePathname()
  const pathname = path ? path : navigationPathname
  // パスを分割
  const pathArray = pathname ? pathname.split('/') : []

  // 正規表現で先頭一致する現在のパスに応じてコンテンツを切り替え
  const lists: FlowProps['lists'] = []
  switch (pathArray[1]) {
    case 'form-entry':
      switch (pathArray[2]) {
        case 'confirm':
          lists.push({ content: 'お客様情報入力', current: true }, { content: '入力内容確認', current: true }, { content: 'お申込み完了' })
          break
        case 'finish':
          lists.push({ content: 'お客様情報入力', current: true }, { content: '入力内容確認', current: true }, { content: 'お申込み完了', current: true })
          break
        default:
          lists.push({ content: 'お客様情報入力', current: true }, { content: '入力内容確認' }, { content: 'お申込み完了' })
      }
      break
    case 'form-complete':
      switch (pathArray[2]) {
        case 'input':
          lists.push({ content: 'プラン選択', current: true }, { content: 'お客様情報入力', current: true }, { content: '入力内容確認' }, { content: 'お申込み完了' })
          break
        case 'confirm':
          lists.push({ content: 'プラン選択', current: true }, { content: 'お客様情報入力', current: true }, { content: '入力内容確認', current: true }, { content: 'お申込み完了' })
          break
        case 'finish':
          lists.push({ content: 'プラン選択', current: true }, { content: 'お客様情報入力', current: true }, { content: '入力内容確認', current: true }, { content: 'お申込み完了', current: true })
          break
        default:
          lists.push({ content: 'プラン選択', current: true }, { content: 'お客様情報入力' }, { content: '入力内容確認' }, { content: 'お申込み完了' })
      }
      break
    case 'form-appoint':
      switch (pathArray[2]) {
        case 'confirm':
          lists.push({ content: 'お客様情報入力', current: true }, { content: '入力内容確認', current: true }, { content: '電話予約完了' })
          break
        case 'finish':
          lists.push({ content: 'お客様情報入力', current: true }, { content: '入力内容確認', current: true }, { content: '電話予約完了', current: true })
          break
        default:
          lists.push({ content: 'お客様情報入力', current: true }, { content: '入力内容確認' }, { content: '電話予約完了' })
      }
      break
    case 'form-inquiry':
      switch (pathArray[2]) {
        case 'confirm':
          lists.push({ content: 'お客様情報入力', current: true }, { content: '入力内容確認', current: true }, { content: 'お問い合わせ完了' })
          break
        case 'finish':
          lists.push({ content: 'お客様情報入力', current: true }, { content: '入力内容確認', current: true }, { content: 'お問い合わせ完了', current: true })
          break
        default:
          lists.push({ content: 'お客様情報入力', current: true }, { content: '入力内容確認' }, { content: 'お問い合わせ完了' })
      }
      break
  }

  return <>{lists && <Flow lists={lists} vertical={false} />}</>
}
