/**
 * 顧客タイプの初期値
 * @memo なぜか_configからimportできないので、その下の階層からimportする
 */
import { customerNameDefaultValues, customerNameDefaultValuesType } from '@/app/(form)/_config/validation/customerName'
import { corporateNameDefaultValues, corporateNameDefaultValuesType } from '@/app/(form)/_config/validation/corporateName'

export interface customerTypeDefaultValuesType extends customerNameDefaultValuesType, corporateNameDefaultValuesType {
  customerType?: string
}

export const customerTypeDefaultValues: customerTypeDefaultValuesType = {
  // 顧客タイプ
  customerType: '',
  // 個人顧客の初期値
  ...customerNameDefaultValues,
  // 法人顧客の初期値
  ...corporateNameDefaultValues,
}
