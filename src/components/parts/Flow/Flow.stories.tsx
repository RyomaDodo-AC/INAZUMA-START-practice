import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Flow } from './Flow'

const meta: Meta<typeof Flow> = {
  title: 'parts/Flow',
  component: Flow,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Flow>

/**
 * デフォルト
 */
export const Default: Story = {
  args: {
    lists: [
      {
        content: 'フロー1',
        current: true,
      },
      {
        content: 'フロー2',
        current: true,
      },
      {
        content: 'フロー3',
      },
    ],
  },
}

/**
 * 横フロー（DOMコンテンツ）
 */
export const HorizontalDom: Story = {
  args: {
    lists: [
      {
        content: (
          <div className="bg-blue p-4 text-white">
            フロー1
            <br />
            フロー1
            <br />
            フロー1
          </div>
        ),
        current: true,
      },
      {
        content: <div>フロー2</div>,
        current: true,
      },
      {
        content: <div>フロー3</div>,
      },
    ],
    vertical: false,
  },
}

/**
 * 横フロー（インデックスDOM）
 */
export const HorizontalDomIndex: Story = {
  args: {
    lists: [
      {
        content: 'フロー1',
        current: true,
        indexNode: <div className="relative z-10 bg-white px-4">STEP.1</div>,
      },
      {
        content: 'フロー2',
        current: true,
        indexNode: <div className="relative z-10 bg-white px-4">STEP.2</div>,
      },
      {
        content: 'フロー3',
        indexNode: <div className="relative z-10 bg-white px-4">STEP.3</div>,
      },
    ],
  },
}

/**
 * 横フロー（黒）
 */
export const HorizontalBlack: Story = {
  args: {
    lists: [
      {
        content: 'フロー1',
        current: true,
      },
      {
        content: 'フロー2',
        current: true,
      },
      {
        content: 'フロー3',
        current: true,
      },
      {
        content: 'フロー4',
      },
      {
        content: 'フロー5',
      },
    ],
    vertical: false,
    color: 'black',
  },
}

/**
 * 横フロー（赤）
 */
export const HorizontalRed: Story = {
  args: {
    lists: [
      {
        content: 'フロー1',
        current: true,
      },
      {
        content: 'フロー2',
        current: true,
      },
      {
        content: 'フロー3',
        current: true,
      },
      {
        content: 'フロー4',
      },
      {
        content: 'フロー5',
      },
    ],
    vertical: false,
    color: 'red',
  },
}

/**
 * 横フロー（青）
 */
export const HorizontalBlue: Story = {
  args: {
    lists: [
      {
        content: 'フロー1',
        current: true,
      },
      {
        content: 'フロー2',
        current: true,
      },
      {
        content: 'フロー3',
        current: true,
      },
      {
        content: 'フロー4',
      },
      {
        content: 'フロー5',
      },
    ],
    vertical: false,
    color: 'blue',
  },
}

/**
 * 横フロー（グレー）
 */
export const HorizontalGray: Story = {
  args: {
    lists: [
      {
        content: 'フロー1',
        current: true,
      },
      {
        content: 'フロー2',
        current: true,
      },
      {
        content: 'フロー3',
        current: true,
      },
      {
        content: 'フロー4',
      },
      {
        content: 'フロー5',
      },
    ],
    vertical: false,
    color: 'gray',
  },
}

/**
 * 縦フロー（DOMコンテンツ）
 */
export const VerticalDom: Story = {
  args: {
    lists: [
      {
        content: (
          <div className="w-full bg-blue p-4 text-white">
            フロー1
            <br />
            フロー1
            <br />
            フロー1
          </div>
        ),
        current: true,
      },
      {
        content: (
          <div className="bg-blue p-4 text-white">
            フロー2
            <br />
            フロー2
            <br />
            フロー2
          </div>
        ),
        current: true,
      },
      {
        content: (
          <div className="bg-blue p-4 text-white">
            フロー3
            <br />
            フロー3
            <br />
            フロー3
          </div>
        ),
      },
    ],
    vertical: true,
  },
}

/**
 * 縦フロー（インデックスDOM）
 */
export const VerticalDomIndex: Story = {
  args: {
    lists: [
      {
        content: (
          <div className="w-full bg-blue p-4 text-white">
            フロー1
            <br />
            フロー1
            <br />
            フロー1
          </div>
        ),
        current: true,
        indexNode: (
          <div>
            <div className="relative z-10 bg-white p-4">STEP.1</div>
          </div>
        ),
      },
      {
        content: (
          <div className="bg-blue p-4 text-white">
            フロー2
            <br />
            フロー2
            <br />
            フロー2
          </div>
        ),
        current: true,
        indexNode: (
          <div>
            <div className="relative z-10 bg-white p-4">STEP.2</div>
          </div>
        ),
      },
      {
        content: (
          <div className="bg-blue p-4 text-white">
            フロー3
            <br />
            フロー3
            <br />
            フロー3
          </div>
        ),
        indexNode: (
          <div>
            <div className="relative z-10 bg-white p-4">STEP.3</div>
          </div>
        ),
      },
    ],
    vertical: true,
  },
}

/**
 * 縦フロー（黒）
 */
export const VerticalBlack: Story = {
  args: {
    lists: [
      {
        content: 'フロー1',
        current: true,
      },
      {
        content: 'フロー2',
        current: true,
      },
      {
        content: 'フロー3',
        current: true,
      },
      {
        content: 'フロー4',
      },
      {
        content: 'フロー5',
      },
    ],
    vertical: true,
    color: 'black',
  },
}

/**
 * 縦フロー（赤）
 */
export const VerticalRed: Story = {
  args: {
    lists: [
      {
        content: 'フロー1',
        current: true,
      },
      {
        content: 'フロー2',
        current: true,
      },
      {
        content: 'フロー3',
        current: true,
      },
      {
        content: 'フロー4',
      },
      {
        content: 'フロー5',
      },
    ],
    vertical: true,
    color: 'red',
  },
}

/**
 * 縦フロー（青）
 */
export const VerticalBlue: Story = {
  args: {
    lists: [
      {
        content: 'フロー1',
        current: true,
      },
      {
        content: 'フロー2',
        current: true,
      },
      {
        content: 'フロー3',
        current: true,
      },
      {
        content: 'フロー4',
      },
      {
        content: 'フロー5',
      },
    ],
    vertical: true,
    color: 'blue',
  },
}

/**
 * 縦フロー（グレー）
 */
export const VerticalGray: Story = {
  args: {
    lists: [
      {
        content: 'フロー1',
        current: true,
      },
      {
        content: 'フロー2',
        current: true,
      },
      {
        content: 'フロー3',
        current: true,
      },
      {
        content: 'フロー4',
      },
      {
        content: 'フロー5',
      },
    ],
    vertical: true,
    color: 'gray',
  },
}
