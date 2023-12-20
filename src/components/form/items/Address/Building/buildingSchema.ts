/**
 * 建物名のバリデーションスキーマ
 * @param {Object} param
 * @param {boolean} [param.required=false] - 必須の場合はtrue
 * @returns {z.ZodString} - 建物名のバリデーションスキーマ
 */
import * as z from 'zod'
import { buildingConfig } from '../_config'

export const buildingSchema = ({ required = false }: { required?: boolean } = {}) => {
  return z
    .string()
    .max(buildingConfig.maxLength, `${buildingConfig.maxLength}文字以内で入力してください`)
    .refine((val) => {
      return val === '' ? !required : true
    }, '必須項目です')
}
