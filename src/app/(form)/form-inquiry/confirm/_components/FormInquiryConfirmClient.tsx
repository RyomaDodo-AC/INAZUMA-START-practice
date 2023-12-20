/**
 * お問い合わせフォームの確認画面のクライアントサイドコンポーネント。
 */
'use client'
import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useCommonFormContext } from '@/app/(form)/_config/context'
import { NODE_ENV } from '@/config'
import { HeadingLine } from '@/components/elements'
import { Button } from '@/components/form/field'
import { inquiryDefaultValuesType, getSchema, getInquiryObject } from '../../_config'
import { InquiryContents } from '../../_components'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParamsContext } from '@/features/context'

export const FormInquiryConfirmClient: React.FC = () => {
  /**
   * 初期設定
   */
  // コンテキストから値を取得
  const { getValues, setValues, getUniqueId } = useCommonFormContext()
  const { ...SearchParams } = useSearchParamsContext()

  // useFormの設定
  const useFormMethods = useForm<inquiryDefaultValuesType>({
    resolver: zodResolver(getSchema('confirm')),
    defaultValues: getValues() as inquiryDefaultValuesType,
  })

  // 送信ボタンの色
  const buttonColor = !useFormMethods.formState.isValid ? 'gray' : 'blue'

  // 送信エラーフラグ（trueの場合エラー）
  const [isSubmitError, setIsSubmitError] = useState(false)

  /**
   * 直アクセスの場合は入力画面に戻る
   */
  // routerの設定
  const router = useRouter()
  const pathname = usePathname()

  // ユニークIDがundefinedの場合もしくは開発環境以外の場合は入力画面に戻る
  if (!getUniqueId() && NODE_ENV !== 'development') {
    router.push(pathname.replace(/\/confirm$/, ''))
    return null
  }

  /**
   * フォームの送信
   * @param data
   * @returns {Promise<void>} - bodyの中身はReadableStreamで返却される
   */
  const onSubmit = async (data: inquiryDefaultValuesType) => {
    // 送信エラーフラグをリセット
    setIsSubmitError(false)

    // 送信データを作成
    const mergeObject = getInquiryObject(data)

    // cookie情報をキーと値で配列で取得
    const cookies = document.cookie.split('; ')
    // cookie情報をオブジェクトに変換
    const cookieObject: { [key: string]: string } = cookies.reduce((acc, cookie) => {
      const [key, value] = cookie.split('=')
      return { ...acc, [key]: value }
    }, {})

    // LocalStorageかSessionStorageにac_aspがあれば送信データに追加
    let acAsp: string | undefined = undefined
    if (localStorage.getItem('ac_asp')) {
      acAsp = localStorage.getItem('ac_asp') || undefined
    } else if (sessionStorage.getItem('ac_asp')) {
      acAsp = sessionStorage.getItem('ac_asp') || undefined
    }

    // WebInFlowに送信
    await fetch('/api/web-in-flow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formPath: 'form-inquiry',
        formName: '問合',
        formValues: data,
        mergeObject,
        clientID: cookieObject._ga || '',
        acAsp,
        searchParams: SearchParams.getValues(),
      }),
    })
      .then((res) => {
        // 正常に送信できた場合は完了画面に遷移
        if (res.ok) {
          // 現在のURLを元に前のページのURLを生成
          const nextPath = pathname.replace(/\/confirm$/, '/finish')
          router.push(nextPath)
          return
        }

        // エラーが発生した場合はエラーを投げる
        throw new Error('送信処理中にエラーが発生しました。')
      })
      .catch((err) => {
        console.error('Submit Error', err)
        setIsSubmitError(true)
      })
  }

  /**
   * 前のページに戻る
   */
  const onBack = () => {
    // 現在のフォームの値とコンテキストの値をマージしてコンテキストに保存
    setValues({ ...(getValues() as inquiryDefaultValuesType), ...useFormMethods.getValues() })

    // 現在のURLを元に前のページのURLを生成
    const backPath = pathname.replace(/\/confirm$/, '')
    router.push(backPath)
  }

  return (
    <>
      <FormProvider {...useFormMethods}>
        <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
          <HeadingLine tag="h2" className="mb-8 text-xl md:text-3xl">
            お客様情報の確認
          </HeadingLine>

          <div>
            <InquiryContents pageType="confirm" />
          </div>

          {/* バリデーションが通ってない場合にエラーメッセージを表示する */}
          {(!useFormMethods.formState.isValid || isSubmitError) && (
            <p className="break-japanese my-16 border-2 border-red py-4 text-center font-bold text-red">
              {!useFormMethods.formState.isValid && '送信に必要な情報が不足しています。'}
              {isSubmitError && '送信に失敗しました。'}
            </p>
          )}

          <div className="mt-16 flex flex-col items-center justify-center gap-5 md:flex-row">
            <div className="w-full max-w-md">
              <Button iconLeft="arrow" type="button" buttonStyle="outline" onClick={onBack}>
                <span className="text-lg md:py-2 md:text-2xl">内容を修正する</span>
              </Button>
            </div>
            <div className="w-full max-w-md">
              <Button
                iconRight="arrow"
                type="submit"
                disabled={useFormMethods.formState.isSubmitting || useFormMethods.formState.isSubmitSuccessful || !useFormMethods.formState.isValid}
                color={buttonColor}
              >
                <span className="text-lg md:py-2 md:text-2xl">{useFormMethods.formState.isSubmitting ? '送信中' : '内容を送信する'}</span>
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  )
}
