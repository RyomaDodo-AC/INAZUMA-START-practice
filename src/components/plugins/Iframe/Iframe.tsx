/**
 * iframeを表示するコンポーネント
 */
'use client'
import React from 'react'

interface iframeProps {
  /**
   * iframeのURL
   */
  url: string
  /**
   * iframeの高さ
   */
  height?: string
  /**
   * iframeの幅
   */
  width?: string
}

/**
 * iframeを表示するコンポーネント
 * @param {iframeProps} props - iframeを表示するコンポーネントのプロパティ
 * @returns {React.FC} - iframeを表示するコンポーネント
 * @example
 * <Iframe url="https://www.google.com/" height="1000px" width="100%" />
 */
export const Iframe: React.FC<iframeProps> = ({ url, height = '1000px', width = '100%' }) => {
  // urlからoriginを取得する
  const urlObj = new URL(url)
  const origin = urlObj.origin

  // postMessageを受信して高さを変更する
  React.useEffect(() => {
    const receiveMessage = (event: MessageEvent) => {
      // originが異なる場合は処理を中断する
      if (event.origin !== origin) return

      const iframe = document.querySelector('iframe')
      if (iframe) {
        iframe.style.height = event.data.contentHeight + 'px'
      }
    }
    if (typeof window === 'undefined') return
    window.addEventListener('message', receiveMessage, false)
    return () => {
      window.removeEventListener('message', receiveMessage, false)
    }
  }, [origin])

  return <iframe src={url} height={height} width={width}></iframe>
}
