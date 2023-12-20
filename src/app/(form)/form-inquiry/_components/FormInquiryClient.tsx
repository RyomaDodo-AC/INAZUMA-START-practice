/**
 * お問い合わせフォームの入力画面のクライアントサイドコンポーネント
 */
'use client'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useCommonFormContext } from '@/app/(form)/_config/context'
import { Button } from '@/components/form/field'
import { HeadingLine } from '@/components/elements'
import { inquiryDefaultValuesType, getSchema } from '../_config'
import { InquiryContents } from '../_components'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const FormInquiryClient: React.FC = () => {
  // コンテキストの設定
  const { setValues, getValues, createUniqueId } = useCommonFormContext()

  // useFormの設定
  const useFormMethods = useForm<inquiryDefaultValuesType>({
    resolver: zodResolver(getSchema('index')),
    defaultValues: getValues() as inquiryDefaultValuesType,
  })

  // routerの設定
  const router = useRouter()
  const pathname = usePathname()

  // フォームの送信
  const onSubmit = (data: inquiryDefaultValuesType) => {
    // 現在のフォームの値とコンテキストの値をマージしてコンテキストに保存
    setValues({ ...(getValues() as inquiryDefaultValuesType), ...data })

    // ユニークIDを生成して保存
    createUniqueId()

    router.push(`${pathname}/confirm`)
  }

  return (
    <>
      <FormProvider {...useFormMethods}>
        <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
          <HeadingLine tag="h2" className="mb-8 text-xl md:text-3xl">
            お客様情報の入力
          </HeadingLine>

          <div>
            <InquiryContents pageType="input" />
          </div>

          <div className="mt-16 flex flex-col items-center justify-center gap-5 md:flex-row">
            <div className="w-full max-w-md">
              <Button iconRight="arrow" type="submit">
                <span className="text-lg md:py-2 md:text-2xl">入力内容を確認する</span>
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  )
}
