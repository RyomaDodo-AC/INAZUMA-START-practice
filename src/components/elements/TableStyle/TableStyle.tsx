/**
 * テーブル用スタイル
 */
import * as React from 'react'

/**
 * テーブル用スタイル表示コンポーネント
 * 共通CSS（globals.css）に定義を記載
 * 共通スタイルのためコンポーネントは無し
 */
export const TableStyle: React.FC = () => {
  return (
    <table className="table-style">
      <thead className="table-style-row">
        <tr>
          <th className="table-style-th table-style-cell">見出し 1</th> <th className="table-style-th table-style-cell">見出し 2</th> <th className="table-style-th table-style-cell">見出し 3</th>
        </tr>
      </thead>
      <tbody className="table-style-row">
        <tr>
          <th className="table-style-th table-style-cell">見出し 1</th> <td className="table-style-cell">内容 1</td> <td className="table-style-cell">内容 1</td>
        </tr>
        <tr>
          <th className="table-style-th table-style-cell">見出し 2</th> <td className="table-style-cell">内容 2</td> <td className="table-style-cell">内容 2</td>
        </tr>
        <tr>
          <th className="table-style-th table-style-cell">見出し 3</th> <td className="table-style-cell">内容 3</td> <td className="table-style-cell">内容 3</td>
        </tr>
      </tbody>
    </table>
  )
}
