/**
 * フローのパーツ
 * @module Flow
 */
import React from 'react'

/**
 * フローのパーツコンポーネントのプロパティ
 */
export interface FlowProps {
  /**
   * リスト配列
   */
  lists: {
    /**
     * リストのコンテンツ
     */
    content: React.ReactNode
    /**
     * カレントか
     */
    current?: boolean
    /**
     * インデックスDOM
     */
    indexNode?: React.ReactNode
  }[]
  /**
   * 色
   */
  color?: 'black' | 'red' | 'blue' | 'gray'
  /**
   * 縦か横か（trueで縦）
   */
  vertical?: boolean
}

/**
 * フローのパーツコンポーネント
 * @param {FlowProps} props - フローのパーツコンポーネントのプロパティ
 * @returns {React.FC} - フローのパーツコンポーネント
 * @example
 * <Flow color="black" lists={[{ content: 'リスト1', current: true }, { content: 'リスト2' }, { content: 'リスト3' }]} />
 */
export const Flow: React.FC<FlowProps> = ({ lists, color = 'blue', vertical = false }) => {
  // 縦か横か
  let verticalClass = 'flex-row items-start'
  let verticalItemClass = 'flex-col flex-1 items-center justify-center'
  let verticalContentClass = 'font-bold text-sm'
  let verticalNumClass =
    'w-full items-center justify-center group-[&:not(:first-of-type)]:before:content-[""] group-[&:not(:first-of-type)]:before:w-full group-[&:not(:first-of-type)]:before:h-0.5 group-[&:not(:first-of-type)]:before:right-1/2 group-[&:not(:first-of-type)]:before:top-0 group-[&:not(:first-of-type)]:before:bottom-0'
  if (vertical) {
    // 縦
    verticalClass = 'flex-col'
    verticalItemClass = 'flex-row justify-start items-stretch'
    verticalContentClass = 'w-full'
    verticalNumClass =
      'group-[&:not(:last-of-type)]:before:content-[""] group-[&:not(:last-of-type)]:before:h-full group-[&:not(:last-of-type)]:before:w-0.5 group-[&:not(:last-of-type)]:before:top-4 group-[&:not(:last-of-type)]:before:bottom-0 group-[&:not(:last-of-type)]:before:right-0 group-[&:not(:last-of-type)]:before:left-0'
  }

  // リスト
  const list = lists.map((list, index) => {
    // 色
    const baseClass = 'bg-gray-300 text-gray-900'
    let colorClass = ''
    let colorCotentClass = ''
    let colorNumClass = 'group-[&:not(:first-of-type)]:before:bg-gray-300 group-[&:not(:last-of-type)]:before:bg-gray-300'
    switch (color) {
      case 'black':
        colorClass = list.current ? 'bg-black text-white' : baseClass
        colorCotentClass = !vertical && list.current ? 'text-black font-bold' : ''
        colorNumClass = list.current ? 'group-[&:not(:first-of-type)]:before:bg-black group-[&:not(:last-of-type)]:before:bg-black' : colorNumClass
        break
      case 'red':
        colorClass = list.current ? 'bg-red text-white' : baseClass
        colorCotentClass = !vertical && list.current ? 'text-red font-bold' : ''
        colorNumClass = list.current ? 'group-[&:not(:first-of-type)]:before:bg-red group-[&:not(:last-of-type)]:before:bg-red' : colorNumClass
        break
      case 'blue':
        colorClass = list.current ? 'bg-blue text-white' : baseClass
        colorCotentClass = !vertical && list.current ? 'text-blue font-bold' : ''
        colorNumClass = list.current ? 'group-[&:not(:first-of-type)]:before:bg-blue group-[&:not(:last-of-type)]:before:bg-blue' : colorNumClass
        break
      case 'gray':
        colorClass = list.current ? 'bg-gray-900 text-white' : baseClass
        colorCotentClass = !vertical && list.current ? 'text-gray-900 font-bold' : ''
        colorNumClass = list.current ? 'group-[&:not(:first-of-type)]:before:bg-gray-900 group-[&:not(:last-of-type)]:before:bg-gray-900' : colorNumClass
        break
    }

    return (
      <li key={index} className={`${verticalItemClass} group flex gap-x-2 gap-y-1`}>
        <div className={`${verticalNumClass} ${colorNumClass} :before:block relative flex before:absolute before:m-auto`}>
          {list.indexNode ? list.indexNode : <div className={`${colorClass} relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm/none font-bold`}>{index + 1}</div>}
        </div>
        <div className={`${colorCotentClass} ${verticalContentClass}`}>{list.content}</div>
      </li>
    )
  })

  return <ol className={`${verticalClass} flex gap-x-4 gap-y-2`}>{list}</ol>
}
