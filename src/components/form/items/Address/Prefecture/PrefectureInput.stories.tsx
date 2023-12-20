import type { Meta, StoryObj } from '@storybook/react'
import { PrefectureInput } from './PrefectureInput'

const meta: Meta<typeof PrefectureInput> = {
  title: 'Form/Items/Address/Prefecture/Input',
  component: PrefectureInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PrefectureInput>

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
    label: '都道府県',
    required: true,
    note: { list: ['都道府県を選択してください'] },
  },
}

/**
 * オートコンプリート
 */
export const AutoComplete: Story = {
  args: {
    nameId: 'auto-complete',
    label: '都道府県',
    required: true,
    autoComplete: 'address-level1',
  },
}
