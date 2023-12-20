/**
 * 生年月日入力コンポーネントのスキーマ
 * @param {object} param
 * @param {boolean} [param.required=true] - 必須の場合はtrue
 * @param {'yyyyMMdd'|'yyyy/MM/dd'|'yyyy-MM-dd'|'yyyy.MM.dd'|'yyyy年MM月dd日'} [param.formatDateValue='yyyy-MM-dd'] - 日付の値のフォーマット
 * @param {number} [param.minAge=0] - 最小年齢
 * @param {number} [param.maxAge=100] - 最大年齢
 * @returns {z.ZodSchema} - 日付のバリデーションスキーマ
 */
import * as z from 'zod'
import { getAge } from '@/features/functions/date/getAge'
import { dateStringSchema } from '@/components/form/field'

export const birthDateSchema = ({
  required = true,
  formatDateValue = 'yyyy-MM-dd',
  minAge = 0,
  maxAge = 100,
}: {
  required?: boolean
  formatDateValue?: 'yyyyMMdd' | 'yyyy/MM/dd' | 'yyyy-MM-dd' | 'yyyy.MM.dd' | 'yyyy年MM月dd日'
  minAge?: number
  maxAge?: number
} = {}): z.ZodSchema<string> => {
  return dateStringSchema({
    required,
    formatDateValue,
  })
    .refine(
      (value) => {
        // 年齢を取得
        const age = Number(getAge(value))

        // 最小年齢と比較
        if (age < minAge) {
          return false
        }
        return true
      },
      {
        message: `${minAge}歳以上である必要があります`,
      },
    )
    .refine(
      (value) => {
        // 年齢を取得
        const age = Number(getAge(value))

        // 最大年齢と比較
        if (age > maxAge) {
          return false
        }
        return true
      },
      {
        message: `${maxAge}歳以下である必要があります`,
      },
    )
}
