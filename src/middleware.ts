/**
 * ミドルウェア設定
 */
import { NextRequest } from 'next/server'
import { basicAuth } from '@/features/middleware/basicAuth'

export const middleware = (req: NextRequest) => {
  // 複数のミドルウェア処理を使用する場合はthenで繋げる
  return basicAuth(req)
}
