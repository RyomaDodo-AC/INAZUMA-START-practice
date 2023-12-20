/**
 * 住所の初期値
 */
export interface customerAddressDefaultValuesType {
  postalCode?: string
  prefecture?: string
  city?: string
  streetAddress?: string
  building?: string
}

export const customerAddressDefaultValues: customerAddressDefaultValuesType = {
  // 郵便番号
  postalCode: '',
  // 都道府県
  prefecture: '',
  // 市区町村
  city: '',
  // 町名・番地
  streetAddress: '',
  // 建物名
  building: '',
}
