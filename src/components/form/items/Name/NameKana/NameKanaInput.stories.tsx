import type { Meta, StoryObj } from '@storybook/react'
import { NameKanaInput } from './NameKanaInput'

const meta: Meta<typeof NameKanaInput> = {
  title: 'Form/Items/Name/Kana/Input',
  component: NameKanaInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NameKanaInput>

/**
 * 基本形（フルネーム）:カタカナ
 */
export const BaseFullName: Story = {
  args: {
    nameProps: {
      fullNameProps: {
        nameId: 'base-full-name',
      },
    },
    separate: false,
    kanaType: 'katakana',
  },
}

/**
 * InputBox（フルネーム）:カタカナ
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
    kanaType: 'katakana',
  },
}

/**
 * 基本形（姓と名）:カタカナ
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
    kanaType: 'katakana',
  },
}

/**
 * InputBox（姓と名）:カタカナ
 */
export const InputBoxLastNameAndFirstName: Story = {
  args: {
    nameProps: {
      lastNameProps: {
        nameId: 'input-box-last-name',
        label: '姓',
        note: { list: ['姓をカタカナで入力してください'] },
        required: true,
      },
      firstNameProps: {
        nameId: 'input-box-first-name',
        label: '名',
        note: { list: ['名をカタカナで入力してください'] },
        required: true,
      },
    },
    separate: true,
    kanaType: 'katakana',
  },
}

/**
 * 基本形（フルネーム）:ひらがな
 */
export const BaseFullNameHiragana: Story = {
  args: {
    nameProps: {
      fullNameProps: {
        nameId: 'base-full-name',
      },
    },
    separate: false,
    kanaType: 'hiragana',
  },
}

/**
 * InputBox（フルネーム）:ひらがな
 */
export const InputBoxFullNameHiragana: Story = {
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
    kanaType: 'hiragana',
  },
}

/**
 * 基本形（姓と名）:ひらがな
 */
export const BaseLastNameAndFirstNameHiragana: Story = {
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
    kanaType: 'hiragana',
  },
}

/**
 * InputBox（姓と名）:ひらがな
 */
export const InputBoxLastNameAndFirstNameHiragana: Story = {
  args: {
    nameProps: {
      lastNameProps: {
        nameId: 'input-box-last-name',
        label: '姓',
        note: { list: ['姓をひらがなで入力してください'] },
        required: true,
      },
      firstNameProps: {
        nameId: 'input-box-first-name',
        label: '名',
        note: { list: ['名をひらがなで入力してください'] },
        required: true,
      },
    },
    separate: true,
    kanaType: 'hiragana',
  },
}

/**
 * 基本形（フルネーム）:Props無し
 * ※何も表示されなくて正常
 */
export const BaseFullNameNoProps: Story = {
  args: {
    nameProps: {},
    kanaType: 'katakana',
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
    kanaType: 'katakana',
  },
}
