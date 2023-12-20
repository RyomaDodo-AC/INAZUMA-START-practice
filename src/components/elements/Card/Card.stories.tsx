import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Elements/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

/**
 * 基本形
 */
export const Base: Story = {
  args: {
    children: (
      <>
        <div className="p-10">コンテンツ</div>
        <input type="checkbox" className="hidden" />
      </>
    ),
  },
}

/**
 * ラベル化
 */
export const Label: Story = {
  args: {
    children: (
      <>
        <div className="p-10">コンテンツ</div>
        <input type="checkbox" className="hidden" />
      </>
    ),
    labelType: true,
  },
}

/**
 * リボン：ラベル
 */
export const RibbonLabel: Story = {
  args: {
    children: (
      <>
        <div className="p-10">コンテンツ</div>
        <input type="checkbox" className="hidden" />
      </>
    ),
    labelType: true,
    ribbon: {
      label: {
        text: 'ラベル',
      },
    },
  },
}

/**
 * リボン：おすすめ
 */
export const RibbonRecommend: Story = {
  args: {
    children: (
      <>
        <div className="p-10">コンテンツ</div>
        <input type="checkbox" className="hidden" />
      </>
    ),
    labelType: true,
    ribbon: {
      recommend: {
        show: true,
      },
    },
  },
}

/**
 * カラーバリエーション：黒
 * （クリックでアクティブスタイル確認）
 */
export const ColorBlack: Story = {
  args: {
    children: (
      <>
        <div className="p-10">コンテンツ</div>
        <input type="checkbox" className="hidden" />
      </>
    ),
    cardColor: {
      default: 'black',
      active: 'black',
    },
    labelType: true,
    ribbon: {
      label: {
        text: 'ラベル',
        color: 'black',
      },
      recommend: {
        show: true,
        color: 'black',
      },
    },
  },
}

/**
 * カラーバリエーション：赤
 * （クリックでアクティブスタイル確認）
 */
export const ColorRed: Story = {
  args: {
    children: (
      <>
        <div className="p-10">コンテンツ</div>
        <input type="checkbox" className="hidden" />
      </>
    ),
    cardColor: {
      default: 'red',
      active: 'red',
    },
    labelType: true,
    ribbon: {
      label: {
        text: 'ラベル',
        color: 'red',
      },
      recommend: {
        show: true,
        color: 'red',
      },
    },
  },
}

/**
 * カラーバリエーション：青
 * （クリックでアクティブスタイル確認）
 */
export const ColorBlue: Story = {
  args: {
    children: (
      <>
        <div className="p-10">コンテンツ</div>
        <input type="checkbox" className="hidden" />
      </>
    ),
    cardColor: {
      default: 'blue',
      active: 'blue',
    },
    labelType: true,
    ribbon: {
      label: {
        text: 'ラベル',
        color: 'blue',
      },
      recommend: {
        show: true,
        color: 'blue',
      },
    },
  },
}

/**
 * カラーバリエーション：グレー
 * （クリックでアクティブスタイル確認）
 */
export const ColorGray: Story = {
  args: {
    children: (
      <>
        <div className="p-10">コンテンツ</div>
        <input type="checkbox" className="hidden" />
      </>
    ),
    cardColor: {
      default: 'gray',
      active: 'gray',
    },
    labelType: true,
    ribbon: {
      label: {
        text: 'ラベル',
        color: 'gray',
      },
      recommend: {
        show: true,
        color: 'gray',
      },
    },
  },
}

/**
 * カラーバリエーション：色違い
 * （クリックでアクティブスタイル確認）
 */
export const ColorVariation: Story = {
  args: {
    children: (
      <>
        <div className="p-10">コンテンツ</div>
        <input type="checkbox" className="hidden" />
      </>
    ),
    cardColor: {
      active: 'blue',
    },
    labelType: true,
    ribbon: {
      label: {
        text: 'ラベル',
        color: 'red',
      },
      recommend: {
        show: true,
        color: 'black',
      },
    },
  },
}
