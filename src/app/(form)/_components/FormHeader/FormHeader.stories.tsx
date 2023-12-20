import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { FormHeader } from './FormHeader'

const meta: Meta<typeof FormHeader> = {
  title: 'page/form/FormHeader',
  component: FormHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof FormHeader>

/**
 * デフォルト
 */
export const Default: Story = {}

/**
 * form-entry
 */
export const FormEntry: Story = {
  args: {
    path: '/form-entry',
  },
}

/**
 * form-complete
 */
export const FormComplete: Story = {
  args: {
    path: '/form-complete',
  },
}

/**
 * form-appoint
 */
export const FormAppoint: Story = {
  args: {
    path: '/form-appoint',
  },
}

/**
 * form-inquiry
 */
export const FormInquiry: Story = {
  args: {
    path: '/form-inquiry',
  },
}
