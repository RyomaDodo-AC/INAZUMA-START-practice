/**
 * 電話番号入力コンポーネント
 * @module TelInput
 */
import React, { forwardRef } from 'react'
import { InputControl, InputControlProps } from '@/components/form/field'

/**
 * 電話番号入力コンポーネントのプロパティ
 * @typedef {Object} TelProps
 * @property {InputControlProps} - 入力コンポーネントのプロパティ
 */
export interface TelProps extends InputControlProps {
  /**
   * オートコンプリート
   */
  autoComplete?: string
  /**
   * ハイフンありの場合はtrue
   */
  hyphen?: boolean
}

/**
 * 電話番号入力コンポーネント
 * @param {TelProps} props - 電話番号入力コンポーネントのプロパティ
 * @returns {JSX.Element} - 電話番号入力コンポーネント
 */
export const TelInput = forwardRef<HTMLInputElement, TelProps>((props, ref) => {
  const { nameId, label, note = { list: ['半角で入力してください。'] }, required = undefined, hyphen = false, error, autoComplete = 'tel', ...inputProps } = props

  return (
    <InputControl
      nameId={nameId}
      label={label}
      note={note}
      required={required}
      error={error}
      type="tel"
      maxLength={hyphen ? 15 : 11}
      placeholder={hyphen ? '例）090-1234-5678' : '例）09012345678 ※ハイフンなし'}
      autoComplete={autoComplete}
      ref={ref}
      {...inputProps}
    />
  )
})

TelInput.displayName = 'TelInput'
