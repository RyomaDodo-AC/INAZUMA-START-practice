/**
 * プランマスタから端末情報を取得する
 * @param {microCMSPlansType} obj - プランマスタの値
 * @return {getPlanTerminalsReturnType[]} - 端末名と端末ID
 */
import { microCMSPlansType } from '../../types'

/**
 * 返り値の型定義
 */
export type getPlanTerminalsReturnType = microCMSPlansType['terminals'][0]['id'][]

export const getPlanTerminals = (obj: microCMSPlansType): getPlanTerminalsReturnType => {
  // 返り値の初期化
  let terminals: getPlanTerminalsReturnType = []

  // 端末情報がある場合、terminalsに値を追加
  if (obj.terminals) {
    obj.terminals.forEach((terminal) => {
      if (terminal.id) {
        terminals.push(terminal.id)
      }
    })
  }

  // terminalsを返す
  return terminals
}
