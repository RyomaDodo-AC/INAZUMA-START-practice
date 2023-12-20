import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { FormProgress } from './FormProgress'

const meta: Meta<typeof FormProgress> = {
  title: 'page/form/FormProgress',
  component: FormProgress,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FormProgress>

/**
 * デフォルト
 */
export const Default: Story = {}

/**
 * form-entry/
 */
export const FormEntry: Story = {
  args: {
    path: '/form-entry',
  },
}

/**
 * form-entry/confirm
 */
export const FormEntryConfirm: Story = {
  args: {
    path: '/form-entry/confirm',
  },
}

/**
 * form-entry/finish
 */
export const FormEntryFinish: Story = {
  args: {
    path: '/form-entry/finish',
  },
}

/**
 * form-complete/
 */
export const FormComplete: Story = {
  args: {
    path: '/form-complete',
  },
}

/**
 * form-complete/input
 */
export const FormCompleteInput: Story = {
  args: {
    path: '/form-complete/input',
  },
}

/**
 * form-complete/confirm
 */
export const FormCompleteConfirm: Story = {
  args: {
    path: '/form-complete/confirm',
  },
}

/**
 * form-complete/finish
 */
export const FormCompleteFinish: Story = {
  args: {
    path: '/form-complete/finish',
  },
}

/**
 * form-appoint/
 */
export const FormAppoint: Story = {
  args: {
    path: '/form-appoint',
  },
}

/**
 * form-appoint/confirm
 */
export const FormAppointConfirm: Story = {
  args: {
    path: '/form-appoint/confirm',
  },
}

/**
 * form-appoint/finish
 */
export const FormAppointFinish: Story = {
  args: {
    path: '/form-appoint/finish',
  },
}

/**
 * form-inquiry/
 */
export const FormInquiry: Story = {
  args: {
    path: '/form-inquiry',
  },
}

/**
 * form-inquiry/confirm
 */
export const FormInquiryConfirm: Story = {
  args: {
    path: '/form-inquiry/confirm',
  },
}

/**
 * form-inquiry/finish
 */
export const FormInquiryFinish: Story = {
  args: {
    path: '/form-inquiry/finish',
  },
}
