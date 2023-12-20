/**
 * ページ用ヘッダー
 * @module PageHeader
 */

import React from 'react'
import { Header } from '@/components/parts'
import Link from 'next/link'
import { Logo } from '@/components/icon'

/**
 * ページ用ヘッダーのコンポーネントのプロパティ
 */
interface PageHeaderProps {}

/**
 * ページ用ヘッダーのコンポーネント
 * @returns {React.FC} -  ページ用ヘッダーコンポーネント
 */
export const PageHeader: React.FC<PageHeaderProps> = () => {
  return (
    <Header>
      <div className="border-b-4 border-gray-500 py-3 md:py-5">
        <div className="container ">
          <h1>
            <Link href="/">
              <Logo className="w-20 md:w-40" />
            </Link>
          </h1>
        </div>
      </div>
    </Header>
  )
}
