import type { Meta, StoryObj } from '@storybook/react'
import { StreetAddressInput } from './StreetAddressInput'

const meta: Meta<typeof StreetAddressInput> = {
  title: 'Form/Items/Address/StreetAddress/Input',
  component: StreetAddressInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof StreetAddressInput>

/**
 * 基本形
 */
export const Base: Story = {
  args: {
    nameId: 'base',
  },
}

/**
 * inputBox
 */
export const InputBox: Story = {
  args: {
    nameId: 'input-box',
    label: '町名・番地',
    required: true,
    note: { list: ['町名・番地を入力してください'] },
  },
}

/**
 * オートコンプリート
 */
export const AutoComplete: Story = {
  args: {
    nameId: 'auto-complete',
    label: '町名・番地',
    required: true,
    autoComplete: 'address-line1',
  },
}
