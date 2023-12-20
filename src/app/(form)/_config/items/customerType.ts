/**
 * 顧客タイプの選択肢：ラジオボタン
 */
import { RadioControlProps } from '@/components/form/field'

export const customerTypeItems: RadioControlProps['lists'] = [
  { labelContents: '個人', label: '個人', value: '個人' },
  { labelContents: '法人', label: '法人', value: '法人' },
]
