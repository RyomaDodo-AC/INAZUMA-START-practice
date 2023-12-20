import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Lock } from './Lock'

const meta: Meta = {
  title: 'Icon/Lock',
  component: Lock,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Lock>

/**
 * 鍵アイコン
 */
export const Default: Story = {}

/**
 * 鍵アイコン（赤）
 */
export const Red: Story = {
  args: {
    className: 'text-red',
  },
}
