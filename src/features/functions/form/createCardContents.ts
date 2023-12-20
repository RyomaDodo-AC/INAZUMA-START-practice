/**
 * カード型の入力フォームに表示するコンテンツのオブジェクトを作成する
 */
import { CheckboxControlProps, CheckboxProps, RadioControlProps, RadioProps } from '@/components/form/field'
import { CardProps } from '@/components/elements'
import { microCMSOptionsType, microCMSGuaranteesType, microCMSPlansType, microCMSTerminalsType } from '@/features/context/MicroCMS/types'
import deepmerge from 'deepmerge'

/**
 * 引数の型定義
 */
export type createCardContentsArgs = {
  /**
   * 選択肢のタイプ
   */
  type: 'radio' | 'checkbox'
  /**
   * 選択肢の位置
   */
  inputPosition?: 'top' | 'center'
  /**
   * 選択肢の余白
   */
  inputFloat?: boolean
  /**
   * 選択肢のオブジェクト
   */
  option: Omit<CheckboxProps, 'checkboxClassName' | 'labelClassName'> | Omit<RadioProps, 'radioClassName' | 'labelClassName'>
  /**
   * リボンのオブジェクト
   */
  ribbon?: microCMSGuaranteesType['ribbon'] | microCMSOptionsType['ribbon'] | microCMSPlansType['ribbon'] | microCMSTerminalsType['ribbon']
}

export const createCardContents = ({ type, inputPosition = 'center', inputFloat = false, option, ribbon }: createCardContentsArgs) => {
  // カードのスタイル
  const inputClassName = inputPosition === 'top' ? '!left-8 !top-8' : '!left-6'
  const labelClassName = '!py-6 h-full flex flex-col justify-center' + (!inputFloat ? ' !pl-14' : ' !px-6')
  // typeに応じてoptionにオブジェクトをマージ
  const optionObj =
    type === 'radio'
      ? {
          ...option,
          radioClassName: inputClassName,
          labelClassName: labelClassName,
        }
      : {
          ...option,
          checkboxClassName: inputClassName,
          labelClassName: labelClassName,
        }

  // リボンのオブジェクトを作成
  let ribbonObj = {}
  if (ribbon?.label) {
    const label: Omit<CardProps, 'children'> = {
      ribbon: {
        label: {
          text: ribbon?.label,
          color: 'blue',
        },
      },
    }
    ribbonObj = deepmerge(ribbonObj, label)
  }
  if (ribbon?.recommend) {
    const recommend: Omit<CardProps, 'children'> = {
      ribbon: {
        recommend: {
          show: true,
          color: 'blue',
        },
      },
    }
    ribbonObj = deepmerge(ribbonObj, recommend)
  }

  // リボンのオブジェクトをマージ
  return deepmerge(optionObj, ribbonObj)
}
