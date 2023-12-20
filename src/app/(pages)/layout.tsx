/**
 * 通常ページ類のレイアウト
 */
import React from 'react'
import { Footer } from '@/components/parts'
import { PageHeader } from './_components'

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PageHeader />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}

export default PageLayout
