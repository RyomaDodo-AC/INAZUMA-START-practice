import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Logo } from './Logo'

const meta: Meta = {
  title: 'Icon/Logo',
  component: Logo,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Logo>

/**
 * サイトロゴ（デフォルト）
 */
export const Default: Story = {
  args: {
    type: 'default',
  },
}

/**
 * サイトロゴ（白）
 */
export const White: Story = {
  args: {
    type: 'white',
  },
}

/**
 * サイトロゴ（黒）
 */
export const Black: Story = {
  args: {
    type: 'black',
  },
}
