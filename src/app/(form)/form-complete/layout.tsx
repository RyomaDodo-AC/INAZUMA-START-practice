/**
 * 完結フォームのレイアウト
 */
'use client'
import { completeDefaultValues } from './_config'
import { StripeContextProvider, MicroCMSContextProvider } from '@/features/context'
import { CommonFormContextProvider } from '@/app/(form)/_config/context'

const FormCompleteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MicroCMSContextProvider>
      <StripeContextProvider>
        <CommonFormContextProvider defaultValues={completeDefaultValues}>{children}</CommonFormContextProvider>
      </StripeContextProvider>
    </MicroCMSContextProvider>
  )
}

export default FormCompleteLayout
