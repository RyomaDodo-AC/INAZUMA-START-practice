/**
 * 郵便番号のバリデーションスキーマ
 * @param {Object} param
 * @param {boolean} [param.hyphen=false] - ハイフンありの場合はtrue
 * @param {boolean} [param.required=true] - 必須の場合はtrue
 * @returns {z.ZodString} - 郵便番号のバリデーションスキーマ
 */
import * as z from 'zod'

export const postalCodeSchema = ({ hyphen = false, required = true }: { hyphen?: boolean; required?: boolean } = {}) => {
  const postalCode = hyphen ? z.string().regex(/^\d{3}-\d{4}$/, { message: '郵便番号の形式で入力してください' }) : z.string().regex(/^\d{7}$/, { message: '郵便番号の形式で入力してください' })
  return required ? postalCode : postalCode.optional()
}
