/**
 * microCMS SDKのクライアントを生成
 * @see https://github.com/microcmsio/microcms-js-sdk
 */
import { createClient } from 'microcms-js-sdk'
import { MICROCMS_API_KEY, MICROCMS_DOMAIN } from '@/config'

if (!MICROCMS_API_KEY) throw new Error('MICROCMS_API_KEY is not defined')
if (!MICROCMS_DOMAIN) throw new Error('MICROCMS_DOMAIN is not defined')

export const client = createClient({
  serviceDomain: MICROCMS_DOMAIN,
  apiKey: MICROCMS_API_KEY,
})
