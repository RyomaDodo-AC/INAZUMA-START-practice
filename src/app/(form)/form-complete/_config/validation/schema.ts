/**
 * 完結フォームのスキーマ
 */
import * as z from 'zod'
import { customerTypeSchema, customerContactSchema, addressSchema, genderItems, nationalityItems } from '@/app/(form)/_config'
import * as Address from '@/components/form/items/Address'
import { shippingItems } from '../items'
import { getValueItems } from '@/features/functions/form/getValueItems'
import {
  CompletePlanSchema,
  CompleteTerminalSchema,
  CompleteTerminalColorSchema,
  CompleteTerminalRecurringSchema,
  CompleteTerminalAccessorySchema,
  CompleteGuaranteeSchema,
  CompleteOptionSchema,
} from '@/app/(form)/form-complete/_components'
import { birthDateSchema } from '@/components/form/items'
import { stripeSchema } from '@/components/plugins/Stripe'

// ご連絡希望時間帯の選択肢からdisabled:trueを除外したvalueを配列で取得
// const contactTimeValues = getValueItems(contactTimeItems)
// 完結内容の選択肢からdisabled:trueを除外したvalueを配列で取得
// const completeContentValues = getValueItems(completeTypeItems)

export const getSchema = (pageType: 'index' | 'input' | 'confirm') => {
  const indexSchema = z
    .object({
      // 顧客タイプ
      customerType: z.string({ required_error: '申込み種別を選択してください', invalid_type_error: '申込み種別を選択してください' }),
      // 料金プラン
      plan: CompletePlanSchema({ required: true }),
      // 端末
      terminal: CompleteTerminalSchema({ required: true }),
      // 端末の色
      terminalColor: CompleteTerminalColorSchema({ required: true }),
      // 端末の代金情報
      terminalRecurring: CompleteTerminalRecurringSchema({ required: true }),
      // 充電器
      accessoryCharger: CompleteTerminalAccessorySchema({ required: false }),
      // クレードル
      accessoryCradle: CompleteTerminalAccessorySchema({ required: false }),
      // 端末保証
      guarantee: CompleteGuaranteeSchema({ required: true }),
      // その他
      others: z.object({
        // SIMカード
        simcard: z.string().nullish(),
        // 事務手数料
        administrativeFee: z.string().nullish(),
      }),
      // オプション
      option: z.array(CompleteOptionSchema({ required: false })),
    })
    .superRefine(({ terminal, accessoryCharger, accessoryCradle }, ctx) => {
      /**
       * 選択した端末によって付属品のバリデーションを変更する
       * @memo 現状、動的に選択端末に付属する付属品の情報を取得できないので手動で設定が必要
       * @todo 選択した端末によって動的にバリデーションを変更する
       */
      if (!accessoryCharger) {
        switch (terminal) {
          case 'terminal-a':
          case 'terminal-c':
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: '充電器を選択してください',
              path: ['accessoryCharger'],
            })
        }
      }
      if (!accessoryCradle) {
        switch (terminal) {
          case 'terminal-c':
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'クレードルを選択してください',
              path: ['accessoryCradle'],
            })
        }
      }
    })

  const inputSchema = z
    .object({
      // 配送先
      shipping: z.string({ required_error: '配送先の住所を選択してください', invalid_type_error: '配送先の住所を選択してください' }).refine(
        (v) => {
          return getValueItems(shippingItems).includes(v)
        },
        { message: '配送先の住所を選択してください' },
      ),
    })
    .and(
      z.discriminatedUnion('customerType', [
        z
          .object({
            customerType: z.literal('個人'),
          })
          .merge(
            z.object({
              // 顧客の性別
              gender: z.string({ required_error: '性別を選択してください', invalid_type_error: '性別を選択してください' }).refine(
                (v) => {
                  return getValueItems(genderItems).includes(v)
                },
                { message: '性別を選択してください' },
              ),
              // 顧客の生年月日
              birthDate: birthDateSchema({ required: true, minAge: 18 }),
              // 顧客の年齢
              age: z.string().nullish(),
              // 顧客の国籍
              nationality: z.string({ required_error: '国籍を選択してください', invalid_type_error: '国籍を選択してください' }).refine(
                (v) => {
                  return getValueItems(nationalityItems).includes(v)
                },
                { message: '国籍を選択してください' },
              ),
            }),
          ),

        z.object({
          customerType: z.literal('法人'),
        }),
      ]),
    )
    .and(
      z.discriminatedUnion('shipping', [
        z.object({
          shipping: z.literal('ご契約者様と同じ住所'),
        }),

        z
          .object({
            shipping: z.literal('ご契約者様と異なる住所'),
          })
          .merge(
            z.object({
              // 配送先の郵便番号
              shippingPostalCode: Address.postalCodeSchema({ required: true }),
              // 配送先の都道府県
              shippingPrefecture: Address.prefectureSchema({ required: true }),
              // 配送先の市区町村
              shippingCity: Address.citySchema({ required: true }),
              // 配送先の町名・番地
              shippingStreetAddress: Address.streetAddressSchema({ required: true }),
              // 配送先の建物名・部屋番号
              shippingBuilding: Address.buildingSchema({ required: false }),
            }),
          ),
      ]),
    )
    .and(customerTypeSchema)
    .and(addressSchema)
    .and(customerContactSchema)
    .and(stripeSchema({ required: true }))

  const confirmSchema = z.object({
    // 同意
    agree: z.string({ invalid_type_error: '同意してください' }).refine((v) => v === 'true', { message: '同意してください' }),
  })

  // ページタイプによってスキーマを返す
  if (pageType === 'index') {
    return indexSchema
  } else if (pageType === 'input') {
    return inputSchema
  } else if (pageType === 'confirm') {
    return indexSchema.and(inputSchema).and(confirmSchema)
  } else {
    return indexSchema.and(inputSchema).and(confirmSchema)
  }
}
