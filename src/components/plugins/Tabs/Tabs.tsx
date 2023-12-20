/**
 * タブを表示するコンポーネント
 * @see https://preline.co/docs/tabs.html
 * @module Tabs
 */
'use client'
import React from 'react'
import { useEffect } from 'react'

/**
 * タブのコンテンツオブジェクト
 */
export interface TabContent {
  /**
   * タブのタイトル
   */
  label: React.ReactNode
  /**
   * タブの中身
   */
  content: React.ReactNode
  /**
   * 初期状態で開くか
   */
  open?: boolean
  /**
   * ID（1つのページ内でユニークであること）
   */
  id: string
}

/**
 * タブコンポーネントのプロパティ
 */
export interface TabsProps {
  /**
   * タブのコンテンツ配列
   */
  tabs: TabContent[]
  /**
   * タブの色
   */
  color?: 'black' | 'red' | 'blue' | 'gray'
  /**
   * タブのスタイル
   * @todo レスポンシブできるようにする
   */
  style?: {
    default: 'underline' | 'button'
    // xs?: 'underline' | 'button'
    // sm?: 'underline' | 'button'
    // md?: 'underline' | 'button'
  }
  /**
   * タブコントローラーのサイズ
   */
  size?: {
    default: 'xs' | 'sm' | 'md'
    xs?: 'xs' | 'sm' | 'md'
    sm?: 'xs' | 'sm' | 'md'
    md?: 'xs' | 'sm' | 'md'
  }
}

/**
 * タブコンポーネント
 * @param {TabsProps} props - タブコンポーネントのプロパティ
 * @returns {React.FC} - タブコンポーネント
 * @todo スタイルをレスポンシブにする
 * @todo サイズをレスポンシブにしているがなぜか適用されないことがあるのを修正する
 */
export const Tabs: React.FC<TabsProps> = ({ tabs, color = 'blue', style = { default: 'underline' }, size = { default: 'sm' } }) => {
  // prelineをimport
  useEffect(() => {
    import('preline')
  }, [])

  // 開いているタブの初期値（初期値をどれも有していない場合は0番目を開く）
  const openTabId = tabs.find((tab) => tab.open === true)?.id || tabs[0].id

  const tabNavs = tabs.map((tab) => {
    const openClass = tab.id === openTabId ? 'active' : ''

    // 色
    let colorClass = ''
    switch (color) {
      case 'black':
        colorClass = 'bg-gray-300 text-gray-900 hs-tab-active:bg-black hs-tab-active:text-white'
        break
      case 'red':
        colorClass = 'bg-gray-300 text-gray-900 hs-tab-active:bg-red hs-tab-active:text-white'
        break
      case 'blue':
        colorClass = 'bg-gray-300 text-gray-900 hs-tab-active:bg-blue hs-tab-active:text-white'
        break
      case 'gray':
        colorClass = 'bg-gray-300 text-gray-900 hs-tab-active:bg-gray-900 hs-tab-active:text-white'
        break
    }

    // タイプ
    let typeClass = ''
    switch (style.default) {
      case 'underline':
        typeClass = ` border-b-transparent rounded-t-md`
        break
      case 'button':
        typeClass = ` rounded-md min-w-[32%]`
        break
    }

    // サイズ
    let sizeClass = ''
    Object.entries(size).forEach(([key, value]) => {
      const responsiveKey = key !== 'default' ? `${key}:` : ''
      switch (value) {
        case 'xs':
          sizeClass += ` ${responsiveKey}text-xs ${responsiveKey}px-3 ${responsiveKey}py-1.5`
          break
        case 'sm':
          sizeClass += ` ${responsiveKey}text-sm ${responsiveKey}px-4 ${responsiveKey}py-3`
          break
        case 'md':
          sizeClass += ` ${responsiveKey}text-base ${responsiveKey}px-4 ${responsiveKey}py-3`
          break
      }
    })

    return (
      <button
        key={tab.id}
        type="button"
        className={`${openClass} ${colorClass} ${typeClass} ${sizeClass} inline-flex flex-1 items-center justify-center border text-center font-bold`}
        id={`tab-item-${tab.id}`}
        data-hs-tab={`#tab-${tab.id}`}
        aria-controls={`tab-${tab.id}`}
        role="tab"
      >
        {tab.label}
      </button>
    )
  })

  const tabContents = tabs.map((tab) => {
    const openClass = tab.id === openTabId ? '' : 'hidden'
    return (
      <div key={tab.id} id={`tab-${tab.id}`} className={`${openClass}`} role="tabpanel" aria-labelledby={`tab-${tab.id}`}>
        {tab.content}
      </div>
    )
  })

  return (
    <>
      <div className={`${style.default === 'underline' && 'border-b border-gray-700'}`}>
        <nav className={`${style.default === 'button' && 'flex-wrap'} flex ${size.default === 'xs' ? 'gap-1' : 'gap-2'}`} aria-label="Tabs" role="tablist">
          {tabNavs}
        </nav>
      </div>

      <div>{tabContents}</div>
    </>
  )
}
