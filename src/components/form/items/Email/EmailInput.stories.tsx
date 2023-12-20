import type { Meta, StoryObj } from '@storybook/react'
import { EmailInput } from './EmailInput'

const meta: Meta<typeof EmailInput> = {
  title: 'Form/Items/Email/Input',
  component: EmailInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EmailInput>

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
    label: 'メールアドレス',
    note: { list: ['確認用メールアドレスが必要な場合はこのコンポーネントを2つ使用する'] },
    required: true,
  },
}

/**
 * オートコンプリート（デフォルトはemail）
 */
export const AutoComplete: Story = {
  args: {
    nameId: 'auto-complete',
    label: 'メールアドレス',
    required: false,
    autoComplete: 'email',
  },
}
