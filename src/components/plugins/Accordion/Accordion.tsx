/**
 * アコーディオン
 * @see https://preline.co/docs/accordion.html
 * @module Accordion
 */
'use client'
import React from 'react'
import { useEffect } from 'react'
import { Arrow, Plus, Minus } from '@/components/icon'

/**
 * アコーディオンコンポーネントのプロパティ
 * @typedef {Object} AccordionProps
 * @property {string} title - アコーディオンのタイトル
 * @property {React.ReactNode} children - アコーディオンの中身
 * @property {boolean} open - 初期状態で開くか
 */
interface AccordionProps {
  /**
   * アコーディオンのタイトル
   */
  title: string
  /**
   * アコーディオンの中身
   */
  children: React.ReactNode
  /**
   * 初期状態で開くか（false：閉じる true：開く）
   */
  open?: boolean
  /**
   * アイコンの種類
   */
  icon?: 'arrow' | 'plus'
  /**
   * アコーディオンのスタイル
   */
  style?: 'solid' | 'outline'
  /**
   * アコーディオンの色
   */
  color?: 'black' | 'red' | 'blue' | 'gray'
  /**
   * 線の太さ
   */
  border?: 'thin' | 'thick'
}

/**
 * アコーディオンコンポーネント
 * @param {AccordionProps} props - アコーディオンコンポーネントのプロパティ
 * @returns {React.FC} - アコーディオンコンポーネント
 * @example
 * <Accordion title="タイトル" open={true}>
 * <p>中身</p>
 * </Accordion>
 */
export const Accordion: React.FC<AccordionProps> = ({ title, children, color = 'blue', style = 'solid', open = false, icon = 'plus', border = 'thick' }) => {
  // prelineをimport
  useEffect(() => {
    import('preline')
  }, [])

  // アコーディオンのクラス名を設定
  let hsAccordionClass = 'hs-accordion'
  const hsAccordionToggleClass = 'hs-accordion-toggle hs-accordion-active:rounded-b-none'
  let hsAccordionContentClass = 'hs-accordion-content hidden'
  if (open) {
    hsAccordionClass = 'hs-accordion active'
    hsAccordionContentClass = 'hs-accordion-content'
  }

  // 色
  let colorClass = ''
  let iconColorClass = ''
  switch (color) {
    case 'black':
      hsAccordionContentClass += ' border-black'
      switch (style) {
        case 'solid':
          colorClass = 'border-transparent text-white bg-black hover:bg-gray-900'
          iconColorClass = 'text-white'
          break
        case 'outline':
          colorClass = 'border-black text-black bg-white hover:text-white hover:bg-black'
          iconColorClass = 'text-black group-hover:text-white'
          break
      }
      break
    case 'red':
      hsAccordionContentClass += ' border-red'
      switch (style) {
        case 'solid':
          colorClass = 'border-transparent text-white bg-red hover:bg-red-light'
          iconColorClass = 'text-white'
          break
        case 'outline':
          colorClass = 'border-red text-red bg-white hover:text-white hover:bg-red'
          iconColorClass = 'text-red group-hover:text-white'
          break
      }
      break
    case 'blue':
      hsAccordionContentClass += ' border-blue'
      switch (style) {
        case 'solid':
          colorClass = 'border-transparent text-white bg-blue hover:bg-blue-light'
          iconColorClass = 'text-white'
          break
        case 'outline':
          colorClass = 'border-blue text-blue bg-white hover:text-white hover:bg-blue'
          iconColorClass = 'text-blue group-hover:text-white'
          break
      }
      break
    case 'gray':
      hsAccordionContentClass += ' border-gray-500'
      switch (style) {
        case 'solid':
          colorClass = 'border-transparent text-gray-900 bg-gray-500 hover:bg-gray-300'
          iconColorClass = 'text-gray-900'
          break
        case 'outline':
          colorClass = 'border-gray-500 text-gray-500 bg-white hover:border-transparent hover:text-gray-900 hover:bg-gray-500'
          iconColorClass = 'text-gray-500 group-hover:text-gray-900'
          break
      }
      break
  }

  // アイコンの種類によってコンポーネントを変更
  let iconComponent = <></>
  switch (icon) {
    case 'arrow':
      iconComponent = (
        <span className="absolute inset-y-0 right-4 m-auto inline-flex h-full w-3.5 items-center justify-center">
          <Arrow type="angle-down" className={`${iconColorClass} block hs-accordion-active:hidden`} />
          <Arrow type="angle-up" className={`${iconColorClass} hidden hs-accordion-active:block`} />
        </span>
      )
      break
    case 'plus':
      iconComponent = (
        <span className="absolute inset-y-0 right-4 m-auto inline-flex h-full w-3.5 items-center justify-center">
          <Plus className={`${iconColorClass} block hs-accordion-active:hidden`} />
          <Minus className={`${iconColorClass} hidden hs-accordion-active:block`} />
        </span>
      )
      break
  }

  // 線の太さ
  let borderClass = ''
  switch (border) {
    case 'thin':
      borderClass = 'border'
      break
    case 'thick':
      borderClass = 'border-2'
      break
  }

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="hs-accordion-group">
      <div className={`${hsAccordionClass}`}>
        <button
          className={`${hsAccordionToggleClass} ${colorClass} group relative inline-flex w-full items-center gap-2 rounded-md ${borderClass} py-2.5 pe-10 ps-4 text-left text-base font-bold transition-all`}
          type="button"
        >
          {title}
          {iconComponent}
        </button>
        <div className={`${hsAccordionContentClass} w-full overflow-hidden rounded-md rounded-t-none ${borderClass} border-t-0 transition-[height] duration-300`}>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  )
}
