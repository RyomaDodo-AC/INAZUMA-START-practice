/**
 * 完結フォームの初期値
 */
import {
  customerTypeDefaultValues,
  customerTypeDefaultValuesType,
  customerContactDefaultValues,
  customerContactDefaultValuesType,
  customerAddressDefaultValues,
  customerAddressDefaultValuesType,
} from '@/app/(form)/_config'
import { stripeDefaultValuesType, stripeDefaultValues } from '@/components/plugins/Stripe'

export interface completeDefaultValuesType extends customerTypeDefaultValuesType, customerContactDefaultValuesType, stripeDefaultValuesType, customerAddressDefaultValuesType {
  plan?: string
  terminal?: string
  terminalColor?: string
  terminalRecurring?: '一括払い' | '分割払い（36回）' | ''
  accessoryCharger?: string
  accessoryCradle?: string
  guarantee?: string
  option?: string[]
  others?: {
    simcard?: string
    administrativeFee?: string
  }
  gender?: string
  birthDate?: string
  age?: string
  nationality?: string
  shipping?: string
  shippingPostalCode?: string
  shippingPrefecture?: string
  shippingCity?: string
  shippingStreetAddress?: string
  shippingBuilding?: string
  agree?: string
  [key: string]: string | string[] | undefined | { [key: string]: string | string[] | undefined }
}

export const completeDefaultValues: completeDefaultValuesType = {
  // 料金プラン
  plan: '',
  // 端末
  terminal: '',
  // 端末の色
  terminalColor: '',
  // 端末の代金情報
  terminalRecurring: '',
  // 充電器
  accessoryCharger: '',
  // クレードル
  accessoryCradle: '',
  // 端末保証
  guarantee: '',
  // オプション
  option: [],
  // その他
  others: {
    // SIMカード
    simcard: '',
    // 事務手数料
    administrativeFee: 'administrative-fee',
  },
  // 顧客の性別
  gender: '',
  // 顧客の生年月日
  birthDate: '',
  // 顧客の年齢
  age: '',
  // 顧客の国籍
  nationality: '',
  // 配送先
  shipping: 'ご契約者様と同じ住所',
  // 配送先の郵便番号
  shippingPostalCode: '',
  // 配送先の都道府県
  shippingPrefecture: '',
  // 配送先の市区町村
  shippingCity: '',
  // 配送先の町名・番地
  shippingStreetAddress: '',
  // 配送先の建物名
  shippingBuilding: '',
  // 同意
  agree: '',
  // 顧客タイプ別の初期値
  ...customerTypeDefaultValues,
  // 顧客住所別の初期値
  ...customerAddressDefaultValues,
  // 連絡先の初期値
  ...customerContactDefaultValues,
  // Stripeの初期値
  ...stripeDefaultValues,
}
