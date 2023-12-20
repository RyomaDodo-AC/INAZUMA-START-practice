/**
 * 完結フォームのプラン選択画面
 */
import React from 'react'
import { Metadata } from 'next'
import { FormCompleteClient } from './_components/FormCompleteClient'
import { DOMAIN_PROD } from '@/config'

export const metadata: Metadata = {
  title: 'お申込みフォーム',
  alternates: {
    canonical: 'https://' + DOMAIN_PROD + '/form-complete',
  },
}

const FormComplete = () => {
  return (
    <div className="container flex max-w-5xl items-stretch justify-between">
      <FormCompleteClient />
    </div>
  )
}

export default FormComplete
