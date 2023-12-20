import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Accordion } from './Accordion'

const meta: Meta<typeof Accordion> = {
  title: 'plugins/Accordion',
  component: Accordion,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Accordion>

/**
 * デフォルト
 */
export const Default: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ',
  },
}

/**
 * 長文コンテンツ
 */
export const LongText: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ'.repeat(100),
  },
}

/**
 * 長文タイトル
 */
export const LongTitle: Story = {
  args: {
    title: 'タイトル'.repeat(100),
    children: 'コンテンツ',
  },
}

/**
 * タイプ（プラス）
 */
export const TypePlus: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ',
    icon: 'plus',
  },
}

/**
 * タイプ（矢印）
 */
export const TypeArrow: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ',
    icon: 'arrow',
  },
}

/**
 * 開いた状態
 */
export const Open: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ',
    open: true,
  },
}

/**
 * 閉じた状態
 */
export const Close: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ',
    open: false,
  },
}

/**
 * カラーバリエーション：黒（ベタ）
 */
export const ColorBlackSolid: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ',
    color: 'black',
    style: 'solid',
  },
}

/**
 * カラーバリエーション：赤（ベタ）
 */
export const ColorRedSolid: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ',
    color: 'red',
    style: 'solid',
  },
}

/**
 * カラーバリエーション：青（ベタ）
 */
export const ColorBlueSolid: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ',
    color: 'blue',
    style: 'solid',
  },
}

/**
 * カラーバリエーション：グレー（ベタ）
 */
export const ColorGraySolid: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ',
    color: 'gray',
    style: 'solid',
  },
}

/**
 * カラーバリエーション：黒（線）
 */
export const ColorBlackLine: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ',
    color: 'black',
    style: 'outline',
  },
}

/**
 * カラーバリエーション：赤（線）
 */
export const ColorRedLine: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ',
    color: 'red',
    style: 'outline',
  },
}

/**
 * カラーバリエーション：青（線）
 */
export const ColorBlueLine: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ',
    color: 'blue',
    style: 'outline',
  },
}

/**
 * カラーバリエーション：グレー（線）
 */
export const ColorGrayLine: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ',
    color: 'gray',
    style: 'outline',
  },
}

/**
 * 線の太さ（ベタ）：太い
 */
export const BorderThick: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ',
    border: 'thick',
    open: true,
  },
}

/**
 * 線の太さ（ベタ）：細い
 */
export const BorderThin: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ',
    border: 'thin',
    open: true,
  },
}

/**
 * 線の太さ（線）：太い
 */
export const BorderThickLine: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ',
    border: 'thick',
    style: 'outline',
    open: true,
  },
}

/**
 * 線の太さ（線）：細い
 */
export const BorderThinLine: Story = {
  args: {
    title: 'タイトル',
    children: 'コンテンツ',
    border: 'thin',
    style: 'outline',
    open: true,
  },
}
