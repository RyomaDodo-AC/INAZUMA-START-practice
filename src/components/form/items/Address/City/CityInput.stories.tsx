import type { Meta, StoryObj } from '@storybook/react'
import { CityInput } from './CityInput'

const meta: Meta<typeof CityInput> = {
  title: 'Form/Items/Address/City/Input',
  component: CityInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CityInput>

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
    label: '市区町村',
    required: true,
    note: { list: ['市区町村を入力してください'] },
  },
}

/**
 * オートコンプリート
 */
export const AutoComplete: Story = {
  args: {
    nameId: 'auto-complete',
    label: '市区町村',
    required: true,
    autoComplete: 'address-level2',
  },
}
