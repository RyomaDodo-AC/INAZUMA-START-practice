/**
 * 無効な日付かどうかを判定する
 * @see https://chaika.hatenablog.com/entry/2021/12/12/121200
 * @returns {boolean} 無効な日付の場合はfalse
 */
import { format as DateFormat } from 'date-fns'

export const isValidDate = (dateStr: string, format: string = 'yyyy-MM-dd'): boolean => {
  const d = new Date(dateStr)
  try {
    const formatDate = DateFormat(d, format)
    return dateStr === formatDate
  } catch (error) {
    return false
  }
}
