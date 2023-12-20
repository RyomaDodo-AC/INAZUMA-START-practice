/**
 * 日付のバリデーションスキーマ
 * @param {object} param
 * @param {boolean} [param.required=true] - 必須の場合はtrue
 * @param {'yyyyMMdd'|'yyyy/MM/dd'|'yyyy-MM-dd'|'yyyy.MM.dd'|'yyyy年MM月dd日'} [param.formatDateValue='yyyy-MM-dd'] - 日付の値のフォーマット
 * @returns {z.ZodSchema} - 日付のバリデーションスキーマ
 */
import * as z from 'zod'
import { format } from 'date-fns'
import { isValidDate } from '@/features/functions/date/isValidDate'

export const dateStringSchema = ({
  required = true,
  formatDateValue = 'yyyy-MM-dd',
}: { required?: boolean; formatDateValue?: 'yyyyMMdd' | 'yyyy/MM/dd' | 'yyyy-MM-dd' | 'yyyy.MM.dd' | 'yyyy年MM月dd日' } = {}) => {
  return z.string().refine(
    (val) => {
      // 空文字の場合は必須チェックを行わない
      if (val === '') return !required

      // 日付の値を引数formatDateValueの形式に文字列結合する
      const date = format(new Date(val), formatDateValue)

      // 日付が不正な場合はfalseを返す
      if (date === 'Invalid Date' || !isValidDate(date, formatDateValue)) {
        return false
      }

      return true
    },
    { message: '日付が不正です' },
  )
}
