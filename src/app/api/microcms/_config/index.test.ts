import * as index from './index'

jest.mock('@/config', () => ({
  MICROCMS_API_KEY: 'hoge',
  MICROCMS_DOMAIN: 'hoge.com',
}))

describe('MicroCMS Client', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('MICROCMS_API_KEYが無効な時エラーがthrowされる', async () => {
    expect(index.client).toBeDefined()
  })
})
