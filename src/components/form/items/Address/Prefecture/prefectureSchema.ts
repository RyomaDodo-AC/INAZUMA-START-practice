/**
 * 都道府県のバリデーションスキーマ
 * @param {Object} param
 * @param {boolean} [param.required=true] - 必須の場合はtrue
 * @returns {z.ZodString} - 都道府県のバリデーションスキーマ
 */
import * as z from 'zod'
import { getPrefectureOptions } from './PrefectureInput'

export const prefectureSchema = ({ required = true }: { required?: boolean } = {}) => {
  return z.string().refine((val) => {
    // 空文字の場合は必須チェックを行わない
    if (val === '') return !required

    return getPrefectureOptions().some((option) => option.value === val)
  }, '都道府県を選択してください')
}
