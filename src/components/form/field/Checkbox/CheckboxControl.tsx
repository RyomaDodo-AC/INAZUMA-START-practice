/**
 * チェックボックス制御コンポーネント（react-hook-form）
 * @module CheckboxControl
 * @todo カードスタイルのときにTabでフォーカスした場合にアウトラインがでないのを修正
 */
import React, { forwardRef } from 'react'
import { Checkbox, CheckboxProps } from './Checkbox'
import { InputBox, InputBoxProps } from '@/components/form/parts'
import { Card, CardProps } from '@/components/elements'

/**
 * チェックボックスコンポーネントのプロパティ
 * @typedef {Object} CheckboxControlProps
 * @property {React.InputHTMLAttributes<HTMLInputElement>} - チェックボックスタグのHTML属性
 */

export interface CheckboxControlProps extends React.InputHTMLAttributes<HTMLInputElement>, Omit<InputBoxProps, 'children'> {
  /**
   * リスト
   */
  lists: (CheckboxProps & Omit<CardProps, 'children'>)[]
  /**
   * ラベルのタイプ
   */
  labelType?: 'default' | 'card'
  /**
   * 並び方
   */
  direction?: 'row' | 'col'
  /**
   * チェックボックスの位置
   */
  checkboxPosition?: 'center' | 'top' | 'hidden'
  /**
   * チェックボックスの色
   */
  checkboxColor?: 'black' | 'red' | 'blue' | 'gray'
}

/**
 * チェックボックス制御コンポーネント（react-hook-form）
 * @param {CheckboxControlProps} props - チェックボックスコンポーネントのプロパティ
 * @returns {JSX.Element} - チェックボックスコンポーネント
 */
export const CheckboxControl = forwardRef<HTMLInputElement, CheckboxControlProps>((props, ref) => {
  const {
    lists,
    nameId,
    label,
    note,
    required = undefined,
    error,
    labelType = 'default',
    direction = 'row',
    checkboxPosition = 'center',
    checkboxColor = 'blue',
    contentWidth,
    ...checkboxControlProps
  } = props

  const checkboxList = lists.map((list, index) => {
    const { labelContents, checkboxClassName, labelClassName, ...checkboxProps } = list
    // class名
    let checkboxClassNameProps = `${checkboxClassName ? checkboxClassName : ''}`
    let labelClassNameProps = `${labelClassName ? labelClassName : ''} inline-block relative pl-5`

    // チェックボックスの位置
    switch (checkboxPosition) {
      case 'center':
        checkboxClassNameProps = checkboxClassNameProps + ' absolute margin-auto top-1/2 transform -translate-y-1/2'
        break
      case 'top':
        checkboxClassNameProps = checkboxClassNameProps + ' absolute margin-auto'
        // ラベルのタイプによって分岐
        switch (labelType) {
          case 'card':
            checkboxClassNameProps = checkboxClassNameProps + ' top-4'
            break
          case 'default':
            checkboxClassNameProps = checkboxClassNameProps + ' top-1'
            break
        }
        break
      case 'hidden':
        checkboxClassNameProps = 'hidden'
        break
    }

    // エラー時のclass名
    let errorLabelClass = ''
    let errorCheckboxClass = ''

    // ラベルのタイプ
    switch (labelType) {
      case 'card':
        checkboxClassNameProps = checkboxClassNameProps + ' left-2'
        errorLabelClass = error ? ' !bg-red-pale outline outline-red outline-2 -outline-offset-2' : ''
        errorCheckboxClass = error ? ' bg-red-pale text-red border-red' : ''
        break
      case 'default':
        checkboxClassNameProps = checkboxClassNameProps + ' left-0'
        errorLabelClass = error ? ' text-red' : ''
        errorCheckboxClass = error ? ' bg-red-pale text-red border-red' : ''
        break
    }

    // チェックボックスの色
    switch (checkboxColor) {
      case 'black':
        checkboxClassNameProps = checkboxClassNameProps + ' checked:text-black focus:text-black'
        break
      case 'red':
        checkboxClassNameProps = checkboxClassNameProps + ' checked:text-red focus:text-red'
        break
      case 'blue':
        checkboxClassNameProps = checkboxClassNameProps + ' checked:text-blue focus:text-blue'
        break
      case 'gray':
        checkboxClassNameProps = checkboxClassNameProps + ' checked:text-gray-700 focus:text-gray-700'
        break
    }

    // カードコンポーネント
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      if (labelType === 'card') {
        return (
          <Card
            className={`${checkboxPosition !== 'hidden' && 'py-2 pl-7 pr-5 md:py-3'} ${labelClassName} ${errorLabelClass}`}
            cardColor={{ active: checkboxColor }}
            labelType={true}
            ribbon={list?.ribbon}
          >
            {children}
          </Card>
        )
      }
      return <>{children}</>
    }

    return (
      <div key={`${nameId}_${index}`} className={`${direction === 'col' && 'w-full'} ${direction === 'row' && contentWidth === 'full' && 'flex-auto'}`}>
        <Wrapper>
          <Checkbox
            ref={ref}
            labelContents={labelContents}
            checkboxClassName={`${checkboxClassNameProps} ${errorCheckboxClass}`}
            labelClassName={`${labelClassNameProps} ${errorLabelClass}`}
            wrapper={labelType === 'card' ? false : true}
            {...checkboxProps}
            {...checkboxControlProps}
          />
        </Wrapper>
      </div>
    )
  })

  return (
    <InputBox nameId={nameId} label={label} note={note} required={required} error={error} contentWidth={contentWidth}>
      {/* チェックボックス */}
      <div className={`${'flex-' + direction} ${contentWidth === 'full' && 'w-full'} flex flex-wrap gap-3`}>{checkboxList}</div>
    </InputBox>
  )
})

CheckboxControl.displayName = 'CheckboxControl'
