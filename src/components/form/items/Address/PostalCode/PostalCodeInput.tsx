/**
 * 郵便番号入力コンポーネント
 * @module PostalCodeInput
 */
import React, { forwardRef } from 'react'
import { InputControl, InputControlProps } from '@/components/form/field'
import Link from 'next/link'
import { Share } from '@/components/icon'

/**
 * 郵便番号入力コンポーネントのプロパティ
 * @typedef {Object} PostalCodeInputProps
 * @property {InputControlProps} - 入力コンポーネントのプロパティ
 */
export interface PostalCodeInputProps extends InputControlProps {
  /**
   * オートコンプリート
   */
  autoComplete?: string
  /**
   * ハイフンありの場合はtrue
   * @memo ハイフンありの場合は住所自動補完ができない
   */
  hyphen?: boolean
  /**
   * 郵便番号検索リンクの表示
   */
  linkDisplay?: boolean
}

/**
 * 郵便番号入力コンポーネント
 * @param {PostalCodeInputProps} props - 郵便番号入力コンポーネントのプロパティ
 * @returns {JSX.Element} - 郵便番号入力コンポーネント
 */
export const PostalCodeInput = forwardRef<HTMLInputElement, PostalCodeInputProps>((props, ref) => {
  const { nameId, label, note, required = undefined, hyphen = false, linkDisplay, error, autoComplete = 'postal-code', ...inputProps } = props

  // 郵便番号を検索するリンク
  const link = linkDisplay && (
    <Link href="https://www.post.japanpost.jp/zipcode/" target="_blank" className="group inline-flex items-center gap-x-1">
      <span className="text-sm text-blue underline group-hover:no-underline">郵便番号を検索する</span>
      <span>
        <Share className="text-blue" />
      </span>
    </Link>
  )

  return (
    <div>
      <InputControl
        nameId={nameId}
        label={label}
        note={note ? note : hyphen ? { list: ['ハイフンありで入力してください。'] } : { list: ['ハイフンなしで入力してください。'] }}
        required={required}
        error={error}
        type="tel"
        maxLength={hyphen ? 8 : 7}
        placeholder={hyphen ? '例）123-4567' : '例）1234567'}
        autoComplete={autoComplete}
        ref={ref}
        className="!w-auto max-w-full"
        afterChildren={link}
        {...inputProps}
      />
    </div>
  )
})

PostalCodeInput.displayName = 'PostalCodeInput'
