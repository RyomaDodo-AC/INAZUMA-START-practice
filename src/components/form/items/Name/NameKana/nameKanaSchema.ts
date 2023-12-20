/**
 * 名前（ふりがな）のバリデーションスキーマ
 * @param {Object} param
 * @param {boolean} [param.required=true] - 必須の場合はtrue
 * @param {string} [param.kanaType='katakana'] - ひらがな or カタカナ
 * @returns {z.ZodString} - 名前（ふりがな）のバリデーションスキーマ
 */
import * as z from 'zod'
import { nameKanaConfig } from '../_config'

export const nameKanaSchema = ({ required = true, kanaType = 'katakana' }: { required?: boolean; kanaType?: 'hiragana' | 'katakana' }) => {
  const commonSchema =
    kanaType === 'hiragana' ? z.string().regex(/^[\u3040-\u309F]+$/, { message: 'ひらがなで入力してください。' }) : z.string().regex(/^[\u30A0-\u30FF]+$/, { message: 'カタカナで入力してください。' })
  const firstNameSchema = required
    ? commonSchema.max(nameKanaConfig.firstNameLength, { message: '最大' + nameKanaConfig.firstNameLength + '文字以下で入力してください。' }).min(1, { message: '最小1文字以上で入力してください。' })
    : commonSchema.max(nameKanaConfig.firstNameLength, { message: '最大' + nameKanaConfig.firstNameLength + '文字以下で入力してください。' }).optional()
  const lastNameSchema = required
    ? commonSchema.max(nameKanaConfig.lastNameLength, { message: '最大' + nameKanaConfig.lastNameLength + '文字以下で入力してください。' }).min(1, { message: '最小1文字以上で入力してください。' })
    : commonSchema.max(nameKanaConfig.lastNameLength, { message: '最大' + nameKanaConfig.lastNameLength + '文字以下で入力してください。' }).optional()
  const fullNameSchema = required
    ? commonSchema.max(nameKanaConfig.fullNameLength, { message: '最大' + nameKanaConfig.fullNameLength + '文字以下で入力してください。' }).min(1, { message: '最小1文字以上で入力してください。' })
    : commonSchema.max(nameKanaConfig.fullNameLength, { message: '最大' + nameKanaConfig.fullNameLength + '文字以下で入力してください。' }).optional()

  return {
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    fullName: fullNameSchema,
  }
}
