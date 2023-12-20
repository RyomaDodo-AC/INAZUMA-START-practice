/**
 * 配送先の住所：ラジオボタン
 */
import { RadioControlProps } from '@/components/form/field'

export const shippingItems: RadioControlProps['lists'] = [
  { labelContents: 'ご契約者様と同じ住所', label: 'ご契約者様と同じ住所', value: 'ご契約者様と同じ住所' },
  { labelContents: 'ご契約者様と異なる住所', label: 'ご契約者様と異なる住所', value: 'ご契約者様と異なる住所' },
]
