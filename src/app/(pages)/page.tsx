'use client'

import { HeadingLine } from '@/components/elements'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="container py-14">
        <HeadingLine className="mb-8">
          <span className="text-2xl">リンク集</span>
        </HeadingLine>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <Link className="text-blue underline hover:no-underline" href="/form-entry">
              お申込フォーム（iframe）
            </Link>
          </li>
          <li>
            <Link className="text-blue underline hover:no-underline" href="/form-inquiry">
              お問い合わせフォーム（基本形）
            </Link>
          </li>
          <li>
            <Link className="text-blue underline hover:no-underline" href="/form-complete">
              完結フォーム（microCMS × Stripe）
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
