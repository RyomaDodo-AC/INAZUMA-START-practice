/**
 * 端末の色バリデーションスキーマ
 * @param {Object} param
 * @param {boolean} [param.required=true] - 必須の場合はtrue
 * @returns {z.ZodString} - オプションのバリデーションスキーマ
 */
import * as z from 'zod'

export const CompleteTerminalColorSchema = ({ required = true }: { required?: boolean } = {}) => {
  return z.string({ invalid_type_error: '端末の色を選択してください' }).refine((val) => {
    // 空文字の場合は必須チェックを行わない
    if (val === '') return !required

    return true
  }, '端末の色を選択してください')
}
