/**
 * @jest-environment node
 */
import { GET } from './route'
import { NextResponse, NextRequest } from 'next/server'
import { getMicroCMSMasters } from '../../_features/getMicroCMSMasters'

jest.mock('@/config', () => ({
  MICROCMS_API_KEY: 'hoge',
  MICROCMS_DOMAIN: 'hoge.com',
}))

// getMicroCMSMastersをモックする
jest.mock('../../_features/getMicroCMSMasters', () => ({
  getMicroCMSMasters: jest.fn(),
}))

describe('GET', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('正常に取得できる', async () => {
    // getMicroCMSMastersをresolveでモックする
    const res = {
      contents: [
        {
          id: 'test',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          publishedAt: '2022-01-01T00:00:00.000Z',
          revisedAt: '2022-01-01T00:00:00.000Z',
          test: 'test',
        },
      ],
      totalCount: 1,
      offset: 0,
      limit: 1,
    }
    ;(getMicroCMSMasters as jest.Mock).mockResolvedValue(res)

    // リクエストをモックする
    const request = new NextRequest(new Request('https://hoge.com/', { method: 'GET' }))

    const response = await GET(request as Request)
    expect(response.status).toBe(200)

    const result = await response.json()
    expect(result).toEqual(res)
  })

  it('エラーが発生した場合は500エラーが返る', async () => {
    // getMicroCMSMastersをrejectでモックする
    ;(getMicroCMSMasters as jest.Mock).mockRejectedValue(new Error('error'))

    // リクエストをモックする
    const request = new NextRequest(new Request('https://hoge.com/', { method: 'GET' }))

    const response = await GET(request as Request)
    expect(response.status).toBe(500)

    const { error } = await response.json()
    expect(error).toBe('error')
  })
})
