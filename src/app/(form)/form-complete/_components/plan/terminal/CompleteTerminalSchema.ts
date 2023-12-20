/**
 * 端末のバリデーションスキーマ
 * @param {Object} param
 * @param {boolean} [param.required=true] - 必須の場合はtrue
 * @returns {z.ZodString} - オプションのバリデーションスキーマ
 */
import * as z from 'zod'
import { useMicroCMSContext } from '@/features/context'

export const CompleteTerminalSchema = ({ required = false }: { required?: boolean } = {}) => {
  const { getTerminals } = useMicroCMSContext()

  return z.string({ invalid_type_error: '端末を選択してください' }).refine((val) => {
    // 空文字の場合は必須チェックを行わない
    if (val === '') return !required

    // 端末の選択肢を動的に取得
    const terminals = getTerminals()

    return terminals.some((terminal) => terminal.id === val)
  }, '端末を選択してください')
}
