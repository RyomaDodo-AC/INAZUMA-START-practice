/**
 * 電話番号のバリデーションスキーマ
 * @param {Object} param
 * @param {boolean} [param.hyphen=false] - ハイフンありの場合はtrue
 * @param {boolean} [param.required=true] - 必須の場合はtrue
 * @returns {z.ZodString} - 電話番号のバリデーションスキーマ
 */
import * as z from 'zod'
import { PhoneNumberUtil } from 'google-libphonenumber'

export const telSchema = ({ hyphen = false, required = true }: { hyphen?: boolean; required?: boolean } = {}) => {
  return z.string().refine(
    (val) => {
      // 空文字の場合は必須チェックを行わない
      if (val === '') return !required

      // 電話番号のバリデーション
      const util = PhoneNumberUtil.getInstance()

      try {
        if (hyphen) {
          // ハイフンありの場合
          const normalizedPhoneNumber = hyphen ? val.replace(/-/g, '') : val
          const phoneNumber = util.parseAndKeepRawInput(normalizedPhoneNumber, 'JP')
          return val.match(/^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/) && util.isValidNumber(phoneNumber)
        } else {
          // ハイフンなしの場合
          const phoneNumber = util.parseAndKeepRawInput(val, 'JP')
          // 半角数字のみ
          return val.match(/^[0-9]+$/) && util.isValidNumber(phoneNumber)
        }
      } catch (error) {
        return false
      }
    },
    {
      message: '電話番号を正しく入力してください。',
    },
  )
}
