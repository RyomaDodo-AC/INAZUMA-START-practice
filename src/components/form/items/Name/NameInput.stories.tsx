import type { Meta, StoryObj } from '@storybook/react'
import { NameInput } from './NameInput'

const meta: Meta<typeof NameInput> = {
  title: 'Form/Items/Name/Input',
  component: NameInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NameInput>

/**
 * 基本形（フルネーム）：カタカナ
 */
export const BaseFullName: Story = {
  args: {
    nameRegisterProps: {
      nameProps: {
        fullNameProps: {
          nameId: 'base-full-name',
        },
      },
    },
    nameKanaProps: {
      nameProps: {
        fullNameProps: {
          nameId: 'base-full-name-kana',
        },
      },
      kanaType: 'katakana',
    },
    separate: false,
  },
}

/**
 * InputBox（フルネーム）：カタカナ
 */
export const InputBoxFullName: Story = {
  args: {
    nameRegisterProps: {
      nameProps: {
        fullNameProps: {
          nameId: 'input-box-full-name',
          label: 'フルネーム',
          note: { list: ['姓と名の間はスペースを入れずに入力してください'] },
          required: true,
        },
      },
    },
    nameKanaProps: {
      nameProps: {
        fullNameProps: {
          nameId: 'input-box-full-name-kana',
          label: 'フルネーム（カナ）',
          note: { list: ['姓と名の間はスペースを入れずに入力してください'] },
          required: true,
        },
      },
      kanaType: 'katakana',
    },
    separate: false,
  },
}

/**
 * 基本形（フルネーム）：ひらがな
 */
export const BaseFullNameHiragana: Story = {
  args: {
    nameRegisterProps: {
      nameProps: {
        fullNameProps: {
          nameId: 'base-full-name',
        },
      },
    },
    nameKanaProps: {
      nameProps: {
        fullNameProps: {
          nameId: 'base-full-name-kana',
        },
      },
      kanaType: 'hiragana',
    },
    separate: false,
  },
}

/**
 * InputBox（フルネーム）：ひらがな
 */
export const InputBoxFullNameHiragana: Story = {
  args: {
    nameRegisterProps: {
      nameProps: {
        fullNameProps: {
          nameId: 'input-box-full-name',
          label: 'フルネーム',
          note: { list: ['姓と名の間はスペースを入れずに入力してください'] },
          required: true,
        },
      },
    },
    nameKanaProps: {
      nameProps: {
        fullNameProps: {
          nameId: 'input-box-full-name-kana',
          label: 'フルネーム（ひらがな）',
          note: { list: ['姓と名の間はスペースを入れずに入力してください'] },
          required: true,
        },
      },
      kanaType: 'hiragana',
    },
    separate: false,
  },
}

/**
 * 基本形（姓と名）：カタカナ
 */
export const BaseLastNameAndFirstName: Story = {
  args: {
    nameRegisterProps: {
      nameProps: {
        lastNameProps: {
          nameId: 'base-last-name',
        },
        firstNameProps: {
          nameId: 'base-first-name',
        },
      },
    },
    nameKanaProps: {
      nameProps: {
        lastNameProps: {
          nameId: 'base-last-name-kana',
        },
        firstNameProps: {
          nameId: 'base-first-name-kana',
        },
      },
      kanaType: 'katakana',
    },
    separate: true,
  },
}

/**
 * InputBox（姓と名）：カタカナ
 */
export const InputBoxLastNameAndFirstName: Story = {
  args: {
    nameRegisterProps: {
      nameProps: {
        lastNameProps: {
          nameId: 'input-box-last-name',
          label: '姓',
          required: true,
        },
        firstNameProps: {
          nameId: 'input-box-first-name',
          label: '名',
          required: true,
        },
      },
    },
    nameKanaProps: {
      nameProps: {
        lastNameProps: {
          nameId: 'input-box-last-name-kana',
          label: '姓（カナ）',
          required: true,
        },
        firstNameProps: {
          nameId: 'input-box-first-name-kana',
          label: '名（カナ）',
          required: true,
        },
      },
      kanaType: 'katakana',
    },
    separate: true,
  },
}

/**
 * 基本形（姓と名）：ひらがな
 */
export const BaseLastNameAndFirstNameHiragana: Story = {
  args: {
    nameRegisterProps: {
      nameProps: {
        lastNameProps: {
          nameId: 'base-last-name',
        },
        firstNameProps: {
          nameId: 'base-first-name',
        },
      },
    },
    nameKanaProps: {
      nameProps: {
        lastNameProps: {
          nameId: 'base-last-name-kana',
        },
        firstNameProps: {
          nameId: 'base-first-name-kana',
        },
      },
      kanaType: 'hiragana',
    },
    separate: true,
  },
}

/**
 * InputBox（姓と名）：ひらがな
 */
export const InputBoxLastNameAndFirstNameHiragana: Story = {
  args: {
    nameRegisterProps: {
      nameProps: {
        lastNameProps: {
          nameId: 'input-box-last-name',
          label: '姓',
          required: true,
        },
        firstNameProps: {
          nameId: 'input-box-first-name',
          label: '名',
          required: true,
        },
      },
    },
    nameKanaProps: {
      nameProps: {
        lastNameProps: {
          nameId: 'input-box-last-name-kana',
          label: '姓（ひらがな）',
          required: true,
        },
        firstNameProps: {
          nameId: 'input-box-first-name-kana',
          label: '名（ひらがな）',
          required: true,
        },
      },
      kanaType: 'hiragana',
    },
    separate: true,
  },
}
