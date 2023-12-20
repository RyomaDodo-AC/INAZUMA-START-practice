/**
 * お問い合わせフォームの入力画面
 */
import React from 'react'
import { Metadata } from 'next'
import { FormProgress } from '@/app/(form)/_components'
import { Ssl } from '@/components/form/parts'
import { FormInquiryClient } from './_components/FormInquiryClient'
import { DOMAIN_PROD } from '@/config'

export const metadata: Metadata = {
  title: 'お問い合わせフォーム',
  alternates: {
    canonical: 'https://' + DOMAIN_PROD + '/form-inquiry',
  },
}

const FormInquiry = () => {
  return (
    <div className="container max-w-5xl pb-10 pt-5 md:pb-32 md:pt-14">
      <div className="mb-7 md:mb-16">
        <FormProgress />
      </div>

      <FormInquiryClient />

      <div className="mt-7 md:mt-16">
        <Ssl />
      </div>
    </div>
  )
}

export default FormInquiry
