/**
 * 矢印アイコン
 * @module Arrow
 */
import React from 'react'

interface ArrowProps {
  /**
   * 矢印の種類を表す文字列
   */
  type: 'angle-right' | 'angle-left' | 'angle-up' | 'angle-down'
  /**
   * 色はTailwindの`text-**`で付与する
   */
  className?: string
}

/**
 * 矢印アイコンコンポーネント
 * @param {ArrowProps} props 矢印アイコンのプロパティ
 * @returns {JSX.Element} 矢印アイコンの要素
 */
export const Arrow: React.FC<ArrowProps> = ({ type, className = 'text-black' }) => {
  // 矢印の形を定義してSVGの中身を返す
  let arrowIcon: React.ReactNode
  let width: number = 0
  let height: number = 0

  switch (type) {
    case 'angle-right':
      arrowIcon = <path d="M5 2L10.6869 8.16086C10.8637 8.35239 10.8637 8.64761 10.6869 8.83914L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      width = 16
      height = 16
      break
    case 'angle-left':
      arrowIcon = <path d="M10.6869 2L5 8.16086C4.82315 8.35239 4.82315 8.64761 5 8.83914L10.6869 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      width = 16
      height = 16
      break
    case 'angle-up':
      arrowIcon = <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      width = 16
      height = 16
      break
    case 'angle-down':
      arrowIcon = <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      width = 16
      height = 16
      break
    default:
      arrowIcon = null
  }

  return (
    <svg className={`${className}`} width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {arrowIcon}
    </svg>
  )
}
