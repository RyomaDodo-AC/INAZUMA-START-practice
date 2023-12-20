/**
 * 顧客データのオブジェクト
 */
import * as validation from '@/app/(form)/_config'

/**
 * 顧客データのオブジェクトの型
 */
export type customerObjectType = {
  /* customerType */
  // 顧客タイプ
  customer_type: string | undefined

  /* customerName */
  // 契約者名(姓) ※法人の場合、会社名をすべて入れる
  last_name: string | undefined
  // 契約者名(名)
  first_name: string | undefined
  // 契約者名(姓カナ) ※法人の場合、会社名カナをすべて入れる
  last_name_kana: string | undefined
  // 契約者名(名カナ)
  first_name_kana: string | undefined

  /* coroporateName */
  // 会社名（漢字）
  company_name: string | undefined
  // 会社名（フリガナ）
  company_kana: string | undefined
  // 担当者名（姓）
  manager_last_name: string | undefined
  // 担当者名（名）
  manager_first_name: string | undefined
  // 担当者名（姓カナ）
  manager_last_name_kana: string | undefined
  // 担当者名（名カナ）
  manager_first_name_kana: string | undefined

  /* customerContact */
  // 電話番号
  phone_number: string | undefined
  // メールアドレス
  mail_address: string | undefined

  /* customerAddress */
  // 郵便番号
  postal_code: string | undefined
  // 都道府県
  PREFECTURE: string | undefined
  // 市区町村
  city: string | undefined
  // 町名・番地
  town_name_block: string | undefined
  // 建物名
  building_name: string | undefined

  /* 任意追加 */
  // 生年月日
  BIRTHDAY: string | undefined
  // 年齢
  age: string | undefined
  // 性別
  SEX: string | undefined
  // 国籍
  nationality: string | undefined

  /* 任意追加 */
  // 配送先_郵便番号
  delivery_postal_code: string | undefined
  // 配送先_都道府県
  delivery_prefectures: string | undefined
  // 配送先_市区町村
  delivery_city: string | undefined
  // 配送先_町名・番地
  delivery_town_name_block: string | undefined
  // 配送先_建物名
  delivery_buildings_name: string | undefined
}

/**
 * formValuesの型
 */
export interface formValuesType
  extends validation.corporateNameDefaultValuesType,
    validation.customerAddressDefaultValuesType,
    validation.customerContactDefaultValuesType,
    validation.customerNameDefaultValuesType,
    validation.customerTypeDefaultValuesType {
  // 生年月日
  birthDate?: string | undefined
  // 年齢
  age?: string | undefined
  // 性別
  gender?: string | undefined
  // 国籍
  nationality?: string | undefined
  // 配送先
  shipping?: string | undefined
  // 配送先_郵便番号
  shippingPostalCode?: string | undefined
  // 配送先_都道府県
  shippingPrefecture?: string | undefined
  // 配送先_市区町村
  shippingCity?: string | undefined
  // 配送先_町名・番地
  shippingStreetAddress?: string | undefined
  // 配送先_建物名
  shippingBuilding?: string | undefined
}

/**
 * 顧客データのオブジェクトのデフォルト値を返す関数
 * @param formValues SubmitHandlerから受け取ったフォームの値
 * @returns {customerObjectType} 顧客データのオブジェクト
 */
export const getCustomerObject = (formValues: formValuesType): customerObjectType => {
  return {
    customer_type: formValues.customerType || undefined,

    // 法人の場合、会社名をすべて入れる
    last_name: formValues.customerLastName || formValues.companyName || undefined,
    first_name: formValues.customerFirstName || undefined,
    // 法人の場合、会社名カナをすべて入れる
    last_name_kana: formValues.customerLastNameKana || formValues.companyNameKana || undefined,
    first_name_kana: formValues.customerFirstNameKana || undefined,

    company_name: formValues.companyName || undefined,
    company_kana: formValues.companyNameKana || undefined,
    manager_last_name: formValues.contactLastName || undefined,
    manager_first_name: formValues.contactFirstName || undefined,
    manager_last_name_kana: formValues.contactLastNameKana || undefined,
    manager_first_name_kana: formValues.contactFirstNameKana || undefined,

    phone_number: formValues.tel || undefined,
    mail_address: formValues.email || undefined,

    postal_code: formValues.postalCode || undefined,
    PREFECTURE: formValues.prefecture || undefined,
    city: formValues.city || undefined,
    town_name_block: formValues.streetAddress || undefined,
    building_name: formValues.building || undefined,

    BIRTHDAY: formValues.birthDate || undefined,
    age: formValues.age || undefined,
    SEX: formValues.gender || undefined,
    nationality: formValues.nationality || undefined,

    // 同じ住所に送る場合は、契約者の住所を入れる
    delivery_postal_code: formValues.shipping === 'ご契約者様と同じ住所' ? formValues.postalCode || undefined : formValues.shippingPostalCode || undefined,
    delivery_prefectures: formValues.shipping === 'ご契約者様と同じ住所' ? formValues.prefecture || undefined : formValues.shippingPrefecture || undefined,
    delivery_city: formValues.shipping === 'ご契約者様と同じ住所' ? formValues.city || undefined : formValues.shippingCity || undefined,
    delivery_town_name_block: formValues.shipping === 'ご契約者様と同じ住所' ? formValues.streetAddress || undefined : formValues.shippingStreetAddress || undefined,
    delivery_buildings_name: formValues.shipping === 'ご契約者様と同じ住所' ? formValues.building || undefined : formValues.shippingBuilding || undefined,
  }
}
