/**
 * 市区町村のバリデーションスキーマ
 * @param {Object} param
 * @param {boolean} [param.required=true] - 必須の場合はtrue
 * @returns {z.ZodString} - 市区町村のバリデーションスキーマ
 */
import * as z from 'zod'
import { cityConfig } from '../_config'

export const citySchema = ({ required = true }: { required?: boolean } = {}) => {
  return z
    .string()
    .max(cityConfig.maxLength, `${cityConfig.maxLength}文字以内で入力してください`)
    .refine((val) => {
      return val === '' ? !required : true
    }, '必須項目です')
}
