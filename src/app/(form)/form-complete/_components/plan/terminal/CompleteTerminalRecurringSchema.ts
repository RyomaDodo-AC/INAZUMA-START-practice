/**
 * 端末の代金情報バリデーションスキーマ
 * @param {Object} param
 * @param {boolean} [param.required=true] - 必須の場合はtrue
 * @returns {z.ZodString} - オプションのバリデーションスキーマ
 */
import * as z from 'zod'

export const CompleteTerminalRecurringSchema = ({ required = true }: { required?: boolean } = {}) => {
  return z.string({ invalid_type_error: '機種代金を選択してください' }).refine((val) => {
    // 空文字の場合は必須チェックを行わない
    if (val === '') return !required

    return true
  }, '機種代金を選択してください')
}
