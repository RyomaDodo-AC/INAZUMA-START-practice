/**
 * お問い合わせの種類の選択肢：セレクトボックス
 */
import { SelectControlProps } from '@/components/form/field'

export const inquiryTypeItems: SelectControlProps['options'] = [
  { value: '', label: '選択してください', disabled: true },
  { value: '契約希望', label: '契約希望' },
  { value: '料金について', label: '料金について' },
  { value: 'キャンペーンについて', label: 'キャンペーンについて' },
  { value: '配送について', label: '配送について' },
  { value: '端末について', label: '端末について' },
  { value: 'その他', label: 'その他' },
]
