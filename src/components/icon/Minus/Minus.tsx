/**
 * -アイコン
 * @module Minus
 */
import React from 'react'

interface MinusProps {
  /**
   * 色はTailwindの`text-**`で付与する
   */
  className?: string
}

/**
 * +アイコンコンポーネント
 * @param {MinusProps} props - +アイコンコンポーネントのプロパティ
 * @returns {React.FC} - +アイコンコンポーネント
 */
export const Minus: React.FC<MinusProps> = ({ className = 'text-black' }) => {
  return (
    <svg className={`${className}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
