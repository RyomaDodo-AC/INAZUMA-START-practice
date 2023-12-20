/**
 * SSL対応表記コンテンツ
 * @module Ssl
 */
import React from 'react'
import { Lock } from '@/components/icon/Lock/Lock'

/**
 * SSL対応表記コンポーネントのプロパティ
 */
interface SslProps {
  /**
   * 色
   */
  color?: 'black'
}

/**
 * SSL対応表記コンポーネント
 * @param {SslProps} props - SSL対応表記コンポーネントのプロパティ
 * @returns {React.FC} - SSL対応表記コンポーネント
 * @example
 * <Ssl />
 */
export const Ssl: React.FC<SslProps> = ({ color = 'black' }) => {
  // 色
  let colorClass = ''
  let iconColorClass = ''
  switch (color) {
    case 'black':
      colorClass = 'text-black bg-gray-300'
      iconColorClass = 'text-black'
      break
  }

  return (
    <div className={`${colorClass} m-auto flex max-w-2xl items-center justify-center gap-x-6 p-4 text-xs md:p-8 md:text-base`}>
      <div className="w-6 md:w-9">
        <Lock className={`${iconColorClass}`} />
      </div>
      <p>当サイトではSSLに対応しています。お客様の大切な情報を暗号化して送信していますので安心してご利用いただけます。</p>
    </div>
  )
}
