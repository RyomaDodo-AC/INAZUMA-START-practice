import type { Meta, StoryObj } from '@storybook/react'
import { TelInput } from './TelInput'

const meta: Meta<typeof TelInput> = {
  title: 'Form/Items/Tel/Input',
  component: TelInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TelInput>

/**
 * 基本形
 */
export const Base: Story = {
  args: {
    nameId: 'base',
  },
}

/**
 * InputBox
 */
export const InputBox: Story = {
  args: {
    nameId: 'input-box',
    label: '電話番号',
    note: { list: ['ハイフンなしで入力してください'] },
    required: true,
  },
}

/**
 * ハイフンあり
 */
export const Hyphen: Story = {
  args: {
    nameId: 'hyphen',
    label: '電話番号',
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
    label: '電話番号',
    required: false,
    autoComplete: 'tel-national',
  },
}
