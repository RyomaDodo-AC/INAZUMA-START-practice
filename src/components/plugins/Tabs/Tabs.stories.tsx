import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'plugins/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tabs>

/**
 * デフォルト（開きフラグ無し：指定がない場合は一番最初が開く）
 */
export const Default: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
      },
    ],
  },
}

/**
 * デフォルト（タブ2開き）
 */
export const DefaultTab2: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
        open: true,
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
      },
    ],
  },
}

/**
 * デフォルト（開き複数フラグ：一番最初のopenが開く）
 */
export const DefaultMultiple: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
        open: true,
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
        open: true,
      },
    ],
  },
}

/**
 * タブサイズ：xs（下線）
 */
export const SizeXs: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
        open: true,
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
        open: true,
      },
    ],
    size: {
      default: 'xs',
    },
  },
}

/**
 * タブサイズ：sm（下線）
 */
export const SizeSm: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
        open: true,
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
        open: true,
      },
    ],
    size: {
      default: 'sm',
    },
  },
}

/**
 * タブサイズ：md（下線）
 */
export const SizeMd: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
        open: true,
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
        open: true,
      },
    ],
    size: {
      default: 'md',
    },
  },
}

/**
 * タブサイズ（レスポンシブ）：md（下線）
 */
export const SizeMdResponsive: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
        open: true,
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
        open: true,
      },
    ],
    size: {
      default: 'md',
      xs: 'xs',
      sm: 'sm',
      md: 'md',
    },
  },
}

/**
 * タブサイズ（レスポンシブ）：sm（下線）
 */
export const SizeSmResponsive: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
        open: true,
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
        open: true,
      },
    ],
    size: {
      default: 'sm',
      xs: 'xs',
      sm: 'sm',
      md: 'md',
    },
  },
}

/**
 * スタイル（下線）：黒
 */
export const TypeUnderlineBlack: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
      },
      {
        label: 'タブ4',
        content: 'コンテンツ4',
        id: 'tab4',
      },
      {
        label: 'タブ5',
        content: 'コンテンツ5',
        id: 'tab5',
      },
    ],
    style: {
      default: 'underline',
    },
    color: 'black',
  },
}

/**
 * スタイル（下線）：赤
 */
export const TypeUnderlineRed: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
      },
      {
        label: 'タブ4',
        content: 'コンテンツ4',
        id: 'tab4',
      },
      {
        label: 'タブ5',
        content: 'コンテンツ5',
        id: 'tab5',
      },
    ],
    style: {
      default: 'underline',
    },
    color: 'red',
  },
}

/**
 * スタイル（下線）：青
 */
export const TypeUnderlineBlue: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
      },
      {
        label: 'タブ4',
        content: 'コンテンツ4',
        id: 'tab4',
      },
      {
        label: 'タブ5',
        content: 'コンテンツ5',
        id: 'tab5',
      },
    ],
    style: {
      default: 'underline',
    },
    color: 'blue',
  },
}

/**
 * スタイル（下線）：グレー
 */
export const TypeUnderlineGray: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
      },
      {
        label: 'タブ4',
        content: 'コンテンツ4',
        id: 'tab4',
      },
      {
        label: 'タブ5',
        content: 'コンテンツ5',
        id: 'tab5',
      },
    ],
    style: {
      default: 'underline',
    },
    color: 'gray',
  },
}

/**
 * タブサイズ：xs（ボタン）
 */
export const StyleButtonXs: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
        open: true,
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
        open: true,
      },
    ],
    size: {
      default: 'xs',
    },
    style: {
      default: 'button',
    },
  },
}

/**
 * タブサイズ：sm（ボタン）
 */
export const StyleButtonSm: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
        open: true,
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
        open: true,
      },
    ],
    size: {
      default: 'sm',
    },
    style: {
      default: 'button',
    },
  },
}

/**
 * タブサイズ：md（ボタン）
 */
export const StyleButtonMd: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
        open: true,
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
        open: true,
      },
    ],
    size: {
      default: 'md',
    },
    style: {
      default: 'button',
    },
  },
}

/**
 * タブサイズ（レスポンシブ）：md（ボタン）
 */
export const StyleButtonMdResponsive: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
        open: true,
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
        open: true,
      },
    ],
    size: {
      default: 'md',
      xs: 'xs',
      sm: 'sm',
      md: 'md',
    },
    style: {
      default: 'button',
    },
  },
}

/**
 * タブサイズ（レスポンシブ）：sm（ボタン）
 */
export const StyleButtonSmResponsive: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
        open: true,
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
        open: true,
      },
    ],
    size: {
      default: 'sm',
      xs: 'xs',
      sm: 'sm',
      md: 'md',
    },
  },
}

/**
 * スタイル（ボタン）：黒
 */
export const StyleButtonBlack: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
      },
      {
        label: 'タブ4',
        content: 'コンテンツ4',
        id: 'tab4',
      },
      {
        label: 'タブ5',
        content: 'コンテンツ5',
        id: 'tab5',
      },
    ],
    style: {
      default: 'button',
    },
    color: 'black',
  },
}

/**
 * スタイル（ボタン）：赤
 */
export const StyleButtonRed: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
      },
      {
        label: 'タブ4',
        content: 'コンテンツ4',
        id: 'tab4',
      },
      {
        label: 'タブ5',
        content: 'コンテンツ5',
        id: 'tab5',
      },
    ],
    style: {
      default: 'button',
    },
    color: 'red',
  },
}

/**
 * スタイル（ボタン）：青
 */
export const StyleButtonBlue: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
      },
      {
        label: 'タブ4',
        content: 'コンテンツ4',
        id: 'tab4',
      },
      {
        label: 'タブ5',
        content: 'コンテンツ5',
        id: 'tab5',
      },
    ],
    style: {
      default: 'button',
    },
    color: 'blue',
  },
}

/**
 * スタイル（ボタン）：グレー
 */
export const StyleButtonBray: Story = {
  args: {
    tabs: [
      {
        label: 'タブ1',
        content: 'コンテンツ1',
        id: 'tab1',
      },
      {
        label: 'タブ2',
        content: 'コンテンツ2',
        id: 'tab2',
      },
      {
        label: 'タブ3',
        content: 'コンテンツ3',
        id: 'tab3',
      },
      {
        label: 'タブ4',
        content: 'コンテンツ4',
        id: 'tab4',
      },
      {
        label: 'タブ5',
        content: 'コンテンツ5',
        id: 'tab5',
      },
    ],
    style: {
      default: 'button',
    },
    color: 'gray',
  },
}
