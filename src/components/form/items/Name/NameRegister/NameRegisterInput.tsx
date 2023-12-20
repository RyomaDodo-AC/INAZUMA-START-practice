/**
 * 名前（正式表記）入力コンポーネント
 * @module NameRegisterInput
 */
import React, { forwardRef } from 'react'
import { InputControl, InputControlProps } from '@/components/form/field'
import { nameRegisterConfig } from '../_config'

/**
 * 名前（正式表記）入力コンポーネントのプロパティ
 * @typedef {Object} NameRegisterInputProps
 * @property {InputControlProps} - 入力コンポーネントのプロパティ
 */
export interface NameRegisterInputProps {
  /**
   * Props
   */
  nameProps?: {
    /**
     * 苗字Props
     */
    lastNameProps?: InputControlProps & { onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }
    /**
     * 名前Props
     */
    firstNameProps?: InputControlProps & { onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }
    /**
     * フルネームProps
     */
    fullNameProps?: InputControlProps & { onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }
  }
  /**
   * 姓名分離
   */
  separate?: boolean
  /**
   * オートかな用onChange
   */
  onChangeAutoKanaLastNameKana?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeAutoKanaFirstNameKana?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeAutoKanaFullNameKana?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * 名前（正式表記）入力コンポーネント
 * @param {NameRegisterInputProps} props - 名前（正式表記）入力コンポーネントのプロパティ
 * @returns {JSX.Element} - 名前（正式表記）入力コンポーネント
 */

export const NameRegisterInput = forwardRef<HTMLInputElement, NameRegisterInputProps>((props, ref) => {
  const { nameProps, separate = true, onChangeAutoKanaLastNameKana, onChangeAutoKanaFirstNameKana, onChangeAutoKanaFullNameKana } = props

  let FullName
  if (nameProps?.fullNameProps?.nameId) {
    // namePropsから既存のonChangeを隔離
    const { onChange, ...fullNameProps } = nameProps?.fullNameProps || {}
    FullName = (
      <div className="w-full">
        <InputControl
          type="text"
          maxLength={nameRegisterConfig.fullNameLength}
          placeholder="例）山田太郎"
          ref={ref}
          autoComplete={fullNameProps?.autoComplete ? fullNameProps?.autoComplete : 'name'}
          onChange={(e) => {
            onChange && onChange(e)
            onChangeAutoKanaFullNameKana && onChangeAutoKanaFullNameKana(e)
          }}
          {...fullNameProps}
        />
      </div>
    )
  } else {
    FullName = <></>
  }

  let lastName
  if (nameProps?.lastNameProps?.nameId) {
    // namePropsから既存のonChangeを隔離
    const { onChange, ...lastNameProps } = nameProps?.lastNameProps || {}
    lastName = (
      <InputControl
        type="text"
        maxLength={nameRegisterConfig.lastNameLength}
        placeholder="例）山田"
        ref={ref}
        autoComplete={lastNameProps?.autoComplete ? lastNameProps?.autoComplete : 'family-name'}
        onChange={(e) => {
          onChange && onChange(e)
          onChangeAutoKanaLastNameKana && onChangeAutoKanaLastNameKana(e)
        }}
        contentWidth="full"
        {...lastNameProps}
      />
    )
  }

  let firstName
  if (nameProps?.firstNameProps?.nameId) {
    // namePropsから既存のonChangeを隔離
    const { onChange, ...firstNameProps } = nameProps?.firstNameProps || {}
    firstName = (
      <InputControl
        type="text"
        maxLength={nameRegisterConfig.firstNameLength}
        placeholder="例）太郎"
        ref={ref}
        autoComplete={firstNameProps?.autoComplete ? firstNameProps?.autoComplete : 'given-name'}
        onChange={(e) => {
          onChange && onChange(e)
          onChangeAutoKanaFirstNameKana && onChangeAutoKanaFirstNameKana(e)
        }}
        contentWidth="full"
        {...firstNameProps}
      />
    )
  }

  const SeparateName = (
    <div className="flex w-full gap-2">
      {nameProps?.lastNameProps?.nameId && lastName}
      {nameProps?.firstNameProps?.nameId && firstName}
    </div>
  )

  return separate ? SeparateName : FullName
})

NameRegisterInput.displayName = 'NameRegisterInput'
