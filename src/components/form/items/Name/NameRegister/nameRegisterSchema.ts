/**
 * 名前（正式表記）のバリデーションスキーマ
 * @param {Object} param
 * @param {boolean} [param.required=true] - 必須の場合はtrue
 * @returns {z.ZodString} - 名前（正式表記）のバリデーションスキーマ
 */
import * as z from 'zod'
import { nameRegisterConfig } from '../_config'

export const nameRegisterSchema = ({ required = true }: { required?: boolean }) => {
  const commonSchema = z.string()
  const firstNameSchema = required
    ? commonSchema
        .max(nameRegisterConfig.firstNameLength, { message: '最大' + nameRegisterConfig.firstNameLength + '文字以下で入力してください。' })
        .min(1, { message: '最小1文字以上で入力してください。' })
    : commonSchema.max(nameRegisterConfig.firstNameLength, { message: '最大' + nameRegisterConfig.firstNameLength + '文字以下で入力してください。' }).optional()
  const lastNameSchema = required
    ? commonSchema
        .max(nameRegisterConfig.lastNameLength, { message: '最大' + nameRegisterConfig.lastNameLength + '文字以下で入力してください。' })
        .min(1, { message: '最小1文字以上で入力してください。' })
    : commonSchema.max(nameRegisterConfig.lastNameLength, { message: '最大' + nameRegisterConfig.lastNameLength + '文字以下で入力してください。' }).optional()
  const fullNameSchema = required
    ? commonSchema
        .max(nameRegisterConfig.fullNameLength, { message: '最大' + nameRegisterConfig.fullNameLength + '文字以下で入力してください。' })
        .min(1, { message: '最小1文字以上で入力してください。' })
    : commonSchema.max(nameRegisterConfig.fullNameLength, { message: '最大' + nameRegisterConfig.fullNameLength + '文字以下で入力してください。' }).optional()

  return {
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    fullName: fullNameSchema,
  }
}
