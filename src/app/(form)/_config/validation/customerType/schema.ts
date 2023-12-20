/**
 * 顧客タイプによってスキーマを変更する
 * @memo なぜか_configからimportできないので、その下の階層からimportする
 */
import { customerNameSchema } from '@/app/(form)/_config/validation/customerName'
import { corporateNameSchema } from '@/app/(form)/_config/validation/corporateName'
import * as z from 'zod'
import { getValueItems } from '@/features/functions/form/getValueItems'
import { customerTypeItems } from '@/app/(form)/_config/items'

// 顧客タイプの選択肢からvalueを配列で取得
const customerTypeValues = getValueItems(customerTypeItems)

export const customerTypeSchema = z.discriminatedUnion('customerType', [
  z
    .object({
      customerType: z.literal('個人'),
    })
    .merge(customerNameSchema),
  z
    .object({
      customerType: z.literal('法人'),
    })
    .merge(corporateNameSchema),
  z.object({
    customerType: z.literal('').refine((v) => customerTypeValues.includes(v), { message: '申込み種別を選択してください' }),
  }),
])
