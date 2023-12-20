import type { Meta, StoryObj } from '@storybook/react'
import { AddressInput } from './AddressInput'

const meta: Meta<typeof AddressInput> = {
  title: 'Form/Items/Address/Input',
  component: AddressInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AddressInput>

/**
 * 基本形
 */
export const Base: Story = {
  args: {
    postalCodeProps: {
      nameId: 'base-postal-code',
      onChange: () => {},
    },
    prefectureProps: {
      nameId: 'base-prefecture',
    },
    cityProps: {
      nameId: 'base-city',
    },
    streetAddressProps: {
      nameId: 'base-streetAddress',
    },
    buildingProps: {
      nameId: 'base-building',
    },
  },
}

/**
 * InputBox
 */
export const InputBox: Story = {
  args: {
    postalCodeProps: {
      nameId: 'input-box-postal-code',
      label: '郵便番号',
      required: true,
      note: { list: ['ハイフンなしで入力してください'] },
      onChange: () => {},
    },
    prefectureProps: {
      nameId: 'input-box-prefecture',
      label: '都道府県',
      required: true,
    },

    cityProps: {
      nameId: 'input-box-city',
      label: '市区町村',
      required: true,
    },
    streetAddressProps: {
      nameId: 'input-box-streetAddress',
      label: '町域',
      required: true,
    },
    buildingProps: {
      nameId: 'input-box-building',
      label: '建物名',
      required: false,
      note: { list: ['建物名を入力してください'] },
    },
  },
}

/**
 * オートコンプリート
 */
export const AutoComplete: Story = {
  args: {
    postalCodeProps: {
      nameId: 'auto-complete-postal-code',
      label: '郵便番号',
      required: true,
      note: { list: ['ハイフンなしで入力してください'] },
      onChange: () => {},
    },
    prefectureProps: {
      nameId: 'auto-complete-prefecture',
      label: '都道府県',
      required: true,
      autoComplete: 'address-level1',
    },
    cityProps: {
      nameId: 'auto-complete-city',
      label: '市区町村',
      required: true,
      autoComplete: 'address-level2',
    },
    streetAddressProps: {
      nameId: 'auto-complete-streetAddress',
      label: '町名・番地',
      required: true,
      autoComplete: 'address-line1',
    },
    buildingProps: {
      nameId: 'auto-complete-building',
      label: '建物名',
      required: false,
      autoComplete: 'address-line2',
    },
  },
}
