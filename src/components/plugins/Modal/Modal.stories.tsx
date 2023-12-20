import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'plugins/Modal',
  component: Modal,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Modal>

/**
 * デフォルト（インライン）
 */
export const Default: Story = {
  args: {
    text: 'モーダル',
    type: 'inline',
    id: 'Default',
    modalTitle: 'Default',
    children: 'コンテンツ'.repeat(100),
  },
}

/**
 * モーダルタイトル無し
 */
export const NoTitle: Story = {
  args: {
    text: 'モーダル',
    type: 'inline',
    id: 'NoTitle',
    children: 'コンテンツ'.repeat(100),
  },
}
