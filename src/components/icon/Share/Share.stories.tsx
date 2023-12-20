import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Share } from './Share'

const meta: Meta = {
  title: 'Icon/Share',
  component: Share,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Share>

/**
 * 共有アイコン
 */
export const Default: Story = {}

/**
 * 共有アイコン（赤）
 */
export const Red: Story = {
  args: {
    className: 'text-red',
  },
}
