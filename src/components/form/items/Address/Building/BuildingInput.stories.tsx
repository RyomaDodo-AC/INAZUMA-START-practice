import type { Meta, StoryObj } from '@storybook/react'
import { BuildingInput } from './BuildingInput'

const meta: Meta<typeof BuildingInput> = {
  title: 'Form/Items/Address/Building/Input',
  component: BuildingInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BuildingInput>

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
    label: '建物名',
    required: true,
    note: { list: ['建物名を入力してください'] },
  },
}

/**
 * オートコンプリート
 */
export const AutoComplete: Story = {
  args: {
    nameId: 'auto-complete',
    label: '建物名',
    required: true,
    autoComplete: 'address-line2',
  },
}
