/**
 * 名前（正式表記・ふりがなセット）入力コンポーネント
 * @module NameInput
 */
'use client'
import React, { useEffect, useRef } from 'react'
import * as name from '@/components/form/items/Name'
import { NameRegisterInput, NameKanaInput } from '@/components/form/items'
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form'
import type AutoKana from 'vanilla-autokana'

// オートかなを動的にインポート
// const AutoKana = dynamic(() => import('@/features/form/AutoKana').then((mod) => mod.AutoKana), { ssr: false })

/**
 * 名前（正式表記・ふりがなセット）入力コンポーネントのプロパティ
 * @typedef {Object} NameInputProps
 * @property {name.NameRegisterInputProps} - 名前（正式表記）入力コンポーネントのプロパティ
 * @property {name.NameKanaInputProps} - 名前（ふりがな）入力コンポーネントのプロパティ
 */
export interface NameInputProps {
  /**
   * 名前（正式表記）入力コンポーネントのプロパティ
   */
  nameRegisterProps: name.NameRegisterInputProps
  /**
   * 名前（ふりがな）入力コンポーネントのプロパティ
   */
  nameKanaProps: name.NameKanaInputProps
  /**
   * 姓名分離
   */
  separate?: boolean
  /**
   * オートかな入力
   */
  autoKana?: boolean
  /**
   * setValue（react-form-hooks）：オートかなの場合、オートかなの設定を保存するために使用
   */
  setValue: UseFormSetValue<any>
  /**
   * trigger（react-form-hooks）：日付のセレクトボックスが変更された際にバリデーションを実行する目的で使用
   */
  trigger: UseFormTrigger<any>
}

/**
 * 名前（正式表記・ふりがなセット）入力コンポーネント
 * @memo 正式表記とふりがな入力コンポーネントの隙間は親コンポーネントから調整する
 * @param {NameInputProps} props - 名前（正式表記・ふりがなセット）入力コンポーネントのプロパティ
 * @returns {React.FC} - 名前（正式表記・ふりがなセット）入力コンポーネント
 */
export const NameInput: React.FC<NameInputProps> = ({ nameRegisterProps, nameKanaProps, separate = true, autoKana = true, setValue, trigger }) => {
  /* オートかなの設定 */
  const kanaNameKanaRefs = {
    fullName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    firstName: useRef<HTMLInputElement>(null),
  }

  // ターゲットのIDを取得
  const inputId = {
    lastName: nameRegisterProps.nameProps?.lastNameProps?.nameId,
    firstName: nameRegisterProps.nameProps?.firstNameProps?.nameId,
    fullName: nameRegisterProps.nameProps?.fullNameProps?.nameId,
  }
  const targetId = {
    lastName: nameKanaProps.nameProps?.lastNameProps?.nameId,
    firstName: nameKanaProps.nameProps?.firstNameProps?.nameId,
    fullName: nameKanaProps.nameProps?.fullNameProps?.nameId,
  }

  // オートかなの設定を保存
  const autokanaFullNameRef = useRef<AutoKana.AutoKana>()
  const autokanaLastNameRef = useRef<AutoKana.AutoKana>()
  const autokanaFirstNameRef = useRef<AutoKana.AutoKana>()
  useEffect(() => {
    const AutoKana = require('vanilla-autokana')

    // オートかなが無効の場合は処理を終了
    if (!autoKana) return

    // 姓名分離によってターゲットを変更
    if (!separate && inputId.fullName && targetId.fullName) {
      const autokanaFullName = AutoKana.bind('#' + inputId.fullName, '#' + targetId.fullName, { katakana: nameKanaProps.kanaType === 'katakana' })
      autokanaFullNameRef.current = autokanaFullName
    } else if (separate && inputId.lastName && inputId.firstName && targetId.lastName && targetId.firstName) {
      const autokanaLastName = AutoKana.bind('#' + inputId.lastName, '#' + targetId.lastName, { katakana: nameKanaProps.kanaType === 'katakana' })
      autokanaLastNameRef.current = autokanaLastName

      const autokanaFirstName = AutoKana.bind('#' + inputId.firstName, '#' + targetId.firstName, { katakana: nameKanaProps.kanaType === 'katakana' })
      autokanaFirstNameRef.current = autokanaFirstName
    }
  }, [autoKana, separate, inputId.firstName, inputId.fullName, inputId.lastName, targetId.firstName, targetId.fullName, targetId.lastName, nameKanaProps.kanaType])

  // オートかなで取得できたかなをvalueに代入
  const onChangeAutoKana = {
    fullName: (e: React.ChangeEvent<HTMLInputElement>) => {
      // オートかなが無効の場合は処理を終了
      if (!autoKana) return
      /**
       * 正式表記入力項目のonChangeイベントが先に発火するため、
       * 時間を置いてふりがな入力項目のonChangeイベントを発火させる
       * @todo かな入力項目のvalueが変更されたのを検知して発火させるようにする
       */
      setTimeout(() => {
        setValue && targetId.fullName && setValue(targetId.fullName, autokanaFullNameRef.current?.getFurigana() ? autokanaFullNameRef.current?.getFurigana() : '')

        // 初回バリデーション実行後にリアルタイムにバリデーションを実行する
        const error = nameKanaProps.nameProps?.fullNameProps?.error
        error && Object.keys(error).length > 0 && trigger && targetId.fullName && trigger(targetId.fullName)
      }, 100)
    },
    lastName: (e: React.ChangeEvent<HTMLInputElement>) => {
      // オートかなが無効の場合は処理を終了
      if (!autoKana) return
      /**
       * 正式表記入力項目のonChangeイベントが先に発火するため、
       * 時間を置いてふりがな入力項目のonChangeイベントを発火させる
       * @todo かな入力項目のvalueが変更されたのを検知して発火させるようにする
       */
      setTimeout(() => {
        setValue && targetId.lastName && setValue(targetId.lastName, autokanaLastNameRef.current?.getFurigana() ? autokanaLastNameRef.current?.getFurigana() : '')

        // 初回バリデーション実行後にリアルタイムにバリデーションを実行する
        const error = nameKanaProps.nameProps?.lastNameProps?.error
        error && Object.keys(error).length > 0 && trigger && targetId.lastName && trigger(targetId.lastName)
      }, 100)
    },
    firstName: (e: React.ChangeEvent<HTMLInputElement>) => {
      // オートかなが無効の場合は処理を終了
      if (!autoKana) return
      /**
       * 正式表記入力項目のonChangeイベントが先に発火するため、
       * 時間を置いてふりがな入力項目のonChangeイベントを発火させる
       * @todo かな入力項目のvalueが変更されたのを検知して発火させるようにする
       */
      setTimeout(() => {
        setValue && targetId.firstName && setValue(targetId.firstName, autokanaFirstNameRef.current?.getFurigana() ? autokanaFirstNameRef.current?.getFurigana() : '')

        // 初回バリデーション実行後にリアルタイムにバリデーションを実行する
        const error = nameKanaProps.nameProps?.firstNameProps?.error
        error && Object.keys(error).length > 0 && trigger && targetId.firstName && trigger(targetId.firstName)
      }, 100)
    },
  }

  return (
    <>
      <NameRegisterInput
        onChangeAutoKanaFullNameKana={onChangeAutoKana.fullName}
        onChangeAutoKanaLastNameKana={onChangeAutoKana.lastName}
        onChangeAutoKanaFirstNameKana={onChangeAutoKana.firstName}
        separate={separate}
        {...nameRegisterProps}
      />
      <NameKanaInput fullNameKanaRef={kanaNameKanaRefs.fullName} lastNameKanaRef={kanaNameKanaRefs.lastName} firstNameKanaRef={kanaNameKanaRefs.firstName} separate={separate} {...nameKanaProps} />
    </>
  )
}
