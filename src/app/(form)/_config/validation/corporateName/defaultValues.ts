/**
 * 法人顧客の初期値
 */
export interface corporateNameDefaultValuesType {
  companyName?: string
  companyNameKana?: string
  contactFirstName?: string
  contactLastName?: string
  contactFirstNameKana?: string
  contactLastNameKana?: string
}

export const corporateNameDefaultValues: corporateNameDefaultValuesType = {
  // 会社名
  companyName: '',
  companyNameKana: '',
  // 担当者名
  contactFirstName: '',
  contactLastName: '',
  // 担当者名カナ
  contactFirstNameKana: '',
  contactLastNameKana: '',
}
