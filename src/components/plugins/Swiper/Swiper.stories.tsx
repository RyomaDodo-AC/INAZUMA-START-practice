import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Swiper } from './Swiper'

const meta: Meta<typeof Swiper> = {
  title: 'plugins/Swiper',
  component: Swiper,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Swiper>

/**
 * デフォルト
 */
export const Default: Story = {
  args: {
    contents: [
      <>
        <div className="flex h-80 w-full items-center justify-center bg-black text-xl font-bold text-white">Slide 1</div>
      </>,
      <>
        <div className="flex h-80 w-full items-center justify-center bg-red text-xl font-bold text-white">Slide 2</div>
      </>,
      <>
        <div className="flex h-80 w-full items-center justify-center bg-blue text-xl font-bold text-white">Slide 3</div>
      </>,
      <>
        <div className="flex h-80 w-full items-center justify-center bg-gray-500 text-xl font-bold text-white">Slide 4</div>
      </>,
    ],
  },
}
