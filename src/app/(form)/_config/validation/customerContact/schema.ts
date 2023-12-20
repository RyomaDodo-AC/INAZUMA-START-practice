/**
 * 連絡先のバリデーションスキーマ
 */
import { telSchema, emailSchema } from '@/components/form/items'
import * as z from 'zod'

export const customerContactSchema = z
  .object({
    // 電話番号
    tel: telSchema({ required: true }),
    // メールアドレス
    email: emailSchema({ required: true }),
    // 確認用メールアドレス
    confirmEmail: emailSchema({ required: true }),
  })
  .superRefine(({ email, confirmEmail }, ctx) => {
    // 確認用メールアドレスと一致するかチェック
    if (email !== confirmEmail) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'メールアドレスが一致しません',
        path: ['confirmEmail'],
      })
    }
  })
