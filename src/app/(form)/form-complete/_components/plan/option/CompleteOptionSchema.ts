/**
 * オプションのバリデーションスキーマ
 * @param {Object} param
 * @param {boolean} [param.required=true] - 必須の場合はtrue
 * @returns {z.ZodString} - オプションのバリデーションスキーマ
 */
import * as z from 'zod'
import { useMicroCMSContext } from '@/features/context'

export const CompleteOptionSchema = ({ required = false }: { required?: boolean } = {}) => {
  const { getOptions } = useMicroCMSContext()

  return z.string({ invalid_type_error: 'オプションを選択してください' }).refine((val) => {
    // 空文字の場合は必須チェックを行わない
    if (val === '') return !required

    // オプションの選択肢を動的に取得
    const options = getOptions()

    return options.some((option) => option.id === val)
  }, 'オプションを選択してください')
}
