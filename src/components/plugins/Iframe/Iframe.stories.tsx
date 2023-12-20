import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Iframe } from './Iframe'

const meta: Meta<typeof Iframe> = {
  title: 'plugins/Iframe',
  component: Iframe,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Iframe>

/**
 * デフォルト
 */
export const Default: Story = {
  args: {
    url: 'https://bb8301ac.form.kintoneapp.com/public/3a35106fbe10b70f8b449ab9104f8cc9b353cfbdcb6653ba6253d2950267d5f0',
    width: '100%',
    height: '500px',
  },
}
