import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Arrow } from './Arrow'

const meta: Meta<typeof Arrow> = {
  title: 'Icon/Arrow',
  component: Arrow,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Arrow>

/**
 * 右矢印（不等号型）
 */
export const AngleRight: Story = {
  args: {
    type: 'angle-right',
  },
}

/**
 * 左矢印（不等号型）
 */
export const AngleLeft: Story = {
  args: {
    type: 'angle-left',
  },
}

/**
 * 上矢印（不等号型）
 */
export const AngleUp: Story = {
  args: {
    type: 'angle-up',
  },
}

/**
 * 下矢印（不等号型）
 */
export const AngleDown: Story = {
  args: {
    type: 'angle-down',
  },
}
