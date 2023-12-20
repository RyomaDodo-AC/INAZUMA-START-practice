/**
 * フォームのコンテンツのプロパティの型
 */
import { FieldValues } from 'react-hook-form'

export interface ContentsProps<T extends FieldValues> {
  /**
   * ページタイプ
   * @param input 入力ページ
   * @param confirm 確認ページ
   */
  pageType: 'input' | 'confirm'
}
