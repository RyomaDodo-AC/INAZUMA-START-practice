/**
 * お問い合わせフォームのスキーマ
 */
import * as z from 'zod'
import { customerTypeSchema, customerContactSchema, contactTimeItems } from '@/app/(form)/_config'
import { inquiryTypeItems } from '../items'
import { getValueItems } from '@/features/functions/form/getValueItems'

// ご連絡希望時間帯の選択肢からdisabled:trueを除外したvalueを配列で取得
const contactTimeValues = getValueItems(contactTimeItems)
// お問い合わせ内容の選択肢からdisabled:trueを除外したvalueを配列で取得
const inquiryContentValues = getValueItems(inquiryTypeItems)

export const getSchema = (pageType: 'index' | 'confirm') => {
  const inputSchema = z
    .object({
      customerType: z.string({ required_error: '申込み種別を選択してください', invalid_type_error: '申込み種別を選択してください' }),
      // ご連絡希望時間帯
      contactTime: z.string({ invalid_type_error: 'ご連絡希望時間帯を選択してください' }).refine((v) => contactTimeValues.includes(v), { message: 'ご連絡希望時間帯を選択してください' }),
      // お問い合わせの種類
      inquiryType: z.string({ invalid_type_error: 'お問い合わせの種類を選択してください' }).refine((v) => inquiryContentValues.includes(v), { message: 'お問い合わせの種類を選択してください' }),
      // お問い合わせ内容
      inquiryContent: z.string().min(1, { message: 'お問い合わせ内容を入力してください' }),
    })
    .and(customerTypeSchema)
    .and(customerContactSchema)

  const confirmSchema = z.object({
    // 同意
    agree: z.string({ invalid_type_error: '同意してください' }).refine((v) => v === 'true', { message: '同意してください' }),
  })

  // ページタイプによってスキーマを返す
  if (pageType === 'index') {
    return inputSchema
  } else if (pageType === 'confirm') {
    return inputSchema.and(confirmSchema)
  } else {
    return inputSchema.and(confirmSchema)
  }
}
