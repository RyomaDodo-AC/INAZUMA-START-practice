/**
 * メールアドレスのバリデーションスキーマ
 * @param {Object} param
 * @param {boolean} [param.required=true] - 必須の場合はtrue
 * @returns {z.ZodString} - メールアドレスのバリデーションスキーマ
 * @memo 確認用メールアドレスのチェックは全体のスキーマをz.objectで定義している親コンポーネントでsuperRefineで設定する
 * @see https://zenn.dev/nyatinte/articles/ade85843d6d460
 */
import * as z from 'zod'

export const emailSchema = ({ required = true }: { required?: boolean } = {}) => {
  return z
    .string()
    .email({ message: 'メールアドレスの形式で入力してください' })
    .max(254, { message: '最大254文字以内で入力してください' })
    .regex(/^[\u0021-\u007e]+$/u, { message: '半角英数字記号で入力してください' })
    .refine(
      (val) => {
        // 必須かどうかチェック
        if (required) {
          return val !== ''
        }
        return true
      },
      { message: 'メールアドレスを入力してください' },
    )
}
