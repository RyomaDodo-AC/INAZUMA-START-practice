/**
 * フォーム用ヘッダー
 * @module FormHeader
 */
'use client'

import React from 'react'
import { Header } from '@/components/parts'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@/components/icon'

/**
 * フォーム用ヘッダーのコンポーネントのプロパティ
 */
interface FormHeaderProps {
  /**
   * パス名（ほぼStorybook用）
   */
  path?: string
}

/**
 * フォーム用ヘッダーのコンポーネント
 * @returns {React.FC} -  フォーム用ヘッダーコンポーネント
 */
export const FormHeader: React.FC<FormHeaderProps> = ({ path }) => {
  // 現在のパスを取得
  const navigationPathname = usePathname()
  const pathname = path ? path : navigationPathname
  // パスを分割
  const pathArray = pathname ? pathname.split('/') : []

  // 正規表現で先頭一致する現在のパスに応じてコンテンツを切り替え
  let formName = ''
  let formDescription = ''
  switch (pathArray[1]) {
    case 'form-entry':
    case 'form-complete':
      formName = 'お申込みフォーム'
      formDescription = '約５分程度でお申込み手続き完了！'
      break
    case 'form-appoint':
      formName = '電話相談フォーム'
      formDescription = ''
      break
    case 'form-inquiry':
      formName = 'お問い合わせフォーム'
      formDescription = ''
      break
  }

  return (
    <Header>
      <div className="border-b-4 border-gray-500 py-3 md:py-5">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <Logo className="w-20 md:w-40" />
          </Link>
          <div className="flex flex-col items-start">
            {formName && <h1 className="text-base font-bold md:text-xl">{formName}</h1>}
            {formDescription && <p className="text-sm">{formDescription}</p>}
          </div>
        </div>
      </div>
    </Header>
  )
}
