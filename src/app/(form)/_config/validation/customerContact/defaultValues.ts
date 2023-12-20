/**
 * 連絡先の初期値
 */
export interface customerContactDefaultValuesType {
  tel?: string
  email?: string
  confirmEmail?: string
}

export const customerContactDefaultValues: customerContactDefaultValuesType = {
  // 電話番号
  tel: '',
  // メールアドレス
  email: '',
  // 確認用メールアドレス
  confirmEmail: '',
}
