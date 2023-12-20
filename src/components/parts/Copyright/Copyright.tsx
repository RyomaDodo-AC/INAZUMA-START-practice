/**
 * Copyright
 * @module Copyright
 */
import React from 'react'
import { DOMAIN_PROD } from '@/config'

/**
 * Copyrightのコンポーネントのプロパティ
 */
export interface CopyrightProps {
  /**
   * 色
   */
  color?: 'black' | 'red' | 'blue' | 'gray' | 'white'
}

/**
 * Copyrightのコンポーネント
 * @param {CopyrightProps} props -  Copyrightコンポーネントのプロパティ
 * @returns {React.FC} -  Copyrightコンポーネント
 */
export const Copyright: React.FC<CopyrightProps> = ({ color = 'black' }) => {
  // 色
  let colorClass = ''
  switch (color) {
    case 'black':
      colorClass = 'text-white bg-black'
      break
    case 'red':
      colorClass = 'text-white bg-red'
      break
    case 'blue':
      colorClass = 'text-white bg-blue'
      break
    case 'gray':
      colorClass = 'text-black bg-gray-500'
      break
    case 'white':
      colorClass = 'text-black bg-white border-t'
  }

  return <p className={`${colorClass} py-2 text-center text-xs`}>Copyright ©︎ {DOMAIN_PROD} All Rights Reserved.</p>
}
