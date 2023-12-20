/**
 * 完結フォームのプラン選択画面のクライアントサイドコンポーネント
 */
'use client'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useCommonFormContext } from '@/app/(form)/_config/context'
import { Button } from '@/components/form/field'
import { FormProgress } from '@/app/(form)/_components'
import { Ssl } from '@/components/form/parts'
import { completeDefaultValuesType, getSchema } from '../_config'
import { CompletePlanInputContents, CartItems, CartAmount } from '../_components'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const FormCompleteClient: React.FC = () => {
  // コンテキストの設定
  const { setValues, getValues, createUniqueId } = useCommonFormContext()

  // useFormの設定
  const useFormMethods = useForm<completeDefaultValuesType>({
    resolver: zodResolver(getSchema('index')),
    defaultValues: getValues() as completeDefaultValuesType,
  })

  // routerの設定
  const router = useRouter()
  const pathname = usePathname()

  // フォームの送信
  const onSubmit = (data: completeDefaultValuesType) => {
    // 現在のフォームの値とコンテキストの値をマージしてコンテキストに保存
    setValues({ ...(getValues() as completeDefaultValuesType), ...data })

    // ユニークIDを生成して保存
    createUniqueId()

    router.push(`${pathname}/input`)
  }

  return (
    <>
      <FormProvider {...useFormMethods}>
        <div className="w-full pb-10 pt-5 md:w-3/5 md:pb-32 md:pt-14">
          <div className="mb-7 md:mb-16">
            <FormProgress />
          </div>

          <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
            <div>
              <CompletePlanInputContents />
            </div>

            <div className="mt-16 flex flex-col items-center justify-center gap-5 md:flex-row">
              <div className="w-full max-w-md">
                <Button iconRight="arrow" type="submit">
                  <span className="text-lg md:py-2 md:text-2xl">お客様情報入力へ進む</span>
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-7 md:mt-16">
            <Ssl />
          </div>
        </div>

        <div className="hidden w-1/3 bg-gray-100 px-5 pb-10 pt-5 md:block md:pb-32 md:pt-14">
          <div className="sticky top-10 space-y-10">
            <CartItems />
            <CartAmount />
          </div>
        </div>
      </FormProvider>
    </>
  )
}
