/**
 * お問い合わせフォームの完了画面
 */
import React from 'react'
import { Metadata } from 'next'
import { FormProgress } from '@/app/(form)/_components'
import { HeadingLine } from '@/components/elements'
import { Ssl } from '@/components/form/parts'
import { FormInquiryFinishClient } from './_components/FormInquiryFinishClient'
import { DOMAIN_PROD } from '@/config'

export const metadata: Metadata = {
  title: 'お問い合わせフォーム - お問い合わせ完了',
  alternates: {
    canonical: 'https://' + DOMAIN_PROD + '/form-inquiry/finish',
  },
}

const FormInquiryFinish = () => {
  return (
    <div className="container max-w-5xl pb-10 pt-5 md:pb-32 md:pt-14">
      <div className="mb-7 md:mb-16">
        <FormProgress />
      </div>

      <FormInquiryFinishClient />

      <div>
        <HeadingLine tag="h2" className="mb-8 text-xl md:text-3xl">
          お問い合わせ完了
        </HeadingLine>
        <p className="mb-8">
          お問い合わせいただきまして誠にありがとうございます。
          <br />
          お電話にて、専門スタッフがお客様に最適なサービスをご案内いたします。
        </p>
      </div>

      <div className="mb-40"></div>

      <div className="mt-7 md:mt-16">
        <Ssl />
      </div>
    </div>
  )
}

export default FormInquiryFinish
