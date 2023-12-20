/**
 * お問い合わせフォームのレイアウト
 */
'use client'
import { CommonFormContextProvider } from '@/app/(form)/_config/context'
import { inquiryDefaultValues } from './_config'

const FormInquiryLayout = ({ children }: { children: React.ReactNode }) => {
  return <CommonFormContextProvider defaultValues={inquiryDefaultValues}>{children}</CommonFormContextProvider>
}

export default FormInquiryLayout
