import type { Meta, StoryObj } from '@storybook/react'
import { BirthDateInput } from './BirthDateInput'

const meta: Meta<typeof BirthDateInput> = {
  title: 'Form/Items/BirthDate/Input',
  component: BirthDateInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BirthDateInput>

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
    label: '日付日付日付日付日付日付日付日付日付日付日付日付日付日付日付日付日付日付日付日付日付',
    required: true,
    note: { list: ['生年月日を選択してください生年月日を選択してください生年月日を選択してください生年月日を選択してください'] },
  },
}

/**
 * バリデーション：エラー
 */
export const Error: Story = {
  args: {
    nameId: 'error',
    label: '生年月日',
    required: true,
    note: { list: ['生年月日を選択してください'] },
    error: { type: 'required', message: '必須項目です' },
  },
}

/**
 * オートコンプリート
 */
export const AutoComplete: Story = {
  args: {
    nameId: 'auto-complete',
    label: '生年月日',
    required: false,
    autoCompleteDate: {
      year: 'bday-year',
      month: 'bday-month',
      day: 'bday-day',
      date: 'bday',
    },
  },
}

/**
 * 年のオフセット
 */
export const YearOffset: Story = {
  args: {
    nameId: 'year-offset',
    label: '10年前まで',
    required: false,
    yearOffset: {
      // 18年前から80年前までの選択肢を表示する
      old: new Date().getFullYear() - 80,
      new: new Date().getFullYear() - 18,
    },
  },
}

/**
 * 年の並び順：昇順
 */
export const YearOrderAsc: Story = {
  args: {
    nameId: 'year-order-asc',
    label: '生年月日',
    required: false,
    yearOrder: 'asc',
  },
}

/**
 * 年の並び順：降順
 */
export const YearOrderDesc: Story = {
  args: {
    nameId: 'year-order-desc',
    label: '生年月日',
    required: false,
    yearOrder: 'desc',
  },
}

/**
 * 表示日付のフォーマット：年月日
 */
export const FormatYmd: Story = {
  args: {
    nameId: 'format-ymd',
    label: '生年月日',
    required: false,
    formatDate: '年月日',
  },
}

/**
 * 表示日付のフォーマット：/
 */
export const FormatSlash: Story = {
  args: {
    nameId: 'format-slash',
    label: '生年月日',
    required: false,
    formatDate: '/',
  },
}

/**
 * 表示日付のフォーマット：-
 */
export const FormatHyphen: Story = {
  args: {
    nameId: 'format-hyphen',
    label: '生年月日',
    required: false,
    formatDate: '-',
  },
}

/**
 * 表示日付のフォーマット：.
 */
export const FormatDot: Story = {
  args: {
    nameId: 'format-dot',
    label: '生年月日',
    required: false,
    formatDate: '.',
  },
}

/**
 * Value日付のフォーマット（hiddenの値を確認）：yyyyMMdd
 */
export const ValueFormatYmd: Story = {
  args: {
    nameId: 'value-format-ymd',
    label: '生年月日',
    required: false,
    formatDateValue: 'yyyyMMdd',
  },
}

/**
 * Value日付のフォーマット（hiddenの値を確認）：yyyy/MM/dd
 */
export const ValueFormatSlash: Story = {
  args: {
    nameId: 'value-format-slash',
    label: '生年月日',
    required: false,
    formatDateValue: 'yyyy/MM/dd',
  },
}

/**
 * Value日付のフォーマット（hiddenの値を確認）：yyyy-MM-dd
 */
export const ValueFormatHyphen: Story = {
  args: {
    nameId: 'value-format-hyphen',
    label: '生年月日',
    required: false,
    formatDateValue: 'yyyy-MM-dd',
  },
}

/**
 * Value日付のフォーマット（hiddenの値を確認）：yyyy.MM.dd
 */
export const ValueFormatDot: Story = {
  args: {
    nameId: 'value-format-dot',
    label: '生年月日',
    required: false,
    formatDateValue: 'yyyy.MM.dd',
  },
}

/**
 * Value日付のフォーマット（hiddenの値を確認）：yyyy年MM月dd日
 */
export const ValueFormatJapanese: Story = {
  args: {
    nameId: 'value-format-japanese',
    label: '生年月日',
    required: false,
    formatDateValue: 'yyyy年MM月dd日',
  },
}
