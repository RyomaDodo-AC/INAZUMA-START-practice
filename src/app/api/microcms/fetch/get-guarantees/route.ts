/**
 * プラン一覧取得APIのルーティング
 */
import { NextResponse } from 'next/server'
import { getMicroCMSMasters } from '../../_features/getMicroCMSMasters'

export const GET = async (request: Request) => {
  // microCMSのマスターを取得して返す
  return await getMicroCMSMasters({ endpoint: 'guarantees' })
    .then((list) => {
      return NextResponse.json(list, { status: 200 })
    })
    .catch((error) => {
      return NextResponse.json({ error: error.message }, { status: 500 })
    })
}
