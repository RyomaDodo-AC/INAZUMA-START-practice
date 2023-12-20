import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { PageHeader } from './PageHeader'

const meta: Meta<typeof PageHeader> = {
  title: 'page/page/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof PageHeader>

/**
 * デフォルト
 */
export const Default: Story = {}
