/**
 * @jest-environment node
 */
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { he } from 'date-fns/locale'

describe('POST', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('環境変数のrivalidateキーがなければエラーが返る', async () => {
    // リクエストをモックする
    const request: NextRequest = new NextRequest('https://hoge.com/', {
      method: 'POST',
      headers: {
        'X-MICROCMS-Signature': 'hoge',
      },
      body: JSON.stringify({
        endpoint: 'test',
      }),
    })

    // MICROCMS_REVALIDATE_KEYをモックする
    jest.mock('@/config', () => ({
      MICROCMS_REVALIDATE_KEY: undefined,
    }))

    // headersをモックする
    jest.mock('next/headers', () => ({
      headers: jest.fn(() => ({
        has: jest.fn(),
        get: jest.fn(),
      })),
    }))

    const { POST } = await import('./route')

    const response = await POST(request)
    expect(response.status).toBe(500)

    const result = await response.json()
    expect(result).toEqual({ error: 'revalidate key is not defined' })
  })

  it('X-MICROCMS-Signatureがなければエラーが返る', async () => {
    // リクエストをモックする
    const request: NextRequest = new NextRequest('https://hoge.com/', {
      method: 'POST',
      headers: {},
      body: JSON.stringify({
        endpoint: 'test',
      }),
    })

    // MICROCMS_REVALIDATE_KEYをモックする
    jest.mock('@/config', () => ({
      MICROCMS_REVALIDATE_KEY: 'test',
    }))

    // headersをモックする
    jest.mock('next/headers', () => ({
      headers: jest.fn(() => ({
        has: jest.fn().mockReturnValue(false),
        get: jest.fn(),
      })),
    }))

    const { POST } = await import('./route')

    const response = await POST(request)
    expect(response.status).toBe(500)

    const result = await response.json()
    expect(result).toEqual({ error: 'X-MICROCMS-Signature is not defined' })
  })

  it('リクエストボディがなければエラーが返る', async () => {
    // リクエストをモックする
    const request: NextRequest = new NextRequest('https://hoge.com/', {
      method: 'POST',
      headers: {
        'X-MICROCMS-Signature': 'hoge',
      },
      body: undefined,
    })

    // MICROCMS_REVALIDATE_KEYをモックする
    jest.mock('@/config', () => ({
      MICROCMS_REVALIDATE_KEY: 'test',
    }))

    // headersをモックする
    jest.mock('next/headers', () => ({
      headers: jest.fn(() => ({
        has: jest.fn().mockReturnValue(true),
        get: jest.fn(),
      })),
    }))

    const { POST } = await import('./route')

    const response = await POST(request)
    expect(response.status).toBe(500)

    const result = await response.json()
    expect(result).toEqual({ error: 'request body is not defined' })
  })

  it('リクエストボディがオブジェクトでなければエラーが返る', async () => {
    // リクエストをモックする
    const request: NextRequest = new NextRequest('https://hoge.com/', {
      method: 'POST',
      headers: {
        'X-MICROCMS-Signature': 'hoge',
      },
      body: 'test',
    })

    // MICROCMS_REVALIDATE_KEYをモックする
    jest.mock('@/config', () => ({
      MICROCMS_REVALIDATE_KEY: 'test',
    }))

    // headersをモックする
    jest.mock('next/headers', () => ({
      headers: jest.fn(() => ({
        has: jest.fn().mockReturnValue(true),
        get: jest.fn(),
      })),
    }))

    const { POST } = await import('./route')

    const response = await POST(request)
    expect(response.status).toBe(500)

    const result = await response.json()
    expect(result).toEqual({ error: 'request body is not defined' })
  })

  it('正常にキャッシュが再検証される', async () => {
    // リクエストをモックする
    const request: NextRequest = new NextRequest('https://hoge.com/', {
      method: 'POST',
      headers: {
        'X-MICROCMS-Signature': 'd2a9c020d0b33c2bc094a8208e07b1b2756f10f6264eb7b3f26b2ba360231333',
      },
      body: JSON.stringify({
        endpoint: 'test',
      }),
    })

    // MICROCMS_REVALIDATE_KEYをモックする
    jest.mock('@/config', () => ({
      MICROCMS_REVALIDATE_KEY: 'test',
    }))

    // headersをモックする
    jest.mock('next/headers', () => ({
      headers: jest.fn(() => ({
        has: jest.fn().mockReturnValue(true),
        get: jest.fn().mockReturnValue('d2a9c020d0b33c2bc094a8208e07b1b2756f10f6264eb7b3f26b2ba360231333'),
      })),
    }))

    // revalidateTagをモックする
    jest.mock('next/cache', () => ({
      revalidateTag: jest.fn(),
    }))

    const { POST } = await import('./route')

    const response = await POST(request)
    expect(response.status).toBe(200)

    const result = await response.json()
    expect(result).toEqual({ message: 'revalidated success' })
  })

  it('シグネチャーが不正な場合エラーが返る', async () => {
    // リクエストをモックする
    const request: NextRequest = new NextRequest('https://hoge.com/', {
      method: 'POST',
      headers: {
        'X-MICROCMS-Signature': 'd2a9c020d0b33c2bc094a8208e07b1b2756f10f6264eb7b3f26b2ba360231333',
      },
      body: JSON.stringify({
        endpoint: 'test',
      }),
    })

    // MICROCMS_REVALIDATE_KEYをモックする
    jest.mock('@/config', () => ({
      MICROCMS_REVALIDATE_KEY: 'hoge',
    }))

    // headersをモックする
    jest.mock('next/headers', () => ({
      headers: jest.fn(() => ({
        has: jest.fn().mockReturnValue(true),
        get: jest.fn().mockReturnValue('d2a9c020d0b33c2bc094a8208e07b1b2756f10f6264eb7b3f26b2ba360231333'),
      })),
    }))

    const { POST } = await import('./route')

    const response = await POST(request)
    expect(response.status).toBe(500)

    const result = await response.json()
    expect(result).toEqual({ error: 'invalid signature' })
  })
})
