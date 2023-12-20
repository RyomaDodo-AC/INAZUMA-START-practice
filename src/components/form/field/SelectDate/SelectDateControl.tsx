/**
 * 日付入力制御コンポーネント（react-hook-form）
 * @module SelectDateControl
 * @todo React-hook-formのメソッドをpropsに渡していることによってstoryが死んでるのを直す
 */
'use client'
import React, { forwardRef, useState } from 'react'
import { Select, Input, InputProps } from '@/components/form/field'
import { InputBox, InputBoxProps } from '@/components/form/parts'
import { isValidDate } from '@/features/functions/date/isValidDate'
import { format } from 'date-fns'
import { UseFormSetValue, UseFormTrigger, UseFormGetValues } from 'react-hook-form'

/**
 * 日付入力コンポーネントのプロパティ
 * @typedef {Object} SelectDateProps
 */
export interface SelectDateProps extends Omit<InputProps, 'options'>, Omit<InputBoxProps, 'children'> {
  /**
   * オートコンプリート
   */
  autoCompleteDate?: {
    /**
     * 年
     */
    year?: string
    /**
     * 月
     */
    month?: string
    /**
     * 日
     */
    day?: string
    /**
     * 年月日
     */
    date?: string
  }
  /**
   * 年のオフセット（選択肢をオフセット年前までに絞る）
   */
  yearOffset?: yearOffset
  /**
   * 年の並び順
   */
  yearOrder?: yearOrder
  /**
   * 日付フォーマット（表示）
   */
  formatDate?: '年月日' | '/' | '-' | '.'
  /**
   * 日付フォーマット（値）
   */
  formatDateValue?: 'yyyyMMdd' | 'yyyy/MM/dd' | 'yyyy-MM-dd' | 'yyyy.MM.dd' | 'yyyy年MM月dd日'
  /**
   * setValue（react-form-hooks）：日付のセレクトボックスが変更された際に文字列の値を送信する目的で使用
   */
  setValue: UseFormSetValue<any>
  /**
   * getValues（react-form-hooks）：日付のセレクトボックスが変更された際に文字列の値を取得する目的で使用
   */
  getValues: UseFormGetValues<any>
  /**
   * trigger（react-form-hooks）：日付のセレクトボックスが変更された際にバリデーションを実行する目的で使用
   */
  trigger: UseFormTrigger<any>
}

/**
 * 日付入力コンポーネント
 * @param {SelectDateProps} props - 日付入力コンポーネントのプロパティ
 * @returns {JSX.Element} - 日付入力コンポーネント
 */
export const SelectDateControl = forwardRef<HTMLInputElement, SelectDateProps>((props, ref) => {
  const {
    nameId,
    label,
    note,
    required = undefined,
    error,
    autoCompleteDate,
    yearOffset = {
      // 今年から100年前までの選択肢を作成
      old: new Date().getFullYear(),
      new: new Date().getFullYear() - 100,
    },
    yearOrder = 'desc',
    formatDate = '年月日',
    formatDateValue = 'yyyy-MM-dd',
    contentWidth,
    setValue,
    getValues,
    trigger,
    ...inputProps
  } = props

  // オートコンプリートの設定
  const autoComplete = autoCompleteDate
    ? {
        year: autoCompleteDate.year,
        month: autoCompleteDate.month,
        day: autoCompleteDate.day,
        date: autoCompleteDate.date,
      }
    : undefined

  // 年の選択肢
  const yearOptions = getYearOptions(yearOffset, yearOrder)

  // 月の選択肢
  const monthOptions = getMonthOptions()

  // 日の選択肢
  const dayOptions = getDayOptions()

  // 年月日の値を格納
  const [dateValue, setDateValue] = useState({
    year: '',
    month: '',
    day: '',
  })

  // 隠し項目で日付の値を引数formatDateValueの形式に文字列結合して格納
  const [hiddenValue, setHiddenValue] = useState('')
  const [isValidCheck, setIsValidCheck] = useState(false)

  // 年月日の値が変更されたら値を更新
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    // nameからnameId_を削除してobjectのkeyにする
    const key = name.replace(`${nameId}_`, '')
    setDateValue((prev) => ({ ...prev, [key]: value }))

    // 隠し項目の値を更新
    const date = { ...dateValue, [key]: value }
    const { year, month, day } = date
    const hiddenValue = createDateString(year, month, day, formatDateValue)
    setHiddenValue(hiddenValue)

    // react-form-hooksに伝達
    setValue && setValue(nameId, hiddenValue)
    // 初回バリデーション実行後にリアルタイムにバリデーションを実行する
    ;((error && Object.keys(error).length > 0) || isValidCheck) && (trigger(nameId), setIsValidCheck(true))
  }

  // 日付を選択するセレクトボックス
  const selectDate = (formatDate: string) => {
    // フォーマットを指定
    const yearAfter = formatDate === '年月日' ? '年' : formatDate
    const monthAfter = formatDate === '年月日' ? '月' : formatDate
    const dayAfter = formatDate === '年月日' ? '日' : ''

    // エラー時のclass名
    const errorClass = error ? `bg-red-pale outline outline-red outline-2 -outline-offset-2` : ''

    // 画面遷移などで隠し項目に値が入っている場合は日付の値を更新
    if (getValues(nameId) && !dateValue.year && !dateValue.month && !dateValue.day) {
      // 日付の値を取得
      const dateString = getValues(nameId)
      // 日付の値をDate型に変換
      const date = new Date(dateString)
      // 年月日を取得
      const year = String(date.getFullYear())
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      // 年月日をstateに格納
      setDateValue({ year, month, day })
    }

    return (
      <div className="flex w-full items-start gap-x-2">
        <div className="flex items-center">
          <Select name={`${nameId}_year`} className={`${errorClass}`} options={yearOptions} autoComplete={autoComplete?.year} onChange={handleChange} defaultValue={dateValue.year} />
          <span className="ml-1">{yearAfter}</span>
        </div>
        <div className="flex items-center">
          <Select name={`${nameId}_month`} className={`${errorClass}`} options={monthOptions} autoComplete={autoComplete?.month} onChange={handleChange} defaultValue={dateValue.month} />
          <span className="ml-1">{monthAfter}</span>
        </div>
        <div className="flex items-center">
          <Select name={`${nameId}_day`} className={`${errorClass}`} options={dayOptions} autoComplete={autoComplete?.day} onChange={handleChange} defaultValue={dateValue.day} />
          <span className="ml-1">{dayAfter}</span>
        </div>
      </div>
    )
  }

  return (
    <InputBox nameId={nameId} label={label} note={note} required={required} error={error} contentWidth={contentWidth}>
      {selectDate(formatDate)}
      {/* 非表示で日付形式のinputを置いておく */}
      <Input type="hidden" className="hidden" autoComplete={autoComplete?.date} name={nameId} value={hiddenValue} ref={ref} {...inputProps} />
    </InputBox>
  )
})

SelectDateControl.displayName = 'SelectDateControl'

/**
 * 年の選択肢オブジェクトを返す関数
 * @typedef {Object} YearOption
 * @property {string} value - 年
 * @property {string} label - 年（表示用）
 * @param {number} [yearOffset=100] - 年のオフセット（選択肢をオフセット年前までに絞る）
 * @param {'asc'|'desc'} [yearOrder='desc'] - 年の並び順
 * @returns {YearOption[]} - 年の選択肢オブジェクト
 */
type yearOffset = {
  /**
   * 古い年代
   */
  old: number
  /**
   * 新しい年代
   */
  new: number
}
type yearOrder = 'asc' | 'desc'
export const getYearOptions = (yearOffset: yearOffset, yearOrder: yearOrder = 'desc') => {
  const years: React.OptionHTMLAttributes<HTMLOptionElement>[] = [{ value: '', label: '選択してください', disabled: true }]

  // 並び順によって選択肢を作成
  if (yearOrder === 'asc') {
    for (let i = yearOffset.old; i <= yearOffset.new; i++) {
      years.push({ value: String(i), label: String(i) })
    }
  } else {
    for (let i = yearOffset.new; i >= yearOffset.old; i--) {
      years.push({ value: String(i), label: String(i) })
    }
  }

  return years
}

/**
 * 月の選択肢オブジェクトを返す関数
 * @typedef {Object} MonthOption
 * @property {string} value - 月：01～12
 * @property {string} label - 月（表示用）：1～12
 */
export const getMonthOptions = () => {
  const months: React.OptionHTMLAttributes<HTMLOptionElement>[] = [{ value: '', label: '選択', disabled: true }]
  for (let i = 1; i <= 12; i++) {
    months.push({ value: String(i).padStart(2, '0'), label: String(i) })
  }
  return months
}

/**
 * 日の選択肢オブジェクトを返す関数
 * @typedef {Object} DayOption
 * @property {string} value - 日：01～31
 * @property {string} label - 日（表示用）：1～31
 */
export const getDayOptions = () => {
  const days: React.OptionHTMLAttributes<HTMLOptionElement>[] = [{ value: '', label: '選択', disabled: true }]
  for (let i = 1; i <= 31; i++) {
    days.push({ value: String(i).padStart(2, '0'), label: String(i) })
  }
  return days
}

/**
 * 日付の値を文字列で作成
 * @param {string} year - 年
 * @param {string} month - 月
 * @param {string} day - 日
 * @param {'yyyyMMdd'|'yyyy/MM/dd'|'yyyy-MM-dd'|'yyyy.MM.dd'|'yyyy年MM月dd日'} [formatDateValue='yyyy-MM-dd'] - 日付の値のフォーマット
 * @returns {string} - 日付の値
 */
export const createDateString = (year: string, month: string, day: string, formatDateValue: 'yyyyMMdd' | 'yyyy/MM/dd' | 'yyyy-MM-dd' | 'yyyy.MM.dd' | 'yyyy年MM月dd日' = 'yyyy-MM-dd') => {
  // 年月日が数値に変換できない or 0の場合は空文字を返す
  if (isNaN(Number(year)) || isNaN(Number(month)) || isNaN(Number(day)) || Number(year) === 0 || Number(month) === 0 || Number(day) === 0) {
    return ''
  }

  // 日付の値を引数formatDateValueの形式に文字列結合する
  const date = format(new Date(Number(year), Number(month) - 1, Number(day)), formatDateValue)
  // format関数だと4/31のような本来存在しない日付の場合に、その分の月が繰り上がってしまうので、日付が正しいかチェックするための文字列を作成する
  const dateString = year + '-' + month + '-' + day

  // 日付が不正な場合は空文字を返す
  if (date === 'Invalid Date' || !isValidDate(dateString)) {
    return ''
  }

  return date
}
