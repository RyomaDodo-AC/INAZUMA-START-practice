/**
 * ラジオボタン・チェックボックス・セレクトボックスの選択肢のリストからvalueを配列で取得
 * @param items 選択肢のリスト
 * @returns valueの配列
 */
import { RadioControlProps, CheckboxControlProps, SelectControlProps } from '@/components/form/field'

export type Items = (RadioControlProps['lists'] | CheckboxControlProps['lists'] | SelectControlProps['options'])[number][]

export const getValueItems = (items: Items) => {
  return items.filter((item) => !item.disabled).map((item) => item.value)
}
