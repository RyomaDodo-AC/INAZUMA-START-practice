/**
 * ラジオボタン・チェックボックス・セレクトボックスの選択肢のリストからLabelを取得する
 * @param {array} items 選択肢のリスト
 * @param {string} value 選択された値
 * @returns {string} label
 */
import { RadioControlProps, CheckboxControlProps, SelectControlProps } from '@/components/form/field'

export type Items = (RadioControlProps['lists'] | CheckboxControlProps['lists'] | SelectControlProps['options'])[number][]

export const getLabelItems = (items: Items, value: string | undefined) => {
  // valueがundefinedの場合は空文字を返す
  if (!value) return ''

  return (items as SelectControlProps['options']).find((item) => item.value === value)?.label
}
