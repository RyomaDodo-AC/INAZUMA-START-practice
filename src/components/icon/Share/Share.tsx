/**
 * 共有アイコン
 * @moduke Share
 */
import React from 'react'

interface ShareProps {
  /**
   * 色はTailwindの`text-**`で付与する
   */
  className?: string
}

/**
 * 共有アイコンコンポーネント
 * @param {ShareProps} props - 共有アイコンコンポーネントのプロパティ
 * @returns {React.FC} - 共有アイコンコンポーネント
 */
export const Share: React.FC<ShareProps> = ({ className = 'text-black' }) => {
  return (
    <svg className={`${className}`} xmlns="http://www.w3.org/2000/svg" width="18" height="18">
      <g fill="currentColor">
        <path d="M15.188 11.25a.542.542 0 0 1 .563.563v4.5a1.681 1.681 0 0 1-1.687 1.688H1.688a1.681 1.681 0 0 1-1.687-1.687V3.937A1.681 1.681 0 0 1 1.689 2.25h5.625a.542.542 0 0 1 .563.563v1.124a.542.542 0 0 1-.562.563H2.25v11.25H13.5v-3.938a.542.542 0 0 1 .563-.562ZM17.157 0a.84.84 0 0 1 .844.844v4.5a.771.771 0 0 1-.527.773.782.782 0 0 1-.914-.176l-1.266-1.266-8.543 8.578a.849.849 0 0 1-1.2 0l-.809-.809a.848.848 0 0 1 0-1.2l8.583-8.537-1.265-1.266a.783.783 0 0 1-.176-.914.771.771 0 0 1 .773-.527Z"></path>
      </g>
    </svg>
  )
}
