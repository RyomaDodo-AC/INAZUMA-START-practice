/**
 * 名前（ふりがな）入力コンポーネント
 * @module NameKanaInput
 */
import React, { forwardRef } from 'react'
import { InputControl, InputControlProps } from '@/components/form/field'
import { nameKanaConfig } from '../_config'

/**
 * 名前（ふりがな）入力コンポーネントのプロパティ
 * @typedef {Object} NameKanaInputProps
 * @property {InputControlProps} - 入力コンポーネントのプロパティ
 */

export interface NameKanaInputProps {
  /**
   * Props
   */
  nameProps?: {
    /**
     * 苗字Props
     */
    lastNameProps?: InputControlProps
    /**
     * 名前Props
     */
    firstNameProps?: InputControlProps
    /**
     * フルネームProps
     */
    fullNameProps?: InputControlProps
  }
  /**
   * 姓名分離
   */
  separate?: boolean
  /**
   * ひらがな or カタカナ
   */
  kanaType?: 'hiragana' | 'katakana'
  /**
   * オートかな用Ref
   */
  lastNameKanaRef?: React.MutableRefObject<HTMLInputElement | null>
  firstNameKanaRef?: React.MutableRefObject<HTMLInputElement | null>
  fullNameKanaRef?: React.MutableRefObject<HTMLInputElement | null>
}

/**
 * 名前（ふりがな）入力コンポーネント
 * @param {NameKanaInputProps} props - 名前（ふりがな）入力コンポーネントのプロパティ
 * @returns {JSX.Element} - 名前（ふりがな）入力コンポーネント
 */
export const NameKanaInput = forwardRef<HTMLInputElement, NameKanaInputProps>((props, ref) => {
  const { nameProps, separate = true, kanaType = 'katakana', lastNameKanaRef, firstNameKanaRef, fullNameKanaRef } = props

  // Refを定義
  const assignRef = (inputRef: HTMLInputElement | null, targetRef: React.MutableRefObject<HTMLInputElement | null> | undefined) => {
    if (targetRef && targetRef.current && inputRef) {
      targetRef.current = inputRef
    }
    if (ref) {
      if (typeof ref === 'function') {
        ref(inputRef)
      } else {
        ref.current = inputRef
      }
    }
  }

  // DOMを定義
  const FullName = nameProps?.fullNameProps?.nameId ? (
    <div className="w-full">
      <InputControl
        type="text"
        maxLength={nameKanaConfig.fullNameLength}
        placeholder={kanaType === 'katakana' ? '例）ヤマダタロウ' : '例）やまだたろう'}
        ref={(inputRef) => assignRef(inputRef, fullNameKanaRef)}
        {...nameProps?.fullNameProps}
      />
    </div>
  ) : (
    <></>
  )

  const SeparateName = (
    <div className="flex gap-2">
      {nameProps?.lastNameProps?.nameId && (
        <InputControl
          type="text"
          maxLength={nameKanaConfig.lastNameLength}
          placeholder={kanaType === 'katakana' ? '例）ヤマダ' : '例）やまだ'}
          ref={(inputRef) => assignRef(inputRef, lastNameKanaRef)}
          contentWidth="full"
          {...nameProps?.lastNameProps}
        />
      )}
      {nameProps?.firstNameProps?.nameId && (
        <InputControl
          type="text"
          maxLength={nameKanaConfig.firstNameLength}
          placeholder={kanaType === 'katakana' ? '例）タロウ' : '例）たろう'}
          ref={(inputRef) => assignRef(inputRef, firstNameKanaRef)}
          contentWidth="full"
          {...nameProps?.firstNameProps}
        />
      )}
    </div>
  )

  return separate ? SeparateName : FullName
})

NameKanaInput.displayName = 'NameKanaInput'
