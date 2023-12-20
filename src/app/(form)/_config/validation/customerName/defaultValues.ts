/**
 * 個人顧客の初期値
 */
export interface customerNameDefaultValuesType {
  customerFirstName?: string
  customerLastName?: string
  customerFirstNameKana?: string
  customerLastNameKana?: string
}

export const customerNameDefaultValues: customerNameDefaultValuesType = {
  // 名前
  customerFirstName: '',
  customerLastName: '',
  // 名前カナ
  customerFirstNameKana: '',
  customerLastNameKana: '',
}
