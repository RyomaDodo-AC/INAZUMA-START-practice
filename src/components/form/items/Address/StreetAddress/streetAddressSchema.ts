/**
 * 町名・番地のバリデーションスキーマ
 * @param {Object} param
 * @param {boolean} [param.required=true] - 必須の場合はtrue
 * @returns {z.ZodString} - 町名・番地のバリデーションスキーマ
 */
import * as z from 'zod'
import { streetAddressConfig } from '../_config'

export const streetAddressSchema = ({ required = true }: { required?: boolean } = {}) => {
  return z
    .string()
    .max(streetAddressConfig.maxLength, `${streetAddressConfig.maxLength}文字以内で入力してください`)
    .refine((val) => {
      return val === '' ? !required : true
    }, '必須項目です')
}
