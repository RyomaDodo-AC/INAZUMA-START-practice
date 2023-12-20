/**
 * 個人顧客のバリデーションスキーマ
 */
import { nameRegisterSchema, nameKanaSchema } from '@/components/form/items'
import * as z from 'zod'

export const customerNameSchema = z.object({
  // 名前
  customerFirstName: nameRegisterSchema({ required: true }).firstName,
  customerLastName: nameRegisterSchema({ required: true }).lastName,
  // 名前カナ
  customerFirstNameKana: nameKanaSchema({ required: true, kanaType: 'katakana' }).firstName,
  customerLastNameKana: nameKanaSchema({ required: true, kanaType: 'katakana' }).lastName,
})
