/**
 * 建物名入力コンポーネント
 * @module BuildingInput
 */
import React, { forwardRef } from 'react'
import { InputControl, InputControlProps } from '@/components/form/field'
import { buildingConfig } from '../_config'

/**
 * 建物名入力コンポーネントのプロパティ
 * @typedef {Object} BuildingInputProps
 * @property {InputControlProps} - 入力コンポーネントのプロパティ
 */
export interface BuildingInputProps extends InputControlProps {
  /**
   * オートコンプリート
   */
  autoComplete?: string
}

/**
 * 建物名入力コンポーネント
 * @param {BuildingInputProps} props - 建物名入力コンポーネントのプロパティ
 * @returns {JSX.Element} - 建物名入力コンポーネント
 */
export const BuildingInput = forwardRef<HTMLInputElement, BuildingInputProps>((props, ref) => {
  const { nameId, label, note, required = undefined, error, autoComplete = 'address-line2', ...inputProps } = props

  return (
    <InputControl
      nameId={nameId}
      label={label}
      note={note}
      required={required}
      error={error}
      type="text"
      placeholder="例）○○ビル101号"
      maxLength={buildingConfig.maxLength}
      autoComplete={autoComplete}
      ref={ref}
      {...inputProps}
    />
  )
})

BuildingInput.displayName = 'BuildingInput'
