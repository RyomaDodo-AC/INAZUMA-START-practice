/**
 * 国籍の選択肢：ラジオボタン
 */
import { RadioControlProps } from '@/components/form/field'

export const nationalityItems: RadioControlProps['lists'] = [
  { labelContents: '日本国籍', label: '日本国籍', value: '日本国籍' },
  { labelContents: '日本国籍以外', label: '日本国籍以外', value: '日本国籍以外' },
]
