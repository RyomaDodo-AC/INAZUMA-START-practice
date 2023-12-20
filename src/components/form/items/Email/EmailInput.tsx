/**
 * メールアドレス入力コンポーネント
 * @module EmailInput
 * @memo 確認用メールアドレスが必要な場合はこのコンポーネントを2つ使用する
 */
import React, { forwardRef } from 'react'
import { InputControl, InputControlProps } from '@/components/form/field'

/**
 * メールアドレス入力コンポーネントのプロパティ
 * @typedef {Object} EmailProps
 * @property {InputControlProps} - 入力コンポーネントのプロパティ
 */
export interface EmailProps extends InputControlProps {
  /**
   * オートコンプリート
   */
  autoComplete?: string
}

/**
 * メールアドレス入力コンポーネント
 * @param {EmailProps} props - メールアドレス入力コンポーネントのプロパティ
 * @returns {JSX.Element} - メールアドレス入力コンポーネント
 */
export const EmailInput = forwardRef<HTMLInputElement, EmailProps>((props, ref) => {
  const { nameId, label, note, required = undefined, error, autoComplete = 'email', ...inputProps } = props

  return (
    <InputControl
      nameId={nameId}
      label={label}
      note={note}
      required={required}
      error={error}
      type="email"
      maxLength={254}
      placeholder={'例）sample@example.com'}
      autoComplete={autoComplete}
      ref={ref}
      {...inputProps}
    />
  )
})

EmailInput.displayName = 'EmailInput'
