import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Plus } from './Plus'

const meta: Meta = {
  title: 'Icon/Plus',
  component: Plus,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Plus>

/**
 * +アイコン
 */
export const Default: Story = {}

/**
 * +アイコン（赤）
 */
export const Red: Story = {
  args: {
    className: 'text-red',
  },
}
