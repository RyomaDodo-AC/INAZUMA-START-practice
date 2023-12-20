/**
 * 完結フォームの個人情報入力画面のクライアントサイドコンポーネント
 */
'use client'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useCommonFormContext } from '@/app/(form)/_config/context'
import { HeadingLine } from '@/components/elements'
import { Button } from '@/components/form/field'
import { completeDefaultValuesType, getSchema } from '../../_config'
import { CompleteInputContents } from '../../_components'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NODE_ENV } from '@/config'

export const FormCompleteInputClient: React.FC = () => {
  // コンテキストの設定
  const { setValues, getValues, getUniqueId } = useCommonFormContext()

  // useFormの設定
  const useFormMethods = useForm<completeDefaultValuesType>({
    resolver: zodResolver(getSchema('input')),
    defaultValues: getValues() as completeDefaultValuesType,
  })

  /**
   * 直アクセスの場合は入力画面に戻る
   */
  // routerの設定
  const router = useRouter()
  const pathname = usePathname()

  // ユニークIDがundefinedの場合もしくは開発環境以外の場合は入力画面に戻る
  if (!getUniqueId() && NODE_ENV !== 'development') {
    router.push(pathname.replace(/\/input$/, ''))
    return null
  }

  // フォームの送信
  const onSubmit = (data: completeDefaultValuesType) => {
    // 現在のフォームの値とコンテキストの値をマージしてコンテキストに保存
    setValues({ ...(getValues() as completeDefaultValuesType), ...useFormMethods.getValues(), ...data })

    router.push(pathname.replace(/\/input$/, '/confirm'))
  }

  /**
   * 前のページに戻る
   */
  const onBack = () => {
    // 現在のフォームの値とコンテキストの値をマージしてコンテキストに保存
    setValues({ ...(getValues() as completeDefaultValuesType), ...useFormMethods.getValues() })

    // 現在のURLを元に前のページのURLを生成
    const backPath = pathname.replace(/\/input$/, '')
    router.push(backPath)
  }

  return (
    <>
      <FormProvider {...useFormMethods}>
        <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
          <HeadingLine tag="h2" className="mb-8 text-xl md:text-3xl">
            お客様情報の入力
          </HeadingLine>

          <div>
            <CompleteInputContents pageType="input" />
          </div>

          <div className="mt-16 flex flex-col items-center justify-center gap-5 md:flex-row">
            <div className="w-full max-w-md">
              <Button iconLeft="arrow" type="button" buttonStyle="outline" onClick={onBack}>
                <span className="text-lg md:py-2 md:text-2xl">内容を修正する</span>
              </Button>
            </div>
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
