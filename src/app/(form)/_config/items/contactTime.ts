/**
 * ご希望連絡時間帯の選択肢：セレクトボックス
 */
import { SelectControlProps } from '@/components/form/field'

export const contactTimeItems: SelectControlProps['options'] = [
  { value: '', label: '選択してください', disabled: true },
  { value: 'いつでも', label: 'いつでも' },
  { value: '10時～12時', label: '10時～12時' },
  { value: '12時～14時', label: '12時～14時' },
  { value: '14時～16時', label: '14時～16時' },
  { value: '16時～18時', label: '16時～18時' },
]
