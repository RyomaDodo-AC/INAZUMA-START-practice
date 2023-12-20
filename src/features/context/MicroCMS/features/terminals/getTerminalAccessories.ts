/**
 * 端末マスタから付属品を取得する
 * @param {microCMSTerminalsType} obj - 端末マスタの値
 * @return {getTerminalAccessoriesReturnType} - 付属品名と付属品コード
 */
import { microCMSTerminalsType } from '../../types'
import type MicroCMS from 'microcms-js-sdk'

/**
 * 返り値の型定義
 */
export type getTerminalAccessoriesReturnType = MicroCMS.MicroCMSContentId['id'][]

export const getTerminalAccessories = (obj: microCMSTerminalsType): getTerminalAccessoriesReturnType => {
  // 返り値の初期化
  const accessories: getTerminalAccessoriesReturnType = []

  // 端末情報がある場合、accessoriesに値を追加
  if (obj.accessories) {
    obj.accessories.forEach((accessory) => {
      // 重複する付属品がない場合、accessoriesに値を追加
      if (!accessories.find((id) => id === accessory.id)) {
        accessories.push(accessory.id)
      }
    })
  }

  // accessoriesを返す
  return accessories
}
