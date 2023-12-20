import { getAddress, zipcloudType } from './getAddress'

describe('getAddress関数のテスト', () => {
  it('郵便番号が正しく入力された場合、住所が取得できること', async () => {
    const zipCode = '1000001'
    const expectedAddress: zipcloudType = {
      message: null,
      results: [
        {
          address1: '東京都',
          address2: '千代田区',
          address3: '千代田',
          kana1: 'トウキョウト',
          kana2: 'チヨダク',
          kana3: 'チヨダ',
          prefcode: '13',
          zipcode: '1000001',
        },
      ],
      status: 200,
    }

    // fetchをモック化する
    const mockFetch = jest.fn()
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve(expectedAddress),
    })
    global.fetch = mockFetch

    const result = await getAddress(zipCode)
    expect(result).toEqual(expectedAddress)

    // モックを解除する
    mockFetch.mockRestore()
  })

  it('存在しない郵便番号が入力された場合、エラーが返されること', async () => {
    const zipCode = '0000000'
    const expectedAddress: zipcloudType = {
      message: '郵便番号が見つかりませんでした',
      results: null,
      status: 400,
    }

    // fetchをモック化する
    const mockFetch = jest.fn()
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve(expectedAddress),
    })
    global.fetch = mockFetch

    // エラーが返されることを確認する
    await expect(getAddress(zipCode)).rejects.toThrow('住所が見つかりませんでした')

    // モックを解除する
    mockFetch.mockRestore()
  })

  it('郵便番号が不正な形式の場合、エラーが返されること', async () => {
    const zipCode = '0000-000'

    // エラーが返されることを確認する
    await expect(getAddress(zipCode)).rejects.toThrow('郵便番号が不正な形式です')
  })
})
