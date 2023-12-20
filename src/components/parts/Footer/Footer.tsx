/**
 * フッター
 * @module Footer
 */
import React from 'react'
import { Copyright, CopyrightProps } from '@/components/parts'

/**
 * フッターのコンポーネントのプロパティ
 */
interface FooterProps {
  /**
   * コピーライトのProps
   */
  copyRightProps?: CopyrightProps
  /**
   * 子要素
   */
  children?: React.ReactNode
}

/**
 * フッターのコンポーネント
 * @param {FooterProps} props -  フッターコンポーネントのプロパティ
 * @returns {React.FC} -  フッターコンポーネント
 */
export const Footer: React.FC<FooterProps> = ({ copyRightProps, children, ...footerProps }) => {
  return (
    <footer id="footer" className="mt-auto" {...footerProps}>
      {children}
      <Copyright {...copyRightProps} />
    </footer>
  )
}
