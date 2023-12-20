import Link from 'next/link'
import { Metadata } from 'next'
import { DOMAIN_PROD } from '@/config'

export const metadata: Metadata = {
  title: 'hoge',
  alternates: {
    canonical: 'https://' + DOMAIN_PROD + '/hoge',
  },
}

export default function Hoge() {
  return (
    <>
      <Link href="/">toppage</Link>
    </>
  )
}
