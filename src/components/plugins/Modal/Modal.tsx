/**
 * モーダルポップアップウィンドウ
 * @see https://preline.co/docs/modal.html
 * @module Modal
 */
'use client'
import React from 'react'
import { useEffect } from 'react'
import { Cross } from '@/components/icon'

/**
 * モーダルポップアップウィンドウコンポーネントのプロパティ
 */
interface ModalProps {
  /**
   * モーダルのテキスト
   */
  text: string
  /**
   * モーダルのタイプ
   */
  type: 'inline'
  /**
   * ID（1つのページ内でユニークであること）
   */
  id: string
  /**
   * モーダルのタイトル
   */
  modalTitle?: string
  /**
   * モーダルの中身
   */
  children: React.ReactNode
}

/**
 * モーダルポップアップウィンドウコンポーネント
 * @param {ModalProps} props - モーダルポップアップウィンドウコンポーネントのプロパティ
 * @returns {React.FC} - モーダルポップアップウィンドウコンポーネント
 * @example
 * <Modal type="button" text="モーダルのテキスト" modalTitle="モーダルのタイトル" id="モーダル1">
 * <p>モーダルの中身</p>
 * </Modal>
 */
/* eslint-disable tailwindcss/no-custom-classname */
export const Modal: React.FC<ModalProps> = ({ text, type = 'inline', id, modalTitle, children }) => {
  // prelineをimport
  useEffect(() => {
    import('preline')
  }, [])

  // モーダルのタイプによって表示を変える
  let modalController = <></>
  switch (type) {
    case 'inline':
      modalController = (
        <button type="button" className="inline text-blue underline hover:no-underline" data-hs-overlay={`#${id}`}>
          {text}
        </button>
      )
      break
  }

  return (
    <>
      {modalController}

      <div id={`${id}`} className="hs-overlay fixed left-0 top-0 z-[60] hidden h-full w-full overflow-y-auto overflow-x-hidden">
        <div className="m-3 mt-0 flex h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] items-center opacity-0 transition-all ease-out hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="flex max-h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-b-gray-500 px-4 py-3">
              <h3 className="font-bold text-gray-900">{modalTitle}</h3>
              <button
                type="button"
                className="hs-dropdown-toggle inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-sm text-gray-700 transition-all hover:text-gray-900"
                data-hs-overlay={`#${id}`}
              >
                <span className="sr-only">Close</span>
                <Cross className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="overflow-y-auto p-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
