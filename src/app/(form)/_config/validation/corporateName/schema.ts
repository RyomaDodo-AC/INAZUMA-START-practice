/**
 * 法人顧客のバリデーションスキーマ
 */
import { nameRegisterSchema, nameKanaSchema } from '@/components/form/items'
import * as z from 'zod'

export const corporateNameSchema = z.object({
  // 会社名
  companyName: nameRegisterSchema({ required: true }).fullName,
  // 会社名カナ
  companyNameKana: nameKanaSchema({ required: true, kanaType: 'katakana' }).fullName,
  // 担当者名
  contactFirstName: nameRegisterSchema({ required: true }).firstName,
  contactLastName: nameRegisterSchema({ required: true }).lastName,
  // 担当者名カナ
  contactFirstNameKana: nameKanaSchema({ required: true, kanaType: 'katakana' }).firstName,
  contactLastNameKana: nameKanaSchema({ required: true, kanaType: 'katakana' }).lastName,
})
