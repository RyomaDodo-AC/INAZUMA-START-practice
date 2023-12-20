import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Minus } from './Minus'

const meta: Meta = {
  title: 'Icon/Minus',
  component: Minus,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Minus>

/**
 * -アイコン
 */
export const Default: Story = {}

/**
 * -アイコン（赤）
 */
export const Red: Story = {
  args: {
    className: 'text-red',
  },
}
