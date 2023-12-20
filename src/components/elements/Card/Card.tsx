/**
 * カード型のコンポーネント
 * @module Card
 */
import React from 'react'

/**
 * カードコンポーネントのプロパティ
 * @typedef {Object} CardProps
 */
export interface CardProps extends React.HTMLAttributes<HTMLLabelElement | HTMLSpanElement> {
  /**
   * 子要素
   */
  children: React.ReactNode
  /**
   * カードを囲むタグをlabel化
   */
  labelType?: boolean
  /**
   * カードの色
   */
  cardColor?: {
    default?: 'black' | 'red' | 'blue' | 'gray'
    active?: 'black' | 'red' | 'blue' | 'gray'
  }
  /**
   * リボンコンテンツ
   */
  ribbon?: {
    /**
     * ラベル
     */
    label?: {
      /**
       * ラベルテキスト
       */
      text: string
      /**
       * ラベルの色
       */
      color?: 'black' | 'red' | 'blue' | 'gray'
    }
    /**
     * おすすめ
     */
    recommend?: {
      /**
       * 表示フラグ
       */
      show: boolean
      /**
       * おすすめの色
       */
      color?: 'black' | 'red' | 'blue' | 'gray'
    }
  }
}

/**
 * カードコンポーネント
 * @param {CardProps} props - カードコンポーネントのプロパティ
 * @returns {React.FC} - カードコンポーネント
 */
export const Card: React.FC<CardProps> = ({ children, cardColor, labelType = false, ribbon, ...cardProps }) => {
  /**
   * カードの基本スタイル
   */
  // クラス
  let { className, ...cardAttributesProps } = cardProps
  className =
    className +
    ' relative block bg-white border rounded-md overflow-hidden [&:has(input:checked)]:outline [&:has(input:checked)]:outline-2 [&:has(input:checked)]:-outline-offset-1 [&:has(input:focus)]:outline [&:has(input:focus)]:outline-2 [&:has(input:focus)]:-outline-offset-1'

  // カードの色
  let cardColorDefaultClass = ''
  // 標準時の色
  switch (cardColor?.default) {
    case 'black':
      cardColorDefaultClass = 'border-black'
      break
    case 'red':
      cardColorDefaultClass = 'border-red'
      break
    case 'blue':
      cardColorDefaultClass = 'border-blue'
      break
    case 'gray':
    default:
      cardColorDefaultClass = 'border-gray-500'
      break
  }
  // アクティブ時の色
  let cardColorActiveClass = ''
  switch (cardColor?.active) {
    case 'black':
      cardColorActiveClass = '[&:has(input:focus)]:outline-blue [&:has(input:checked)]:outline-black'
      break
    case 'red':
      cardColorActiveClass = '[&:has(input:focus)]:outline-blue [&:has(input:checked)]:outline-red'
      break
    case 'blue':
      cardColorActiveClass = '[&:has(input:focus)]:outline-blue [&:has(input:checked)]:outline-blue'
      break
    case 'gray':
    default:
      cardColorActiveClass = '[&:has(input:focus)]:outline-blue [&:has(input:checked)]:outline-gray-700'
      break
  }

  // ラッパーコンポーネント
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return labelType ? (
      <label className={`${className} ${cardColorDefaultClass} ${cardColorActiveClass} cursor-pointer`} {...cardAttributesProps}>
        {children}
      </label>
    ) : (
      <span className={`${className} ${cardColorDefaultClass}`} {...cardAttributesProps}>
        {children}
      </span>
    )
  }

  /**
   * リボンのスタイル
   */
  // ラベル
  let ribbonLabelClass = ''
  switch (ribbon?.label?.color) {
    case 'black':
      ribbonLabelClass = 'text-white bg-black'
      break
    case 'red':
      ribbonLabelClass = 'text-white bg-red'
      break
    case 'blue':
      ribbonLabelClass = 'text-white bg-blue'
      break
    case 'gray':
      ribbonLabelClass = 'text-gray-900 bg-gray-500'
      break
  }
  // おすすめ
  let ribbonRecommendClass = ''
  switch (ribbon?.recommend?.color) {
    case 'black':
      ribbonRecommendClass = 'text-white bg-black'
      break
    case 'red':
      ribbonRecommendClass = 'text-white bg-red'
      break
    case 'blue':
      ribbonRecommendClass = 'text-white bg-blue'
      break
    case 'gray':
      ribbonRecommendClass = 'text-gray-900 bg-gray-500'
      break
  }

  return (
    <Wrapper>
      {ribbon?.recommend?.show && (
        <span className={`absolute left-0 top-0 z-10 inline-block -translate-x-8 translate-y-2.5 rotate-[-40deg] px-8 py-1 text-xs font-bold ${ribbonRecommendClass}`}>おすすめ</span>
      )}
      {children}
      {ribbon?.label?.text && <span className={`absolute right-0 top-0 z-10   inline-block rounded-bl-md px-2 py-1 text-xs font-bold ${ribbonLabelClass}`}>{ribbon.label.text}</span>}
    </Wrapper>
  )
}
