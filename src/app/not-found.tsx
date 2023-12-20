/**
 * 404ページ
 */
import React from 'react'
import { Footer } from '@/components/parts'
import { PageHeader } from '@/app/(pages)/_components'
import { HeadingLine } from '@/components/elements'

export const NotFoundLayout = () => {
  return (
    <>
      <PageHeader />
      <main id="main">
        <div className="container py-14">
          <HeadingLine className="mb-8">
            <span className="text-2xl">404 NotFound</span>
          </HeadingLine>

          <div>
            <p>
              リクエストされたページは見つかりませんでした。
              <br />
              お探しのページは削除されたか、
              <br />
              URLが変更された可能性があります。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default NotFoundLayout
