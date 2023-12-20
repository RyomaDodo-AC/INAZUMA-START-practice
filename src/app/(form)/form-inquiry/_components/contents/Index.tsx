/**
 * お問い合わせフォームの内容を定義するコンポーネント
 * @module InquiryContents
 */
'use client'
import React, { useEffect } from 'react'
import { inquiryTypeItems, inquiryDefaultValues, inquiryDefaultValuesType } from '../../_config'
import { HeadingCaption } from '@/components/elements'
import { RadioControl, CheckboxControl, TextareaControl, SelectControl } from '@/components/form/field'
import { NameInput, TelInput, EmailInput } from '@/components/form/items'
import { InputBox } from '@/components/form/parts'
import { contactTimeItems, customerTypeItems } from '@/app/(form)/_config'
import { ContentsProps } from '@/app/(form)/_components'
import { useCommonFormContext } from '@/app/(form)/_config/context'
import { getLabelItems } from '@/features/functions/form/getLabelItems'
import { useFormContext } from 'react-hook-form'

/**
 * お問い合わせフォームの内容を定義するProps
 * @typedef {Object} InquiryContentsProps
 */
export interface InquiryContentsProps extends ContentsProps<inquiryDefaultValuesType> {}

/**
 * お問い合わせフォームの内容を定義するコンポーネント
 * @param {InquiryContentsProps} props - お問い合わせフォームの内容を定義するコンポーネントのプロパティ
 * @returns {JSX.Element} - お問い合わせフォームの内容を定義するコンポーネント
 */
export const InquiryContents: React.FC<InquiryContentsProps> = (props) => {
  const { pageType } = props
  const {
    register,
    setValue,
    getValues,
    trigger,
    watch,
    resetField,
    formState: { errors, dirtyFields },
  } = useFormContext()

  // コンテキストの設定
  const { ...contextMethods } = useCommonFormContext()

  // お申込み種別によって表示する項目を変更する
  const watchCustomerType = watch('customerType')
  let nameItems = <></>

  // useEffect内でresetFieldを実行する
  useEffect(() => {
    // お申込み種別が変更されたら、法人情報の項目をリセットする
    if (watchCustomerType === '法人') {
      // 切り替え時、dirtyFieldsに個人情報の項目があればをリセットする
      if (dirtyFields.customerFirstName || dirtyFields.customerLastName || dirtyFields.customerFirstNameKana || dirtyFields.customerLastNameKana) {
        resetField('customerFirstName')
        resetField('customerLastName')
        resetField('customerFirstNameKana')
        resetField('customerLastNameKana')
        contextMethods.setValues({
          ...(contextMethods.getValues() as inquiryDefaultValuesType),
          customerFirstName: inquiryDefaultValues.customerFirstName,
          customerLastName: inquiryDefaultValues.customerLastName,
          customerFirstNameKana: inquiryDefaultValues.customerFirstNameKana,
          customerLastNameKana: inquiryDefaultValues.customerLastNameKana,
        })
      }
    } else if (watchCustomerType === '個人') {
      // 切り替え時に法人情報の項目をリセットする
      if (
        dirtyFields.companyName ||
        dirtyFields.companyNameKana ||
        dirtyFields.contactFirstName ||
        dirtyFields.contactLastName ||
        dirtyFields.contactFirstNameKana ||
        dirtyFields.contactLastNameKana
      ) {
        resetField('companyName')
        resetField('companyNameKana')
        resetField('contactFirstName')
        resetField('contactLastName')
        resetField('contactFirstNameKana')
        resetField('contactLastNameKana')
        contextMethods.setValues({
          ...(contextMethods.getValues() as inquiryDefaultValuesType),
          companyName: inquiryDefaultValues.companyName,
          companyNameKana: inquiryDefaultValues.companyNameKana,
          contactFirstName: inquiryDefaultValues.contactFirstName,
          contactLastName: inquiryDefaultValues.contactLastName,
          contactFirstNameKana: inquiryDefaultValues.contactFirstNameKana,
          contactLastNameKana: inquiryDefaultValues.contactLastNameKana,
        })
      }
    }
  }, [watchCustomerType, dirtyFields, resetField, contextMethods])

  // お申込み種別の変更時に実行する処理
  if (watchCustomerType === '法人') {
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
  } else if (watchCustomerType === '個人') {
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
      </>
    )
  }

  return (
    <>
      {/* 個人情報 */}
      <div>
        <HeadingCaption className="mb-8 text-lg md:text-xl">お客様の情報</HeadingCaption>
        <div className="space-y-5">
          {/* お申込み種別 */}
          {pageType === 'input' ? (
            // 入力画面
            <RadioControl nameId="customerType" label="お申込み種別" required={true} error={errors.customerType} lists={customerTypeItems} {...register('customerType')} />
          ) : (
            // 確認画面
            <>
              <InputBox nameId="customerType" label="お申込み種別" required={true} styleType="confirm">
                {getLabelItems(customerTypeItems, getValues('customerType'))}
              </InputBox>
            </>
          )}

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

      {/* お問い合わせ内容 */}
      <div className="mt-16">
        <HeadingCaption className="mb-8 text-lg md:text-xl">お問い合わせ内容</HeadingCaption>
        <div className="space-y-4">
          {/* ご希望連絡時間帯 */}
          {pageType === 'input' ? (
            // 入力画面
            <SelectControl nameId="contactTime" label="ご希望連絡時間帯" required={true} error={errors.contactTime} options={contactTimeItems} {...register('contactTime')} />
          ) : (
            // 確認画面
            <>
              <InputBox nameId="contactTime" label="ご希望連絡時間帯" required={true} styleType="confirm">
                {getLabelItems(contactTimeItems, getValues('contactTime'))}
              </InputBox>
            </>
          )}

          {/* お問い合わせの種類 */}
          {pageType === 'input' ? (
            // 入力画面
            <SelectControl nameId="inquiryType" label="お問い合わせの種類" required={true} error={errors.inquiryType} options={inquiryTypeItems} {...register('inquiryType')} />
          ) : (
            // 確認画面
            <>
              <InputBox nameId="inquiryType" label="お問い合わせの種類" required={true} styleType="confirm">
                {getLabelItems(inquiryTypeItems, getValues('inquiryType'))}
              </InputBox>
            </>
          )}

          {/* お問い合わせ内容 */}
          {pageType === 'input' ? (
            // 入力画面
            <TextareaControl
              nameId="inquiryContent"
              label="お問い合わせ内容"
              required={true}
              error={errors.inquiryContent}
              {...register('inquiryContent')}
              placeholder="お問い合わせ内容を入力してください"
              rows={10}
            />
          ) : (
            // 確認画面
            <>
              <InputBox nameId="inquiryContent" label="お問い合わせ内容" required={true} styleType="confirm">
                <span className="whitespace-pre-wrap">{`${getValues('inquiryContent')}`}</span>
              </InputBox>
            </>
          )}
        </div>
      </div>

      {/* 同意 */}
      {pageType === 'confirm' && (
        // 確認画面
        <div className="mx-auto mt-10 flex max-w-lg items-center justify-center bg-gray-300 py-5">
          <CheckboxControl nameId="agree" lists={[{ labelContents: '個人情報の取り扱いについて同意する', label: '同意する', value: 'true' }]} error={errors.agree} {...register('agree')} />
        </div>
      )}
    </>
  )
}
