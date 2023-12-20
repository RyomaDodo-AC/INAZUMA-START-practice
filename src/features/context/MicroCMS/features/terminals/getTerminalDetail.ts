/**
 * 端末マスタから端末情報を取得する
 * @param {microCMSTerminalsType} obj - 端末マスタの値
 * @return {getTerminalDetailReturnType | undefined} - 端末情報
 */
import { microCMSTerminalsType } from '../../types'

/**
 * 返り値の型定義
 */
export type getTerminalDetailReturnType = microCMSTerminalsType['terminals'][0] | undefined

export const getTerminalDetail = ({
  obj,
  color,
  recurring,
}: {
  obj: microCMSTerminalsType
  color: microCMSTerminalsType['terminals'][0]['colorName']
  recurring: microCMSTerminalsType['terminals'][0]['recurring'][0] | ''
}): getTerminalDetailReturnType => {
  // 返り値の初期化
  let terminal: getTerminalDetailReturnType = undefined

  // recurringが空の場合、終了
  if (!recurring) return terminal

  // 端末情報がある場合、terminalに値を追加
  if (obj.terminals.length > 0) {
    obj.terminals.forEach((t) => {
      if (t.colorName === color && t.recurring.includes(recurring)) {
        terminal = t
      }
    })
  }

  // terminalを返す
  return terminal
}
