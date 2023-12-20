import type { Meta, StoryObj } from '@storybook/react'
import { RadioControl } from './RadioControl'

const meta: Meta<typeof RadioControl> = {
  title: 'Form/Field/Radio/Control',
  component: RadioControl,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadioControl>

/**
 * 基本形
 */
export const Base: Story = {
  args: {
    nameId: 'base',
    lists: [
      { labelContents: 'ラジオボタン1', value: '1', name: 'base' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'base' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'base' },
    ],
  },
}

/**
 * 基本形：デフォルトチェック（複数ある場合は最後の要素がチェックされる）
 */
export const BaseDefaultChecked: Story = {
  args: {
    nameId: 'base-default-checked',
    lists: [
      { labelContents: 'ラジオボタン1', value: '1', defaultChecked: true, name: 'base-default-checked' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'base-default-checked' },
      { labelContents: 'ラジオボタン3', value: '3', defaultChecked: true, name: 'base-default-checked' },
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
            ラジオ
            <br />
            ボタン1
          </span>
        ),
        value: '1',
        name: 'base-dom',
      },
      {
        labelContents: (
          <span>
            ラジオ
            <br />
            ボタン2
          </span>
        ),
        value: '2',
        name: 'base-dom',
      },
      {
        labelContents: (
          <span>
            ラジオ
            <br />
            ボタン3
          </span>
        ),
        value: '3',
        name: 'base-dom',
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
        labelContents: 'ラジオボタン1',
        value: '1',
        name: 'class-name',
        radioClassName: 'border-4',
        labelClassName: 'text-5xl',
      },
      {
        labelContents: <span className="text-4xl">ラジオボタン2</span>,
        value: '2',
        name: 'class-name',
      },
      { labelContents: 'ラジオボタン3', value: '3', name: 'class-name' },
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
      { labelContents: 'ラジオボタン1', value: '1', name: 'label' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'label' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'label' },
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
      { labelContents: 'ラジオボタン1', value: '1', name: 'validation-required' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'validation-required' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'validation-required' },
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
      { labelContents: 'ラジオボタン1', value: '1', name: 'validation-optional' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'validation-optional' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'validation-optional' },
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
      { labelContents: 'ラジオボタン1', value: '1', defaultChecked: true, name: 'error' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'error' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'error' },
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
      { labelContents: 'ラジオボタン1', value: '1', name: 'note' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'note' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'note' },
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
      { labelContents: 'ラジオボタン1', value: '1', name: 'direction-row' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'direction-row' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'direction-row' },
      { labelContents: 'ラジオボタン4', value: '4', name: 'direction-row' },
      { labelContents: 'ラジオボタン5', value: '5', name: 'direction-row' },
      { labelContents: 'ラジオボタン6', value: '6', name: 'direction-row' },
      { labelContents: 'ラジオボタン7', value: '7', name: 'direction-row' },
      { labelContents: 'ラジオボタン8', value: '8', name: 'direction-row' },
      { labelContents: 'ラジオボタン9', value: '9', name: 'direction-row' },
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
      { labelContents: 'ラジオボタン1', value: '1', name: 'direction-colmun' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'direction-colmun' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'direction-colmun' },
    ],
    label: 'ラベル',
    direction: 'col',
  },
}

/**
 * ラジオボタンの位置：中央
 */
export const RadioPosition: Story = {
  args: {
    nameId: 'radio-position',
    lists: [
      {
        labelContents: (
          <span>
            ラジオ
            <br />
            ボタン1
          </span>
        ),
        value: '1',
        name: 'radio-position',
      },
      {
        labelContents: (
          <span>
            ラジオ
            <br />
            ボタン
            <br />2
          </span>
        ),
        value: '2',
        name: 'radio-position',
      },
      { labelContents: <span>ラジオボタン3</span>, value: '3', name: 'radio-position' },
    ],
    label: 'ラベル',
    radioPosition: 'center',
  },
}

/**
 * ラジオボタンの位置：上
 */
export const RadioPositionTop: Story = {
  args: {
    nameId: 'radio-position-top',
    lists: [
      {
        labelContents: (
          <span>
            ラジオ
            <br />
            ボタン1
          </span>
        ),
        value: '1',
        name: 'radio-position-top',
      },
      {
        labelContents: (
          <span>
            ラジオ
            <br />
            ボタン
            <br />2
          </span>
        ),
        value: '2',
        name: 'radio-position-top',
      },
      { labelContents: <span>ラジオボタン3</span>, value: '3', name: 'radio-position-top' },
    ],
    label: 'ラベル',
    radioPosition: 'top',
  },
}

/**
 * ラジオボタンの位置：非表示
 */
export const RadioPositionHidden: Story = {
  args: {
    nameId: 'radio-position-hidden',
    lists: [
      {
        labelContents: (
          <span>
            ラジオ
            <br />
            ボタン1
          </span>
        ),
        value: '1',
        name: 'radio-position-hidden',
      },
      {
        labelContents: (
          <span>
            ラジオ
            <br />
            ボタン
            <br />2
          </span>
        ),
        value: '2',
        name: 'radio-position-hidden',
      },
      { labelContents: <span>ラジオボタン3</span>, value: '3', name: 'radio-position-hidden' },
    ],
    label: 'ラベル',
    radioPosition: 'hidden',
  },
}

/**
 * ラジオボタンの色：黒
 */
export const RadioColorBlack: Story = {
  args: {
    nameId: 'radio-color-black',
    lists: [
      { labelContents: 'ラジオボタン1', value: '1', defaultChecked: true, name: 'radio-color-black' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'radio-color-black' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'radio-color-black' },
    ],
    label: 'ラベル',
    radioColor: 'black',
  },
}

/**
 * ラジオボタンの色：赤
 */
export const RadioColorRed: Story = {
  args: {
    nameId: 'radio-color-red',
    lists: [
      { labelContents: 'ラジオボタン1', value: '1', defaultChecked: true, name: 'radio-color-red' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'radio-color-red' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'radio-color-red' },
    ],
    label: 'ラベル',
    radioColor: 'red',
  },
}

/**
 * ラジオボタンの色：青
 */
export const RadioColorBlue: Story = {
  args: {
    nameId: 'radio-color-blue',
    lists: [
      { labelContents: 'ラジオボタン1', value: '1', defaultChecked: true, name: 'radio-color-blue' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'radio-color-blue' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'radio-color-blue' },
    ],
    label: 'ラベル',
    radioColor: 'blue',
  },
}

/**
 * ラジオボタンの色：グレー
 */
export const RadioColorGray: Story = {
  args: {
    nameId: 'radio-color-gray',
    lists: [
      { labelContents: 'ラジオボタン1', value: '1', defaultChecked: true, name: 'radio-color-gray' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'radio-color-gray' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'radio-color-gray' },
    ],
    label: 'ラベル',
    radioColor: 'gray',
  },
}

/**
 * ラジオボタン（カード型）
 */
export const Card: Story = {
  args: {
    nameId: 'card',
    lists: [
      { labelContents: 'ラジオボタン1', value: '1', defaultChecked: true, name: 'card' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'card' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'card' },
    ],
    label: 'ラベル',
    labelType: 'card',
  },
}

/**
 * ラジオボタン（カード型）：並び方：横
 */
export const CardDirectionRow: Story = {
  args: {
    nameId: 'card-direction-row',
    lists: [
      { labelContents: 'ラジオボタン1', value: '1', defaultChecked: true, name: 'card-direction-row' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'card-direction-row' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'card-direction-row' },
      { labelContents: 'ラジオボタン4', value: '4', name: 'card-direction-row' },
      { labelContents: 'ラジオボタン5', value: '5', name: 'card-direction-row' },
      { labelContents: 'ラジオボタン6', value: '6', name: 'card-direction-row' },
      { labelContents: 'ラジオボタン7', value: '7', name: 'card-direction-row' },
      { labelContents: 'ラジオボタン8', value: '8', name: 'card-direction-row' },
      { labelContents: 'ラジオボタン9', value: '9', name: 'card-direction-row' },
    ],
    label: 'ラベル',
    labelType: 'card',
    direction: 'row',
  },
}

/**
 * ラジオボタン（カード型）：並び方：横（幅いっぱい）
 */
export const CardDirectionRowFull: Story = {
  args: {
    nameId: 'card-direction-row-full',
    lists: [
      { labelContents: 'ラジオボタン1', value: '1', defaultChecked: true, name: 'card-direction-row' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'card-direction-row' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'card-direction-row' },
    ],
    label: 'ラベル',
    labelType: 'card',
    direction: 'row',
    contentWidth: 'full',
  },
}

/**
 * ラジオボタン（カード型）：並び方：縦
 */
export const CardDirectionColumn: Story = {
  args: {
    nameId: 'card-direction-column',
    lists: [
      { labelContents: 'ラジオボタン1', value: '1', defaultChecked: true, name: 'card-direction-column' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'card-direction-column' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'card-direction-column' },
    ],
    label: 'ラベル',
    labelType: 'card',
    direction: 'col',
  },
}

/**
 * ラジオボタン（カード型）：ラベルの位置：中央
 */
export const CardLabelPositionCenter: Story = {
  args: {
    nameId: 'card-label-position-center',
    lists: [
      {
        labelContents: (
          <span>
            ラジオ
            <br />
            ボタン1
          </span>
        ),
        value: '1',
        defaultChecked: true,
        name: 'card-label-position-center',
      },
      {
        labelContents: (
          <span>
            ラジオ
            <br />
            ボタン
            <br />2
          </span>
        ),
        value: '2',
        name: 'card-label-position-center',
      },
      {
        labelContents: <span>ラジオボタン3</span>,
        value: '3',
        name: 'card-label-position-center',
      },
    ],
    label: 'ラベル',
    labelType: 'card',
    radioPosition: 'center',
  },
}

/**
 * ラジオボタン（カード型）：ラベルの位置：上
 */
export const CardLabelPositionTop: Story = {
  args: {
    nameId: 'card-label-position-top',
    lists: [
      {
        labelContents: (
          <span>
            ラジオ
            <br />
            ボタン1
          </span>
        ),
        value: '1',
        defaultChecked: true,
        name: 'card-label-position-top',
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
        name: 'card-label-position-top',
      },
      {
        labelContents: <span>ラジオボタン3</span>,
        value: '3',
        name: 'card-label-position-top',
      },
    ],
    label: 'ラベル',
    labelType: 'card',
    radioPosition: 'top',
  },
}

/**
 * ラジオボタン（カード型）：ラベルの位置：非表示
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
        name: 'card-label-position-hidden',
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
        name: 'card-label-position-hidden',
      },
      {
        labelContents: <span>ラジオボタン3</span>,
        value: '3',
        name: 'card-label-position-hidden',
      },
    ],
    label: 'ラベル',
    labelType: 'card',
    radioPosition: 'hidden',
  },
}

/**
 * ラジオボタン（カード型）：ラジオボタンの色：黒
 */
export const CardRadioColorBlack: Story = {
  args: {
    nameId: 'card-radio-color-black',
    lists: [
      { labelContents: 'ラジオボタン1', value: '1', defaultChecked: true, name: 'card-radio-color-black' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'card-radio-color-black' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'card-radio-color-black' },
    ],
    label: 'ラベル',
    labelType: 'card',
    radioColor: 'black',
  },
}

/**
 * ラジオボタン（カード型）：ラジオボタンの色：赤
 */
export const CardRadioColorRed: Story = {
  args: {
    nameId: 'card-radio-color-red',
    lists: [
      { labelContents: 'ラジオボタン1', value: '1', defaultChecked: true, name: 'card-radio-color-red' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'card-radio-color-red' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'card-radio-color-red' },
    ],
    label: 'ラベル',
    labelType: 'card',
    radioColor: 'red',
  },
}

/**
 * ラジオボタン（カード型）：ラジオボタンの色：青
 */
export const CardRadioColorBlue: Story = {
  args: {
    nameId: 'card-radio-color-blue',
    lists: [
      { labelContents: 'ラジオボタン1', value: '1', defaultChecked: true, name: 'card-radio-color-blue' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'card-radio-color-blue' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'card-radio-color-blue' },
    ],
    label: 'ラベル',
    labelType: 'card',
    radioColor: 'blue',
  },
}

/**
 * ラジオボタン（カード型）：ラジオボタンの色：グレー
 */
export const CardRadioColorGray: Story = {
  args: {
    nameId: 'card-radio-color-gray',
    lists: [
      { labelContents: 'ラジオボタン1', value: '1', defaultChecked: true, name: 'card-radio-color-gray' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'card-radio-color-gray' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'card-radio-color-gray' },
    ],
    label: 'ラベル',
    labelType: 'card',
    radioColor: 'gray',
  },
}

/**
 * ラジオボタン（カード型）：バリデーション：エラー
 */
export const CardError: Story = {
  args: {
    nameId: 'card-error',
    lists: [
      { labelContents: 'ラジオボタン1', value: '1', defaultChecked: true, name: 'card-error' },
      { labelContents: 'ラジオボタン2', value: '2', name: 'card-error' },
      { labelContents: 'ラジオボタン3', value: '3', name: 'card-error' },
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
      { labelContents: 'ラジオボタン1', value: '1', name: 'card-ribbon', defaultChecked: true },
      {
        labelContents: 'ラジオボタン2',
        value: '2',
        name: 'card-ribbon',
        radioClassName: '!left-9',
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
      { labelContents: 'ラジオボタン3', name: 'card-ribbon', value: '3' },
    ],
    label: 'ラベル',
    labelType: 'card',
    radioPosition: 'center',
    radioColor: 'blue',
  },
}
