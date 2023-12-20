/**
 * 数値にカンマを付ける
 * @param {number} num 数値
 * @returns {string} カンマ付きの文字列
 */
export const addComma = (num: number): string => {
  return num.toLocaleString(undefined, { maximumFractionDigits: 20 })
}
