/**
 * microCMSからマスタを取得する
 * @param {string} endpoint - microCMSのエンドポイント
 * @param {number} offset - 取得開始位置
 * @param {number} limit - 取得件数
 * @param {MicroCMS.MicroCMSListResponse<microCMSApiSchema> | {}} obj - 取得結果
 * @return {Promise<MicroCMS.MicroCMSListResponse<microCMSApiSchema> | {}>} - 取得結果
 */
import { client } from '../_config'
import type MicroCMS from 'microcms-js-sdk'
import deepmerge from 'deepmerge'
import type { microCMSApiSchema } from '@/features/context/MicroCMS/types'

export const getMicroCMSMasters = async (
  { endpoint, offset = 0, limit = 100 }: { endpoint: string; offset?: number; limit?: number },
  obj: MicroCMS.MicroCMSListResponse<microCMSApiSchema> | {} = {},
): Promise<MicroCMS.MicroCMSListResponse<microCMSApiSchema> | {}> => {
  // endpointがなければエラー
  if (!endpoint) {
    throw new Error('endpoint is not defined')
  }

  // microCMSマスタの一覧を取得する
  const res = await client
    .getList({
      endpoint: endpoint,
      queries: { limit: limit, offset: offset },
      // customRequestInit: { next: { revalidate: 3600 } },
      customRequestInit: { next: { tags: ['microCMS'] } },
    })
    .then(async (res) => {
      const result: MicroCMS.MicroCMSListResponse<microCMSApiSchema> = await res
      obj = deepmerge(obj, result)

      // 次のページがある場合は再帰処理
      const count = result.offset + result.limit
      if (count < result.totalCount) {
        return await getMicroCMSMasters({ endpoint: endpoint, offset: count, limit: limit }, obj)
      }
      return obj
    })

  return res
}
