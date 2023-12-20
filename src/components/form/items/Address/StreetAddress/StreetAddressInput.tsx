/**
 * 町名・番地入力コンポーネント
 * @module StreetAddressInput
 */
import React, { forwardRef } from 'react'
import { InputControl, InputControlProps } from '@/components/form/field'
import { streetAddressConfig } from '../_config'

/**
 * 町名・番地入力コンポーネントのプロパティ
 * @typedef {Object} StreetAddressInputProps
 * @property {InputControlProps} - 入力コンポーネントのプロパティ
 */
export interface StreetAddressInputProps extends InputControlProps {
  /**
   * オートコンプリート
   */
  autoComplete?: string
}

/**
 * 町名・番地入力コンポーネント
 * @param {StreetAddressInputProps} props - 町名・番地入力コンポーネントのプロパティ
 * @returns {JSX.Element} - 町名・番地入力コンポーネント
 */
export const StreetAddressInput = forwardRef<HTMLInputElement, StreetAddressInputProps>((props, ref) => {
  const { nameId, label, note, required = undefined, error, autoComplete = 'address-line1', ...inputProps } = props

  return (
    <InputControl
      nameId={nameId}
      label={label}
      note={note}
      required={required}
      error={error}
      type="text"
      placeholder="例）○○町0丁目0番0号"
      maxLength={streetAddressConfig.maxLength}
      autoComplete={autoComplete}
      ref={ref}
      {...inputProps}
    />
  )
})

StreetAddressInput.displayName = 'StreetAddressInput'
