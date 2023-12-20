/**
 * お問い合わせフォームの確認画面
 */
import React from 'react'
import { Metadata } from 'next'
import { FormProgress } from '@/app/(form)/_components'
import { Ssl } from '@/components/form/parts'
import { FormInquiryConfirmClient } from './_components/FormInquiryConfirmClient'
import { DOMAIN_PROD } from '@/config'

export const metadata: Metadata = {
  title: 'お問い合わせフォーム - 内容の確認',
  alternates: {
    canonical: 'https://' + DOMAIN_PROD + '/form-inquiry/confirm',
  },
}

const FormInquiryConfirm = () => {
  return (
    <div className="container max-w-5xl pb-10 pt-5 md:pb-32 md:pt-14">
      <div className="mb-7 md:mb-16">
        <FormProgress />
      </div>

      <FormInquiryConfirmClient />

      <div className="mt-7 md:mt-16">
        <Ssl />
      </div>
    </div>
  )
}

export default FormInquiryConfirm
