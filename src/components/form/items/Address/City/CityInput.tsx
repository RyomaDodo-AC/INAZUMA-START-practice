/**
 * 市区町村入力コンポーネント
 * @module CityInput
 */
import React, { forwardRef } from 'react'
import { InputControl, InputControlProps } from '@/components/form/field'
import { cityConfig } from '../_config'

/**
 * 市区町村入力コンポーネントのプロパティ
 * @typedef {Object} CityInputProps
 * @property {InputControlProps} - 入力コンポーネントのプロパティ
 */
export interface CityInputProps extends InputControlProps {
  /**
   * オートコンプリート
   */
  autoComplete?: string
}

/**
 * 市区町村入力コンポーネント
 * @param {CityInputProps} props - 市区町村入力コンポーネントのプロパティ
 * @returns {JSX.Element} - 市区町村入力コンポーネント
 */
export const CityInput = forwardRef<HTMLInputElement, CityInputProps>((props, ref) => {
  const { nameId, label, note, required = undefined, error, autoComplete = 'address-level2', ...inputProps } = props

  return (
    <InputControl
      nameId={nameId}
      label={label}
      note={note}
      required={required}
      error={error}
      type="text"
      placeholder="例）○○市"
      maxLength={cityConfig.maxLength}
      autoComplete={autoComplete}
      ref={ref}
      {...inputProps}
    />
  )
})

CityInput.displayName = 'CityInput'
