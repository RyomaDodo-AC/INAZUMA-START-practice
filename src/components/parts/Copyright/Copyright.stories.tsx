import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Copyright } from './Copyright'

const meta: Meta<typeof Copyright> = {
  title: 'parts/Copyright',
  component: Copyright,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Copyright>

/**
 * デフォルト
 */
export const Default: Story = {}

/**
 * カラーバリエーション：黒
 */
export const Black: Story = {
  args: {
    color: 'black',
  },
}

/**
 * カラーバリエーション：赤
 */
export const Red: Story = {
  args: {
    color: 'red',
  },
}

/**
 * カラーバリエーション：青
 */
export const Blue: Story = {
  args: {
    color: 'blue',
  },
}

/**
 * カラーバリエーション：グレー
 */
export const Gray: Story = {
  args: {
    color: 'gray',
  },
}

/**
 * カラーバリエーション：白
 */
export const White: Story = {
  args: {
    color: 'white',
  },
}
