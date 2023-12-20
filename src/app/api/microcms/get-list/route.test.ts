/**
 * @jest-environment node
 */
import { POST } from './route'
import { NextResponse, NextRequest } from 'next/server'
import { client } from '../_config'

jest.mock('@/config', () => ({
  MICROCMS_API_KEY: 'hoge',
  MICROCMS_DOMAIN: 'hoge.com',
}))

jest.mock('../_config', () => ({
  client: {
    getList: jest.fn(),
  },
}))

describe('POST', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('リクエストボディがなければエラーが返る', async () => {
    // リクエストをモックする
    const request = new Request('https://hoge.com/', {
      method: 'POST',
    })

    const response = await POST(request)
    expect(response.status).toBe(500)

    const result = await response.json()
    expect(result).toEqual({ error: 'request body is not defined' })
  })

  it('endpointが無い場合エラーが返る', async () => {
    // リクエストをモックする
    const request = new Request('https://hoge.com/', {
      method: 'POST',
      body: JSON.stringify({
        endpoint: undefined,
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(500)

    const result = await response.json()
    expect(result).toEqual({ error: 'endpoint is not defined' })
  })

  it('正常に取得できる', async () => {
    // リクエストをモックする
    const request = new Request('https://hoge.com/', {
      method: 'POST',
      body: JSON.stringify({
        endpoint: 'test',
      }),
    })

    const obj = {
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

    // client.getListをモック化
    client.getList = jest.fn().mockResolvedValue(obj)

    const response = await POST(request)
    expect(response.status).toBe(200)

    const result = await response.json()
    expect(result).toEqual(obj)
  })

  it('エラーが発生した場合は500エラーが返る', async () => {
    // リクエストをモックする
    const request = new Request('https://hoge.com/', {
      method: 'POST',
      body: JSON.stringify({
        endpoint: 'test',
      }),
    })

    // client.getListをモック化
    client.getList = jest.fn().mockRejectedValue(new Error('error'))

    const response = await POST(request)
    expect(response.status).toBe(500)

    const { error } = await response.json()
    expect(error).toBe('error')
  })
})
