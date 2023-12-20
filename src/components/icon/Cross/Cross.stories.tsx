import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Cross } from './Cross'

const meta: Meta = {
  title: 'Icon/Cross',
  component: Cross,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Cross>

/**
 * バツアイコン
 */
export const Default: Story = {}

/**
 * バツアイコン（赤）
 */
export const Red: Story = {
  args: {
    className: 'text-red',
  },
}
