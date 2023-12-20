/**
 * 端末保証のバリデーションスキーマ
 * @param {Object} param
 * @param {boolean} [param.required=true] - 必須の場合はtrue
 * @returns {z.ZodString} - オプションのバリデーションスキーマ
 */
import * as z from 'zod'
import { useMicroCMSContext } from '@/features/context'

export const CompleteGuaranteeSchema = ({ required = true }: { required?: boolean } = {}) => {
  const { getGuarantees } = useMicroCMSContext()

  return z.string({ invalid_type_error: '端末保証を選択してください' }).refine((val) => {
    // 空文字の場合は必須チェックを行わない
    if (val === '') return !required

    // 端末保証の選択肢を動的に取得
    const guarantees = getGuarantees()

    return guarantees.some((guarantee) => guarantee.id === val)
  }, '端末保証を選択してください')
}
