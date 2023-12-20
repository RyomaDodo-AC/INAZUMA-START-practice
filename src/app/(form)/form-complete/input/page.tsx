/**
 * 完結フォームの個人情報入力画面
 */
import React from 'react'
import { Metadata } from 'next'
import { FormProgress } from '@/app/(form)/_components'
import { Ssl } from '@/components/form/parts'
import { FormCompleteInputClient } from './_components/FormCompleteInputClient'
import { DOMAIN_PROD } from '@/config'

export const metadata: Metadata = {
  title: 'お申込みフォーム - 個人情報の入力',
  alternates: {
    canonical: 'https://' + DOMAIN_PROD + '/form-complete/input',
  },
}

const FormComplete = () => {
  return (
    <div className="container max-w-5xl pb-10 pt-5 md:pb-32 md:pt-14">
      <div className="mb-7 md:mb-16">
        <FormProgress />
      </div>

      <FormCompleteInputClient />

      <div className="mt-7 md:mt-16">
        <Ssl />
      </div>
    </div>
  )
}

export default FormComplete
