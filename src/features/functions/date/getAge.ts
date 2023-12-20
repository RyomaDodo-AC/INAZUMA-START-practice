/**
 * 生年月日から年齢を計算する
 * @param {string} birthdate  生年月日（YYYY-MM-DD）
 * @returns {string} 年齢
 */
import { isValidDate } from './isValidDate'
export const getAge = (birthdate: string) => {
  // birthdateが無効な日付の場合は空文字を返す
  if (!isValidDate(birthdate)) return ''

  // 生年月日をDate型に変換
  const birthdateDate = new Date(birthdate)

  // 現在の日付を取得
  const nowDate = new Date()

  // 年齢を計算
  const age = nowDate.getFullYear() - birthdateDate.getFullYear()

  // 誕生日がまだ来ていなければageを1減らす
  const m = nowDate.getMonth() - birthdateDate.getMonth()
  if (m < 0 || (m === 0 && nowDate.getDate() < birthdateDate.getDate())) {
    return (age - 1).toString()
  }

  return age.toString()
}
