import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Ssl } from './Ssl'

const meta: Meta<typeof Ssl> = {
  title: 'form/parts/Ssl',
  component: Ssl,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Ssl>

/**
 * デフォルト（黒）
 */
export const Default: Story = {}

/**
 * カラーバリエーション：黒
 */
export const ColorBlack: Story = {
  args: {
    color: 'black',
  },
}
