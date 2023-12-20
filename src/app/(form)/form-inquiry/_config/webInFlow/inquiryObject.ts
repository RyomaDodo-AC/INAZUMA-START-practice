/**
 * お問い合わせフォーム用のオブジェクト
 */
import { inquiryDefaultValuesType } from '../../_config'

/**
 * お問い合わせフォーム用のオブジェクトの型
 * @todo string部分を指定した型に変更する
 */
export interface inquiryObjectType {
  /**
   * ご希望連絡時間帯
   */
  contact_desired_time_period?: string | undefined
  /**
   * お問い合わせの種類
   */
  contact_type?: string | undefined
  /**
   * お問い合わせ内容
   */
  contact_detail?: string | undefined
  /**
   * その他データ類用
   */
  [key: string]: string | undefined
}

/**
 * お問い合わせフォーム用のオブジェクトのデフォルト値を返す関数
 * @returns {inquiryObjectType} お問い合わせフォーム用のオブジェクト
 */
export const getInquiryObject = (formValues: inquiryDefaultValuesType): inquiryObjectType => {
  return {
    contact_desired_time_period: formValues.contactTime || undefined,
    contact_type: formValues.inquiryType || undefined,
    contact_detail: formValues.inquiryContent || undefined,
  }
}
