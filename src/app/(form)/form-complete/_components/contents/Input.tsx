/**
 * 完結フォーム個人情報入力画面の内容を定義するコンポーネント
 * @module CompleteInputContents
 */
import React, { useEffect, useState } from 'react'
import { HeadingCaption } from '@/components/elements'
import { RadioControl, CheckboxControl } from '@/components/form/field'
import { NameInput, TelInput, EmailInput, BirthDateInput, AddressInput } from '@/components/form/items'
import { InputBox } from '@/components/form/parts'
import { StripeElements, StripePaymentIntent } from '@/components/plugins/Stripe'
import { nationalityItems, genderItems } from '@/app/(form)/_config'
import { ContentsProps } from '@/app/(form)/_components'
import { useCommonFormContext } from '@/app/(form)/_config/context'
import { completeDefaultValues, completeDefaultValuesType, shippingItems } from '@/app/(form)/form-complete/_config'
import { getLabelItems } from '@/features/functions/form/getLabelItems'
import { useFormContext } from 'react-hook-form'
import { format } from 'date-fns'

/**
 * 完結フォーム個人情報入力画面の内容を定義するProps
 * @typedef {Object} CompleteInputContentsProps
 */
export interface CompleteInputContentsProps extends ContentsProps<completeDefaultValuesType> {}

/**
 * 完結フォーム個人情報入力画面の内容を定義するコンポーネント
 * @param {CompleteInputContentsProps} props - 完結フォーム個人情報入力画面の内容を定義するコンポーネントのプロパティ
 * @returns {JSX.Element} - 完結フォーム個人情報入力画面の内容を定義するコンポーネント
 */
export const CompleteInputContents: React.FC<CompleteInputContentsProps> = (props) => {
  const { pageType } = props
  const {
    register,
    setValue,
    getValues,
    trigger,
    watch,
    resetField,
    formState: { errors, dirtyFields, defaultValues },
  } = useFormContext()

  /**
   * フォームの設定
   */
  // コンテキストの設定
  const { ...contextMethods } = useCommonFormContext()

  // お申込み種別によって表示する項目を変更する
  const customerType = getValues('customerType')
  let nameItems = <></>

  useEffect(() => {
    if (customerType === '法人') {
      // お申込み種別によって項目を明示的にリセットする（DOMが存在しない場合はresetFieldsが効かないためsetValueする）
      setValue('customerFirstName', undefined)
      setValue('customerLastName', undefined)
      setValue('customerFirstNameKana', undefined)
      setValue('customerLastNameKana', undefined)
      setValue('gender', undefined)
      setValue('birthDate', undefined)
      setValue('nationality', undefined)
    } else if (customerType === '個人') {
      // お申込み種別によって項目を明示的にリセットする（DOMが存在しない場合はresetFieldsが効かないためsetValueする）
      setValue('companyName', undefined)
      setValue('companyNameKana', undefined)
      setValue('contactFirstName', undefined)
      setValue('contactLastName', undefined)
      setValue('contactFirstNameKana', undefined)
      setValue('contactLastNameKana', undefined)
    }
  }, [customerType, setValue])

  // 配送先によって項目を明示的にリセットする
  const shipping = watch('shipping')
  useEffect(() => {
    if (shipping === 'ご契約者様と同じ住所') {
      setValue('shippingPostalCode', undefined)
      setValue('shippingPrefecture', undefined)
      setValue('shippingCity', undefined)
      setValue('shippingStreetAddress', undefined)
      setValue('shippingBuilding', undefined)
    }
  }, [shipping, setValue])

  // お申込み種別の変更時に実行する処理
  if (customerType === '法人') {
    nameItems = (
      <>
        {/* 会社名 */}
        {pageType === 'input' ? (
          // 入力画面
          <NameInput
            nameRegisterProps={{
              nameProps: {
                fullNameProps: {
                  nameId: 'companyName',
                  label: '会社名',
                  placeholder: '例）株式会社 サンプル',
                  required: true,
                  error: errors.companyName,
                  ...register('companyName'),
                },
              },
            }}
            nameKanaProps={{
              nameProps: {
                fullNameProps: {
                  nameId: 'companyNameKana',
                  label: '会社名カナ',
                  placeholder: '例）カブシキガイシャ サンプル',
                  required: true,
                  error: errors.companyNameKana,
                  ...register('companyNameKana'),
                },
              },
              kanaType: 'katakana',
            }}
            separate={false}
            setValue={setValue}
            trigger={trigger}
          />
        ) : (
          // 確認画面
          <>
            <InputBox nameId="companyName" label="会社名" required={true} styleType="confirm">
              {getValues('companyName')}
            </InputBox>
            <InputBox nameId="companyNameKana" label="会社名カナ" required={true} styleType="confirm">
              {getValues('companyNameKana')}
            </InputBox>
          </>
        )}

        {/* 担当者名 */}
        {pageType === 'input' ? (
          // 入力画面
          <NameInput
            nameRegisterProps={{
              nameProps: {
                firstNameProps: {
                  nameId: 'contactFirstName',
                  label: '担当者名（名）',
                  placeholder: '例）太郎',
                  required: true,
                  error: errors.contactFirstName,
                  ...register('contactFirstName'),
                },
                lastNameProps: {
                  nameId: 'contactLastName',
                  label: '担当者名（姓）',
                  placeholder: '例）山田',
                  required: true,
                  error: errors.contactLastName,
                  ...register('contactLastName'),
                },
              },
            }}
            nameKanaProps={{
              nameProps: {
                firstNameProps: {
                  nameId: 'contactFirstNameKana',
                  label: '担当者名カナ（名）',
                  placeholder: '例）タロウ',
                  required: true,
                  error: errors.contactFirstNameKana,
                  ...register('contactFirstNameKana'),
                },
                lastNameProps: {
                  nameId: 'contactLastNameKana',
                  label: '担当者名カナ（姓）',
                  placeholder: '例）ヤマダ',
                  required: true,
                  error: errors.contactLastNameKana,
                  ...register('contactLastNameKana'),
                },
              },
              kanaType: 'katakana',
            }}
            separate={true}
            setValue={setValue}
            trigger={trigger}
          />
        ) : (
          // 確認画面
          <>
            <InputBox nameId="contactFullName" label="担当者名" required={true} styleType="confirm">
              {getValues('contactLastName') + ' ' + getValues('contactFirstName')}
            </InputBox>
            <InputBox nameId="contactFullNameKana" label="担当者名カナ" required={true} styleType="confirm">
              {getValues('contactLastNameKana') + ' ' + getValues('contactFirstNameKana')}
            </InputBox>
          </>
        )}
      </>
    )
  } else if (customerType === '個人') {
    nameItems = (
      <>
        {/* お名前 */}
        {pageType === 'input' ? (
          // 入力画面
          <NameInput
            nameRegisterProps={{
              nameProps: {
                firstNameProps: {
                  nameId: 'customerFirstName',
                  label: 'お名前（名）',
                  required: true,
                  error: errors.customerFirstName,
                  ...register('customerFirstName'),
                },
                lastNameProps: {
                  nameId: 'customerLastName',
                  label: 'お名前（姓）',
                  required: true,
                  error: errors.customerLastName,
                  ...register('customerLastName'),
                },
              },
            }}
            nameKanaProps={{
              nameProps: {
                firstNameProps: {
                  nameId: 'customerFirstNameKana',
                  label: 'お名前カナ（名）',
                  required: true,
                  error: errors.customerFirstNameKana,
                  ...register('customerFirstNameKana'),
                },
                lastNameProps: {
                  nameId: 'customerLastNameKana',
                  label: 'お名前カナ（姓）',
                  required: true,
                  error: errors.customerLastNameKana,
                  ...register('customerLastNameKana'),
                },
              },
              kanaType: 'katakana',
            }}
            separate={true}
            setValue={setValue}
            trigger={trigger}
          />
        ) : (
          // 確認画面
          <>
            <InputBox nameId="customerFullName" label="お名前" required={true} styleType="confirm">
              {getValues('customerLastName') + ' ' + getValues('customerFirstName')}
            </InputBox>
            <InputBox nameId="customerFullNameKana" label="お名前カナ" required={true} styleType="confirm">
              {getValues('customerLastNameKana') + ' ' + getValues('customerFirstNameKana')}
            </InputBox>
          </>
        )}

        {/* 性別 */}
        {pageType === 'input' ? (
          // 入力画面
          <RadioControl nameId="gender" label="性別" labelType="card" required={true} error={errors.gender} {...register('gender')} lists={genderItems} />
        ) : (
          // 確認画面
          <>
            <InputBox nameId="gender" label="性別" required={true} styleType="confirm">
              {getLabelItems(genderItems, getValues('gender'))}
            </InputBox>
          </>
        )}

        {/* 生年月日 */}
        {pageType === 'input' ? (
          // 入力画面
          <BirthDateInput
            nameId="birthDate"
            label="生年月日"
            yearOffset={{
              // 18年前から80年前までの選択肢を表示する
              old: new Date().getFullYear() - 80,
              new: new Date().getFullYear() - 18,
            }}
            required={true}
            error={errors.birthDate}
            {...register('birthDate')}
            setValue={setValue}
            getValues={getValues}
            trigger={trigger}
            birthDate={watch('birthDate')}
          />
        ) : (
          // 確認画面
          <>
            <InputBox nameId="birthDate" label="生年月日" required={true} styleType="confirm">
              {/* 日付の形式をyyyy-MM-ddからyyyy年MM月dd日の形式に変換して表示する */}
              {getValues('birthDate') && format(new Date(getValues('birthDate')), 'yyyy年MM月dd日')}
            </InputBox>
          </>
        )}

        {/* 国籍 */}
        {pageType === 'input' ? (
          // 入力画面
          <RadioControl nameId="nationality" label="国籍" labelType="card" required={true} error={errors.nationality} {...register('nationality')} lists={nationalityItems} />
        ) : (
          // 確認画面
          <>
            <InputBox nameId="nationality" label="国籍" required={true} styleType="confirm">
              {getLabelItems(nationalityItems, getValues('nationality'))}
            </InputBox>
          </>
        )}
      </>
    )
  }

  return (
    <>
      {/* 個人情報 */}
      <div>
        <HeadingCaption className="mb-8 text-lg md:text-xl">お客様の情報</HeadingCaption>
        <div className="space-y-5">
          {/* 顧客情報 */}
          {nameItems}

          {/* 電話番号 */}
          {pageType === 'input' ? (
            // 入力画面
            <TelInput nameId="tel" label="電話番号" required={true} error={errors.tel} {...register('tel')} hyphen={false} />
          ) : (
            // 確認画面
            <>
              <InputBox nameId="tel" label="電話番号" required={true} styleType="confirm">
                {getValues('tel')}
              </InputBox>
            </>
          )}

          {/* メールアドレス */}
          {pageType === 'input' ? (
            // 入力画面
            <>
              <EmailInput nameId="email" label="メールアドレス" required={true} error={errors.email} {...register('email')} />
              <EmailInput
                nameId="confirmEmail"
                required={true}
                label="メールアドレス（確認用）"
                note={{ list: ['確認のためメールアドレスの再入力をお願いいたします。'] }}
                {...register('confirmEmail')}
                error={errors.confirmEmail}
              />
            </>
          ) : (
            // 確認画面
            <>
              <InputBox nameId="email" label="メールアドレス" required={true} styleType="confirm">
                {getValues('email')}
              </InputBox>
            </>
          )}
        </div>
      </div>

      {/* ご契約者様の住所 */}
      <div className="mt-16">
        <HeadingCaption className="mb-8 text-lg md:text-xl">ご契約者様の住所</HeadingCaption>
        <div className="space-y-5">
          {/* 住所 */}
          {pageType === 'input' ? (
            // 入力画面
            <AddressInput
              postalCodeProps={{
                nameId: 'postalCode',
                required: true,
                linkDisplay: true,
                error: errors.postalCode,
                ...register('postalCode'),
              }}
              prefectureProps={{
                nameId: 'prefecture',
                required: true,
                error: errors.prefecture,
                ...register('prefecture'),
              }}
              cityProps={{
                nameId: 'city',
                required: true,
                error: errors.city,
                ...register('city'),
              }}
              streetAddressProps={{
                nameId: 'streetAddress',
                required: true,
                error: errors.streetAddress,
                ...register('streetAddress'),
              }}
              buildingProps={{
                nameId: 'building',
                required: false,
                error: errors.building,
                ...register('building'),
              }}
              setValue={setValue}
              getValues={getValues}
              trigger={trigger}
            />
          ) : (
            // 確認画面
            <>
              <InputBox nameId="postalCode" label="郵便番号" required={true} styleType="confirm">
                {getValues('postalCode')}
              </InputBox>
              <InputBox nameId="prefecture" label="都道府県" required={true} styleType="confirm">
                {getValues('prefecture')}
              </InputBox>
              <InputBox nameId="city" label="市区町村" required={true} styleType="confirm">
                {getValues('city')}
              </InputBox>
              <InputBox nameId="streetAddress" label="町名・番地" required={true} styleType="confirm">
                {getValues('streetAddress')}
              </InputBox>
              <InputBox nameId="building" label="建物名" required={false} styleType="confirm">
                {getValues('building')}
              </InputBox>
            </>
          )}
        </div>
      </div>

      {/* 配送先の情報 */}
      <div className="mt-16">
        <HeadingCaption className="mb-8 text-lg md:text-xl">配送先の情報</HeadingCaption>
        <div className="space-y-5">
          {/* 配送先 */}
          {pageType === 'input' ? (
            <RadioControl nameId="shipping" label="配送先の住所" labelType="card" required={true} error={errors.shipping} {...register('shipping')} lists={shippingItems} />
          ) : (
            <>
              <InputBox nameId="shipping" label="配送先の住所" required={true} styleType="confirm">
                {getLabelItems(shippingItems, getValues('shipping'))}
              </InputBox>
            </>
          )}
        </div>

        {/* 配送先の住所 */}
        {watch('shipping') === 'ご契約者様と異なる住所' && (
          <div className="mt-5">
            <div className="space-y-5">
              {/* 住所 */}
              {pageType === 'input' ? (
                // 入力画面
                <AddressInput
                  postalCodeProps={{
                    nameId: 'shippingPostalCode',
                    required: true,
                    linkDisplay: true,
                    error: errors.shippingPostalCode,
                    ...register('shippingPostalCode'),
                  }}
                  prefectureProps={{
                    nameId: 'shippingPrefecture',
                    required: true,
                    error: errors.shippingPrefecture,
                    ...register('shippingPrefecture'),
                  }}
                  cityProps={{
                    nameId: 'shippingCity',
                    required: true,
                    error: errors.shippingCity,
                    ...register('shippingCity'),
                  }}
                  streetAddressProps={{
                    nameId: 'shippingStreetAddress',
                    required: true,
                    error: errors.shippingStreetAddress,
                    ...register('shippingStreetAddress'),
                  }}
                  buildingProps={{
                    nameId: 'shippingBuilding',
                    required: false,
                    error: errors.shippingBuilding,
                    ...register('shippingBuilding'),
                  }}
                  setValue={setValue}
                  getValues={getValues}
                  trigger={trigger}
                />
              ) : (
                // 確認画面
                <>
                  <InputBox nameId="shippingPostalCode" label="郵便番号" required={true} styleType="confirm">
                    {getValues('shippingPostalCode')}
                  </InputBox>
                  <InputBox nameId="shippingPrefecture" label="都道府県" required={true} styleType="confirm">
                    {getValues('shippingPrefecture')}
                  </InputBox>
                  <InputBox nameId="shippingCity" label="市区町村" required={true} styleType="confirm">
                    {getValues('shippingCity')}
                  </InputBox>
                  <InputBox nameId="shippingStreetAddress" label="町名・番地" required={true} styleType="confirm">
                    {getValues('shippingStreetAddress')}
                  </InputBox>
                  <InputBox nameId="shippingBuilding" label="建物名" required={false} styleType="confirm">
                    {getValues('shippingBuilding')}
                  </InputBox>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* お支払い情報 */}
      <div className="mt-16">
        <HeadingCaption className="mb-8 text-lg md:text-xl">お支払い情報</HeadingCaption>
        <div className="space-y-5">
          {/* StripeElements */}
          {pageType === 'input' ? (
            <StripeElements intentType="setup">
              <StripePaymentIntent nameId="stripeSetupIntent" label="カード情報" required={true} error={errors.stripeSetupIntent} />
            </StripeElements>
          ) : (
            <>
              <InputBox nameId="stripeCardNumber" label="カード番号" required={true} styleType="confirm" note={{ list: ['セキュリティのため下4桁のみ表示しています。'] }}>
                **** **** **** {getValues('stripeCardNumber')}
              </InputBox>
            </>
          )}
        </div>
      </div>
    </>
  )
}
