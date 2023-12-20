/**
 * 端末マスタから色情報を取得する
 * @param {microCMSTerminalsType} obj - 端末マスタの値
 * @return {getTerminalColorsReturnType} - 表示色名と表示カラーコード
 */
import { microCMSTerminalsType } from '../../types'

/**
 * 返り値の型定義
 */
export type getTerminalColorsReturnType = {
  /**
   * 表示色名
   */
  colorName: microCMSTerminalsType['terminals'][0]['colorName']
  /**
   * 表示カラーコード
   */
  colorCode: microCMSTerminalsType['terminals'][0]['colorCode']
}[]

export const getTerminalColors = (obj: microCMSTerminalsType): getTerminalColorsReturnType => {
  // 返り値の初期化
  let colors: getTerminalColorsReturnType = []

  // 端末情報がある場合、colorsに値を追加
  if (obj.terminals) {
    obj.terminals.forEach((terminal) => {
      if (terminal.colorName && terminal.colorCode) {
        // 重複する色名・色コードがない場合、colorsに値を追加
        if (!colors.find((color) => color.colorName === terminal.colorName && color.colorCode === terminal.colorCode)) {
          colors.push({
            colorName: terminal.colorName,
            colorCode: terminal.colorCode,
          })
        }
      }
    })
  }

  // colorsを返す
  return colors
}
