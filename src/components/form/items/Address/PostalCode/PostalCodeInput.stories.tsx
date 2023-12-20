import type { Meta, StoryObj } from '@storybook/react'
import { PostalCodeInput } from './PostalCodeInput'

const meta: Meta<typeof PostalCodeInput> = {
  title: 'Form/Items/Address/PostalCode/Input',
  component: PostalCodeInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PostalCodeInput>

/**
 * 基本形
 */
export const Base: Story = {
  args: {
    nameId: 'base',
  },
}

/**
 * 郵便番号検索のリンクを表示
 */
export const Link: Story = {
  args: {
    nameId: 'link',
    linkDisplay: true,
  },
}

/**
 * InputBox
 */
export const InputBox: Story = {
  args: {
    nameId: 'input-box',
    label: '郵便番号',
    note: { list: ['ハイフンなしで入力してください'] },
    required: true,
    linkDisplay: true,
  },
}

/**
 * ハイフンあり
 */
export const Hyphen: Story = {
  args: {
    nameId: 'hyphen',
    label: '郵便番号',
    note: { list: ['ハイフンありで入力してください'] },
    required: true,
    hyphen: true,
  },
}

/**
 * オートコンプリート
 */
export const AutoComplete: Story = {
  args: {
    nameId: 'auto-complete',
    label: '郵便番号',
    required: false,
    autoComplete: 'postal-code',
  },
}
