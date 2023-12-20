/**
 * 料金プランのバリデーションスキーマ
 * @param {Object} param
 * @param {boolean} [param.required=true] - 必須の場合はtrue
 * @returns {z.ZodString} - 料金プランのバリデーションスキーマ
 */
import * as z from 'zod'
import { useMicroCMSContext } from '@/features/context'

export const CompletePlanSchema = ({ required = true }: { required?: boolean } = {}) => {
  const { getPlans } = useMicroCMSContext()

  return z.string({ invalid_type_error: '料金プランを選択してください' }).refine((val) => {
    // 空文字の場合は必須チェックを行わない
    if (val === '') return !required

    // 料金プランの選択肢を動的に取得
    const plans = getPlans()

    return plans.some((plan) => plan.id === val)
  }, '料金プランを選択してください')
}
