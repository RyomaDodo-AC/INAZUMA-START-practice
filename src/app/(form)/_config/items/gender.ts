/**
 * 性別の選択肢：ラジオボタン
 */
import { RadioControlProps } from '@/components/form/field'

export const genderItems: RadioControlProps['lists'] = [
  { labelContents: '男性', label: '男性', value: '男性' },
  { labelContents: '女性', label: '女性', value: '女性' },
  { labelContents: 'その他', label: 'その他', value: 'その他' },
  { labelContents: '未回答', label: '未回答', value: '未回答' },
]
