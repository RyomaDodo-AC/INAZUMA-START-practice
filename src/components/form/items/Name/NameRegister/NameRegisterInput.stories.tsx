import type { Meta, StoryObj } from '@storybook/react'
import { NameRegisterInput } from './NameRegisterInput'

const meta: Meta<typeof NameRegisterInput> = {
  title: 'Form/Items/Name/Register/Input',
  component: NameRegisterInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NameRegisterInput>

/**
 * 基本形（フルネーム）
 */
export const BaseFullName: Story = {
  args: {
    nameProps: {
      fullNameProps: {
        nameId: 'base-full-name',
      },
    },
    separate: false,
  },
}

/**
 * InputBox（フルネーム）
 */
export const InputBoxFullName: Story = {
  args: {
    nameProps: {
      fullNameProps: {
        nameId: 'input-box-full-name',
        label: 'フルネーム',
        note: { list: ['姓と名の間はスペースを入れずに入力してください'] },
        required: true,
      },
    },
    separate: false,
  },
}

/**
 * 基本形（姓と名）
 */
export const BaseLastNameAndFirstName: Story = {
  args: {
    nameProps: {
      lastNameProps: {
        nameId: 'base-last-name',
      },
      firstNameProps: {
        nameId: 'base-first-name',
      },
    },
    separate: true,
  },
}

/**
 * InputBox（姓と名）
 */
export const InputBoxLastNameAndFirstName: Story = {
  args: {
    nameProps: {
      lastNameProps: {
        nameId: 'input-box-last-name',
        label: '姓',
        note: { list: ['姓を入力してください'] },
        required: true,
      },
      firstNameProps: {
        nameId: 'input-box-first-name',
        label: '名',
        note: { list: ['名を入力してください'] },
        required: true,
      },
    },
    separate: true,
  },
}

/**
 * 基本形:Props無し
 * ※何も表示されなくて正常
 */
export const BaseFullNameNoProps: Story = {
  args: {
    nameProps: {},
  },
}

/**
 * 基本形（姓と名）:Props無し
 * ※何も表示されなくて正常
 */
export const BaseLastNameAndFirstNameNoProps: Story = {
  args: {
    nameProps: {},
    separate: true,
  },
}
