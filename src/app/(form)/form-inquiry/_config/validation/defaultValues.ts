/**
 * お問い合わせフォームの初期値
 */
import { customerTypeDefaultValues, customerTypeDefaultValuesType, customerContactDefaultValues, customerContactDefaultValuesType } from '@/app/(form)/_config'

export interface inquiryDefaultValuesType extends customerTypeDefaultValuesType, customerContactDefaultValuesType {
  contactTime?: string
  inquiryType?: string
  inquiryContent?: string
  agree?: string
  [key: string]: string | undefined
}

export const inquiryDefaultValues: inquiryDefaultValuesType = {
  // ご連絡希望時間帯
  contactTime: '',
  // お問い合わせの種類
  inquiryType: '',
  // お問い合わせ内容
  inquiryContent: '',
  // 同意
  agree: '',
  // 顧客タイプ別の初期値
  ...customerTypeDefaultValues,
  // 連絡先の初期値
  ...customerContactDefaultValues,
}
