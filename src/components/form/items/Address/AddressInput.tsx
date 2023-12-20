/**
 * 住所入力コンポーネント
 * @module AddressInput
 */
'use client'
import React, { useEffect, useRef } from 'react'
import * as address from '@/components/form/items/Address'
import { PostalCodeInput, PrefectureInput, CityInput, StreetAddressInput, BuildingInput } from '@/components/form/items/Address'
import { UseFormSetValue, UseFormTrigger, UseFormGetValues } from 'react-hook-form'
import { getAddress, zipcloudType } from '@/features/functions/address/getAddress'

/**
 * 住所入力コンポーネントのプロパティ
 * @typedef {Object} AddressInputProps
 * @property {address.PostalCodeInputProps} - 郵便番号入力コンポーネントのプロパティ
 * @property {address.PrefectureInputProps} - 都道府県入力コンポーネントのプロパティ
 * @property {address.CityInputProps} - 市区町村入力コンポーネントのプロパティ
 * @property {address.StreetAddressInputProps} - 町名・番地入力コンポーネントのプロパティ
 * @property {address.BuildingInputProps} - 建物名入力コンポーネントのプロパティ
 */
export interface AddressInputProps {
  /**
   * 郵便番号入力コンポーネントのプロパティ
   */
  postalCodeProps: address.PostalCodeInputProps
  /**
   * 都道府県入力コンポーネントのプロパティ
   */
  prefectureProps: address.PrefectureInputProps
  /**
   * 市区町村入力コンポーネントのプロパティ
   */
  cityProps: address.CityInputProps
  /**
   * 町名・番地入力コンポーネントのプロパティ
   */
  streetAddressProps: address.StreetAddressInputProps
  /**
   * 建物名入力コンポーネントのプロパティ
   */
  buildingProps: address.BuildingInputProps
  /**
   * 郵便番号自動入力
   */
  autoZip?: boolean
  /**
   * setValue（react-form-hooks）：郵便番号自動入力の場合、郵便番号自動入力の設定を保存するために使用
   */
  setValue: UseFormSetValue<any>
  /**
   * getValue（react-form-hooks）：郵便番号自動入力の場合、郵便番号自動入力の設定を取得するために使用
   */
  getValues: UseFormGetValues<any>
  /**
   * trigger（react-form-hooks）：郵便番号が変更された際にバリデーションを実行する目的で使用
   */
  trigger: UseFormTrigger<any>
}

/**
 * 住所入力コンポーネント
 * @memo 各種入力コンポーネントの隙間は親コンポーネントから調整する
 * @param {AddressInputProps} props - 住所入力コンポーネントのプロパティ
 * @returns {React.FC} - 住所入力コンポーネント
 */
export const AddressInput: React.FC<AddressInputProps> = ({
  postalCodeProps: postalCodePropsAll,
  prefectureProps,
  cityProps,
  streetAddressProps,
  buildingProps,
  autoZip = true,
  setValue,
  getValues,
  trigger,
}) => {
  // 郵便番号のonChangeをオーバーライド
  const { onChange: postalCodeOnchange, ...postalCodeProps } = postalCodePropsAll
  const onChangePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 郵便番号に渡っているonChangeを実行
    postalCodeOnchange && postalCodeOnchange(e)

    /* 郵便番号の値が変更するのを検知して住所を自動入力 */
    if (autoZip) {
      const postalCode = getValues(postalCodeProps.nameId)

      // 郵便番号の値が正常な場合は住所を自動入力
      if (postalCode && (postalCode.match(/^\d{3}-?\d{4}$/) || postalCode.match(/^\d{7}$/))) {
        getAddress(postalCode).then((res: zipcloudType) => {
          // レスポンス結果がある場合は住所を自動入力
          if (res.status === 200 && res.results) {
            // レスポンス結果が複数の場合は最初の結果を使用
            const address = res.results[0]

            // レスポンス結果をsetValueで保存
            setValue(prefectureProps.nameId, address.address1)
            setValue(cityProps.nameId, address.address2)
            setValue(streetAddressProps.nameId, address.address3)

            // 初回バリデーション実行後にリアルタイムにバリデーションを実行する
            const error = postalCodeProps.error
            if (error && Object.keys(error).length > 0) {
              trigger(prefectureProps.nameId)
              trigger(cityProps.nameId)
              trigger(streetAddressProps.nameId)
            }
          }
        })
      }
    }
  }

  return (
    <>
      <PostalCodeInput label={postalCodeProps.label ? postalCodeProps.label : '郵便番号'} onChange={onChangePostalCode} {...postalCodeProps} />
      <PrefectureInput label={prefectureProps?.label ? prefectureProps.label : '都道府県'} {...prefectureProps} />
      <CityInput label={cityProps?.label ? cityProps.label : '市区町村'} {...cityProps} />
      <StreetAddressInput label={streetAddressProps?.label ? streetAddressProps.label : '町名・番地'} {...streetAddressProps} />
      <BuildingInput label={buildingProps?.label ? buildingProps.label : '建物名'} {...buildingProps} />
    </>
  )
}
