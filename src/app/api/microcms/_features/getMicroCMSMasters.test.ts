import { getMicroCMSMasters } from './getMicroCMSMasters'
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

describe('getMicroCMSMasters関数', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('endpointが無い場合エラーが返る', async () => {
    await expect(getMicroCMSMasters({ endpoint: '' })).rejects.toThrow('endpoint is not defined')
  })

  it('正常にマスタが取得できる', async () => {
    const endpoint = 'test'
    const response = {
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
    client.getList = jest.fn().mockResolvedValue(response)

    // getMicroCMSMastersを実行
    const result = await getMicroCMSMasters({ endpoint: endpoint })

    // 結果を検証
    expect(result).toEqual(response)
  })

  it('正常にマスタが取得できる（複数ページ）', async () => {
    const endpoint = 'test'
    const response1 = {
      contents: [
        {
          id: 'test1',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          publishedAt: '2022-01-01T00:00:00.000Z',
          revisedAt: '2022-01-01T00:00:00.000Z',
          test: 'test1',
        },
      ],
      totalCount: 2,
      offset: 0,
      limit: 1,
    }
    const response2 = {
      contents: [
        {
          id: 'test2',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          publishedAt: '2022-01-01T00:00:00.000Z',
          revisedAt: '2022-01-01T00:00:00.000Z',
          test: 'test2',
        },
      ],
      totalCount: 2,
      offset: 1,
      limit: 1,
    }

    // client.getListをモック化
    client.getList = jest.fn().mockResolvedValueOnce(response1).mockResolvedValueOnce(response2)

    // getMicroCMSMastersを実行
    const result = await getMicroCMSMasters({ endpoint: endpoint })

    // 結果を検証
    expect(result).toEqual({
      contents: [
        {
          id: 'test1',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          publishedAt: '2022-01-01T00:00:00.000Z',
          revisedAt: '2022-01-01T00:00:00.000Z',
          test: 'test1',
        },
        {
          id: 'test2',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          publishedAt: '2022-01-01T00:00:00.000Z',
          revisedAt: '2022-01-01T00:00:00.000Z',
          test: 'test2',
        },
      ],
      totalCount: 2,
      offset: 1,
      limit: 1,
    })
  })
})
