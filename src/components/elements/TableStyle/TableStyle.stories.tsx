import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { TableStyle } from './TableStyle'

const meta: Meta<typeof TableStyle> = {
  title: 'Style/TableStyle',
  component: TableStyle,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TableStyle>

/**
 * .table-style（`table`タグに付与）
 */
export const Table_Style: Story = {}

/**
 * .table-style-row（`thead`や`tbody`などの行となる子要素を持つ親要素に付与）
 */
export const Table_Style_Row: Story = {}

/**
 * .table-style-cell（`th`と`td`に付与）
 */
export const Table_Style_Cell: Story = {}

/**
 * .table-style-th（`th`に付与）
 */
export const Table_Style_Th: Story = {}
