/**
 * 生年月日入力コンポーネント
 * @module BirthDateInput
 * @memo 年齢を計算するときはこのコンポーネントの値を参照して年齢コンポーネントで計算する
 */
import React, { forwardRef, useEffect } from 'react'
import { SelectDateControl, SelectDateProps } from '@/components/form/field'

/**
 * 生年月日入力コンポーネントのプロパティ
 * @typedef {Object} BirthDateProps
 * @property {SelectDateProps} - 日付入力コンポーネントのプロパティ
 */
export interface BirthDateProps extends SelectDateProps {
  /**
   * 生年月日
   */
  birthDate?: Date
}

/**
 * 生年月日入力コンポーネント
 * @param {BirthDateProps} props - 生年月日入力コンポーネントのプロパティ
 * @returns {JSX.Element} - 生年月日入力コンポーネント
 */
export const BirthDateInput = forwardRef<HTMLInputElement, BirthDateProps>((props, ref) => {
  const {
    nameId,
    label,
    note,
    required = undefined,
    error,
    autoCompleteDate = {
      year: 'bday-day',
      month: 'bday-month',
      day: 'bday-year',
      date: 'bday',
    },
    yearOrder = 'desc',
    formatDate = '年月日',
    birthDate,
    ...inputProps
  } = props

  /**
   * 年齢を計算して年齢コンポーネントにセットする
   */
  useEffect(() => {
    if (!birthDate) return

    /**
     * 現在の日付から年齢を計算する
     */
    const calcAge = () => {
      const today = new Date()
      const birth = new Date(birthDate)

      let age = today.getFullYear() - birth.getFullYear()
      const m = today.getMonth() - birth.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--
      }

      return age
    }

    const age = calcAge()
    inputProps.setValue('age', String(age))
  }, [birthDate, nameId, inputProps])

  return (
    <SelectDateControl
      nameId={nameId}
      label={label}
      note={note}
      required={required}
      error={error}
      autoCompleteDate={autoCompleteDate}
      yearOrder={yearOrder}
      formatDate={formatDate}
      ref={ref}
      {...inputProps}
    />
  )
})

BirthDateInput.displayName = 'BirthDateInput'
