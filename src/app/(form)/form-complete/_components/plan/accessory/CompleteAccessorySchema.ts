/**
 * 付属品のバリデーションスキーマ
 * @param {Object} param
 * @param {boolean} [param.required=true] - 必須の場合はtrue
 * @returns {z.ZodString} - オプションのバリデーションスキーマ
 */
import * as z from 'zod'

export const CompleteTerminalAccessorySchema = ({ required = false }: { required?: boolean } = {}) => {
  return z
    .string({ invalid_type_error: '付属品を選択してください' })
    .nullish()
    .refine((val) => {
      // 空文字の場合は必須チェックを行わない
      if (val === '') return !required

      return true
    }, '付属品を選択してください')
}
