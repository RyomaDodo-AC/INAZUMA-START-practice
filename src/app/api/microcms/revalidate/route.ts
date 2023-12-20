/**
 * 'micoCMS' タグのついたAPIのキャッシュを再検証する
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#on-demand-revalidation
 * @see https://nextjs.org/docs/app/building-your-application/caching#on-demand-revalidation
 * @see https://document.microcms.io/manual/webhook-setting#hd95625726f
 */
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { revalidateTag } from 'next/cache'
import crypto from 'crypto'
import { MICROCMS_REVALIDATE_KEY } from '@/config'

export const POST = async (request: NextRequest) => {
  const headersList = headers()

  // 環境変数のrivalidateキーがなければエラー
  if (!MICROCMS_REVALIDATE_KEY) {
    return NextResponse.json({ error: 'revalidate key is not defined' }, { status: 500 })
  }

  // X-MICROCMS-Signatureがなければエラー
  if (!headersList.has('X-MICROCMS-Signature')) {
    return NextResponse.json({ error: 'X-MICROCMS-Signature is not defined' }, { status: 500 })
  }

  // リクエストボディを取得
  const req = await request.json().catch(() => {
    return undefined
  })

  // リクエストボディがなければエラー
  if (!req) {
    return NextResponse.json({ error: 'request body is not defined' }, { status: 500 })
  }

  const requestBody = typeof req === 'object' ? JSON.stringify(req) : req.body

  // 環境変数のrivalidateキーをハッシュ化
  const expectedSignature = crypto.createHmac('sha256', MICROCMS_REVALIDATE_KEY).update(requestBody).digest('hex')
  const signature: string = headersList.get('X-MICROCMS-Signature') as string

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 500 })
  }

  // キャッシュを再検証する
  await revalidateTag('microCMS')

  return NextResponse.json({ message: 'revalidated success' }, { status: 200 })
}
