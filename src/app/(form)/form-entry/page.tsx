/**
 * 申込フォームの入力ページ
 */
import React from 'react'
import { Metadata } from 'next'
import { HeadingRuby } from '@/components/elements'
import { FormEntryClient } from './_components/FormEntryClient'
import { DOMAIN_PROD } from '@/config'

export const metadata: Metadata = {
  title: 'お申込みフォーム',
  alternates: {
    canonical: 'https://' + DOMAIN_PROD + '/form-entry',
  },
}

const FormEntry = () => {
  return (
    <div className="container max-w-5xl pb-10 pt-5 md:pb-32 md:pt-14">
      <HeadingRuby className="mb-11 text-center" ruby="form-entry">
        お申込フォーム
      </HeadingRuby>

      <FormEntryClient />
    </div>
  )
}

export default FormEntry
