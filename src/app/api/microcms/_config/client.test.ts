describe('MicroCMS Client', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('MICROCMS_API_KEYが無効な時エラーがthrowされる', async () => {
    jest.mock('@/config', () => ({
      MICROCMS_API_KEY: undefined,
      MICROCMS_DOMAIN: undefined,
    }))
    await expect(import('./client')).rejects.toThrow('MICROCMS_API_KEY is not defined')
  })

  it('MICROCMS_DOMAINが無効な時エラーがthrowされる', async () => {
    jest.mock('@/config', () => ({
      MICROCMS_API_KEY: 'hoge',
      MICROCMS_DOMAIN: undefined,
    }))

    await expect(import('./client')).rejects.toThrow('MICROCMS_DOMAIN is not defined')
  })

  it('正常にclientが生成される', async () => {
    jest.mock('@/config', () => ({
      MICROCMS_API_KEY: 'hoge',
      MICROCMS_DOMAIN: 'hoge.com',
    }))

    const { client } = await import('./client')
    expect(client).toBeDefined()
  })
})
