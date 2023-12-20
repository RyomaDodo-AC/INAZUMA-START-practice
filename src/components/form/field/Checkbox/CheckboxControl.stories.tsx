import type { Meta, StoryObj } from '@storybook/react'
import { CheckboxControl } from './CheckboxControl'

const meta: Meta<typeof CheckboxControl> = {
  title: 'Form/Field/Checkbox/Control',
  component: CheckboxControl,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CheckboxControl>

/**
 * 基本形
 */
export const Base: Story = {
  args: {
    nameId: 'base',
    lists: [
      { labelContents: 'チェックボックス1', value: '1' },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
  },
}

/**
 * 基本形：デフォルトチェック
 */
export const BaseDefaultChecked: Story = {
  args: {
    nameId: 'base-default-checked',
    lists: [
      { labelContents: 'チェックボックス1', value: '1', defaultChecked: true },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
  },
}

/**
 * 基本形：DOM
 */
export const BaseDom: Story = {
  args: {
    nameId: 'base-dom',
    lists: [
      {
        labelContents: (
          <span>
            チェック
            <br />
            ボックス1
          </span>
        ),
        value: '1',
      },
      {
        labelContents: (
          <span>
            チェック
            <br />
            ボックス2
          </span>
        ),
        value: '2',
      },
      {
        labelContents: (
          <span>
            チェック
            <br />
            ボックス3
          </span>
        ),
        value: '3',
      },
    ],
  },
}

/**
 * className
 */
export const ClassName: Story = {
  args: {
    nameId: 'class-name',
    lists: [
      {
        labelContents: 'チェックボックス1',
        value: '1',
        checkboxClassName: 'border-4',
        labelClassName: 'text-5xl',
      },
      {
        labelContents: <span className="text-4xl">チェックボックス2</span>,
        value: '2',
      },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
  },
}

/**
 * ラベル
 */
export const Label: Story = {
  args: {
    nameId: 'label',
    lists: [
      { labelContents: 'チェックボックス1', value: '1' },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
  },
}

/**
 * バリデーション：必須
 */
export const ValidationRequired: Story = {
  args: {
    nameId: 'validation-required',
    lists: [
      { labelContents: 'チェックボックス1', value: '1' },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    required: true,
  },
}

/**
 * バリデーション：任意
 */
export const ValidationOptional: Story = {
  args: {
    nameId: 'validation-optional',
    lists: [
      { labelContents: 'チェックボックス1', value: '1' },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    required: false,
  },
}

/**
 * バリデーション：エラー
 */
export const ValidationError: Story = {
  args: {
    nameId: 'error',
    lists: [
      { labelContents: 'チェックボックス1', value: '1', defaultChecked: true },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    required: true,
    error: { type: 'required', message: '必須項目です' },
  },
}

/**
 * 注釈
 */
export const Note: Story = {
  args: {
    nameId: 'note',
    lists: [
      { labelContents: 'チェックボックス1', value: '1' },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    note: { list: ['注釈'] },
  },
}

/**
 * 並び方：横
 */
export const DirectionRow: Story = {
  args: {
    nameId: 'direction-row',
    lists: [
      { labelContents: 'チェックボックス1', value: '1' },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
      { labelContents: 'チェックボックス4', value: '4' },
      { labelContents: 'チェックボックス5', value: '5' },
      { labelContents: 'チェックボックス6', value: '6' },
      { labelContents: 'チェックボックス7', value: '7' },
      { labelContents: 'チェックボックス8', value: '8' },
      { labelContents: 'チェックボックス9', value: '9' },
    ],
    label: 'ラベル',
    direction: 'row',
  },
}

/**
 * 並び方：縦
 */
export const DirectionColmun: Story = {
  args: {
    nameId: 'direction-colmun',
    lists: [
      { labelContents: 'チェックボックス1', value: '1' },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    direction: 'col',
  },
}

/**
 * チェックボックスの位置：中央
 */
export const CheckboxPosition: Story = {
  args: {
    nameId: 'checkbox-position',
    lists: [
      {
        labelContents: (
          <span>
            チェック
            <br />
            ボックス1
          </span>
        ),
        value: '1',
      },
      {
        labelContents: (
          <span>
            チェック
            <br />
            ボックス
            <br />2
          </span>
        ),
        value: '2',
      },
      { labelContents: <span>チェックボックス3</span>, value: '3' },
    ],
    label: 'ラベル',
    checkboxPosition: 'center',
  },
}

/**
 * チェックボックスの位置：上
 */
export const CheckboxPositionTop: Story = {
  args: {
    nameId: 'checkbox-position-top',
    lists: [
      {
        labelContents: (
          <span>
            チェック
            <br />
            ボックス1
          </span>
        ),
        value: '1',
      },
      {
        labelContents: (
          <span>
            チェック
            <br />
            ボックス
            <br />2
          </span>
        ),
        value: '2',
      },
      { labelContents: <span>チェックボックス3</span>, value: '3' },
    ],
    label: 'ラベル',
    checkboxPosition: 'top',
  },
}

/**
 * チェックボックスの位置：非表示
 */
export const CheckboxPositionHidden: Story = {
  args: {
    nameId: 'checkbox-position-hidden',
    lists: [
      {
        labelContents: (
          <span>
            チェック
            <br />
            ボックス1
          </span>
        ),
        value: '1',
      },
      {
        labelContents: (
          <span>
            チェック
            <br />
            ボックス
            <br />2
          </span>
        ),
        value: '2',
      },
      { labelContents: <span>チェックボックス3</span>, value: '3' },
    ],
    label: 'ラベル',
    checkboxPosition: 'hidden',
  },
}

/**
 * チェックボックスの色：黒
 */
export const CheckboxColorBlack: Story = {
  args: {
    nameId: 'checkbox-color-black',
    lists: [
      { labelContents: 'チェックボックス1', value: '1', defaultChecked: true },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    checkboxColor: 'black',
  },
}

/**
 * チェックボックスの色：赤
 */
export const CheckboxColorRed: Story = {
  args: {
    nameId: 'checkbox-color-red',
    lists: [
      { labelContents: 'チェックボックス1', value: '1', defaultChecked: true },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    checkboxColor: 'red',
  },
}

/**
 * チェックボックスの色：青
 */
export const CheckboxColorBlue: Story = {
  args: {
    nameId: 'checkbox-color-blue',
    lists: [
      { labelContents: 'チェックボックス1', value: '1', defaultChecked: true },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    checkboxColor: 'blue',
  },
}

/**
 * チェックボックスの色：グレー
 */
export const CheckboxColorGray: Story = {
  args: {
    nameId: 'checkbox-color-gray',
    lists: [
      { labelContents: 'チェックボックス1', value: '1', defaultChecked: true },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    checkboxColor: 'gray',
  },
}

/**
 * チェックボックス（カード型）
 */
export const Card: Story = {
  args: {
    nameId: 'card',
    lists: [
      { labelContents: 'チェックボックス1', value: '1', defaultChecked: true },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    labelType: 'card',
  },
}

/**
 * チェックボックス（カード型）：並び方：横
 */
export const CardDirectionRow: Story = {
  args: {
    nameId: 'card-direction-row',
    lists: [
      { labelContents: 'チェックボックス1', value: '1', defaultChecked: true },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
      { labelContents: 'チェックボックス4', value: '4' },
      { labelContents: 'チェックボックス5', value: '5' },
      { labelContents: 'チェックボックス6', value: '6' },
      { labelContents: 'チェックボックス7', value: '7' },
      { labelContents: 'チェックボックス8', value: '8' },
      { labelContents: 'チェックボックス9', value: '9' },
    ],
    label: 'ラベル',
    labelType: 'card',
    direction: 'row',
  },
}

/**
 * チェックボックス（カード型）：並び方：横（幅いっぱい）
 */
export const CardDirectionRowFull: Story = {
  args: {
    nameId: 'card-direction-row-full',
    lists: [
      { labelContents: 'チェックボックス1', value: '1', defaultChecked: true },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    labelType: 'card',
    direction: 'row',
    contentWidth: 'full',
  },
}

/**
 * チェックボックス（カード型）：並び方：縦
 */
export const CardDirectionColumn: Story = {
  args: {
    nameId: 'card-direction-column',
    lists: [
      { labelContents: 'チェックボックス1', value: '1', defaultChecked: true },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    labelType: 'card',
    direction: 'col',
  },
}

/**
 * チェックボックス（カード型）：ラベルの位置：中央
 */
export const CardLabelPositionCenter: Story = {
  args: {
    nameId: 'card-label-position-center',
    lists: [
      {
        labelContents: (
          <span>
            チェック
            <br />
            ボックス1
          </span>
        ),
        value: '1',
        defaultChecked: true,
      },
      {
        labelContents: (
          <span>
            チェック
            <br />
            ボックス
            <br />2
          </span>
        ),
        value: '2',
      },
      {
        labelContents: <span>チェックボックス3</span>,
        value: '3',
      },
    ],
    label: 'ラベル',
    labelType: 'card',
    checkboxPosition: 'center',
  },
}

/**
 * チェックボックス（カード型）：ラベルの位置：上
 */
export const CardLabelPositionTop: Story = {
  args: {
    nameId: 'card-label-position-top',
    lists: [
      {
        labelContents: (
          <span>
            チェック
            <br />
            ボックス1
          </span>
        ),
        value: '1',
        defaultChecked: true,
      },
      {
        labelContents: (
          <span>
            チェック
            <br />
            ボックス
            <br />2
          </span>
        ),
        value: '2',
      },
      {
        labelContents: <span>チェックボックス3</span>,
        value: '3',
      },
    ],
    label: 'ラベル',
    labelType: 'card',
    checkboxPosition: 'top',
  },
}

/**
 * チェックボックス（カード型）：ラベルの位置：非表示
 */
export const CardLabelPositionHidden: Story = {
  args: {
    nameId: 'card-label-position-hidden',
    lists: [
      {
        labelContents: (
          <span>
            チェック
            <br />
            ボックス1
          </span>
        ),
        value: '1',
        defaultChecked: true,
      },
      {
        labelContents: (
          <span>
            チェック
            <br />
            ボックス
            <br />2
          </span>
        ),
        value: '2',
      },
      {
        labelContents: <span>チェックボックス3</span>,
        value: '3',
      },
    ],
    label: 'ラベル',
    labelType: 'card',
    checkboxPosition: 'hidden',
  },
}

/**
 * チェックボックス（カード型）：チェックボックスの色：黒
 */
export const CardCheckboxColorBlack: Story = {
  args: {
    nameId: 'card-checkbox-color-black',
    lists: [
      { labelContents: 'チェックボックス1', value: '1', defaultChecked: true },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    labelType: 'card',
    checkboxColor: 'black',
  },
}

/**
 * チェックボックス（カード型）：チェックボックスの色：赤
 */
export const CardCheckboxColorRed: Story = {
  args: {
    nameId: 'card-checkbox-color-red',
    lists: [
      { labelContents: 'チェックボックス1', value: '1', defaultChecked: true },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    labelType: 'card',
    checkboxColor: 'red',
  },
}

/**
 * チェックボックス（カード型）：チェックボックスの色：青
 */
export const CardCheckboxColorBlue: Story = {
  args: {
    nameId: 'card-checkbox-color-blue',
    lists: [
      { labelContents: 'チェックボックス1', value: '1', defaultChecked: true },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    labelType: 'card',
    checkboxColor: 'blue',
  },
}

/**
 * チェックボックス（カード型）：チェックボックスの色：グレー
 */
export const CardCheckboxColorGray: Story = {
  args: {
    nameId: 'card-checkbox-color-gray',
    lists: [
      { labelContents: 'チェックボックス1', value: '1', defaultChecked: true },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    labelType: 'card',
    checkboxColor: 'gray',
  },
}

/**
 * チェックボックス（カード型）：バリデーション：エラー
 */
export const CardError: Story = {
  args: {
    nameId: 'card-error',
    lists: [
      { labelContents: 'チェックボックス1', value: '1', defaultChecked: true },
      { labelContents: 'チェックボックス2', value: '2' },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    required: true,
    labelType: 'card',
    error: { type: 'required', message: '必須項目です' },
  },
}

/**
 * カードリボン表示時の調整例
 */
export const CardRibbon: Story = {
  args: {
    nameId: 'card-ribbon',
    lists: [
      { labelContents: 'チェックボックス1', value: '1', defaultChecked: true },
      {
        labelContents: 'チェックボックス2',
        value: '2',
        checkboxClassName: '!left-9',
        labelClassName: '!py-6 !pl-14',
        ribbon: {
          label: {
            text: '初期費用無料',
            color: 'red',
          },
          recommend: {
            show: true,
            color: 'red',
          },
        },
      },
      { labelContents: 'チェックボックス3', value: '3' },
    ],
    label: 'ラベル',
    labelType: 'card',
    checkboxPosition: 'center',
    checkboxColor: 'blue',
  },
}
