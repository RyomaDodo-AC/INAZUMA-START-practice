/**
 * 住所のバリデーションスキーマ
 */
import { postalCodeSchema, prefectureSchema, citySchema, streetAddressSchema, buildingSchema } from '@/components/form/items'
import * as z from 'zod'

export const addressSchema = z.object({
  // 郵便番号
  postalCode: postalCodeSchema({ required: true, hyphen: false }),
  // 都道府県
  prefecture: prefectureSchema({ required: true }),
  // 市区町村
  city: citySchema({ required: true }),
  // 町名・番地
  streetAddress: streetAddressSchema({ required: true }),
  // 建物名
  building: buildingSchema({ required: false }),
})
