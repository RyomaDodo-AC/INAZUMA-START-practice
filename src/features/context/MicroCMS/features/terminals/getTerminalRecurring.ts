/**
 * 端末マスタから端末代金情報を取得する
 * @param {microCMSTerminalsType} obj - 端末マスタの値
 * @param {microCMSTerminalsType['terminals'][0]['colorName']} color - 端末カラー
 * @return {getTerminalRecurringReturnType} - 端末代金情報
 */
import { microCMSTerminalsType } from '../../types'
import { getPriceId } from '../getPriceId'

/**
 * 返り値の型定義
 */
export type getTerminalRecurringReturnType = {
  /**
   * 支払回数
   */
  recurring: microCMSTerminalsType['terminals'][0]['recurring']
  /**
   * Stripeの料金ID
   */
  stripePricesId: ReturnType<typeof getPriceId>
}[]

export const getTerminalRecurring = ({ obj, color }: { obj: microCMSTerminalsType; color: microCMSTerminalsType['terminals'][0]['colorName'] }): getTerminalRecurringReturnType => {
  // 返り値の初期化
  let terminalPrices: getTerminalRecurringReturnType = []

  // 端末情報と端末の色がある場合、terminalPricesに値を追加
  if (obj?.terminals && color) {
    obj.terminals.forEach((terminal) => {
      // 端末の色が一致するもののみ処理を行う
      if (terminal.colorName === color) {
        if (terminal.recurring && getPriceId(terminal.stripePrices)) {
          // 重複する支払回数・Stripeの料金IDがない場合、terminalPricesに値を追加
          if (!terminalPrices.find((terminalPrice) => terminalPrice.recurring === terminal.recurring && terminalPrice.stripePricesId === getPriceId(terminal.stripePrices))) {
            terminalPrices.push({
              recurring: terminal.recurring,
              stripePricesId: getPriceId(terminal.stripePrices),
            })
          }
        }
      }
    })
  }

  // terminalPricesを返す
  return terminalPrices
}
