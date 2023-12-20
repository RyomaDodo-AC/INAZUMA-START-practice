import { getTerminalDetail } from './getTerminalDetail'
import { microCMSTerminalsType } from '../../types'

describe('getTerminalDetail', () => {
  it('指定したIDの端末の詳細情報を取得できる', async () => {
    // テスト用の端末情報を定義
    const obj = {
      terminals: [
        {
          colorName: 'black',
          recurring: ['一括払い'],
          stripePrices: {
            prices_id_dev: '12345',
            prices_id_prod: '12345',
          },
        },
        {
          colorName: 'white',
          recurring: ['一括払い'],
          stripePrices: {
            prices_id_dev: '11111',
            prices_id_prod: '11111',
          },
        },
      ],
    }

    // getTerminalDetail関数を実行
    const resultBlack = await getTerminalDetail({ obj: obj as microCMSTerminalsType, color: 'black', recurring: '一括払い' })

    // 取得した結果が期待通りであることを確認
    expect(resultBlack).toEqual({
      colorName: 'black',
      recurring: ['一括払い'],
      stripePrices: {
        prices_id_dev: '12345',
        prices_id_prod: '12345',
      },
    })

    // getTerminalDetail関数を実行
    const resultWhite = await getTerminalDetail({ obj: obj as microCMSTerminalsType, color: 'white', recurring: '一括払い' })

    // 取得した結果が期待通りであることを確認
    expect(resultWhite).toEqual({
      colorName: 'white',
      recurring: ['一括払い'],
      stripePrices: {
        prices_id_dev: '11111',
        prices_id_prod: '11111',
      },
    })
  })

  it('端末情報がない場合、undefinedを返す', async () => {
    // テスト用の端末情報を定義
    const obj = {
      terminals: [{}],
    }

    // getTerminalDetail関数を実行
    const result = await getTerminalDetail({ obj: obj as microCMSTerminalsType, color: 'black', recurring: '一括払い' })

    // 取得した結果が期待通りであることを確認
    expect(result).toBeUndefined()
  })

  it('端末の色がない場合、undefinedを返す', async () => {
    // テスト用の端末情報を定義
    const obj = {
      terminals: [
        {
          colorName: 'black',
          recurring: ['一括払い'],
          stripePrices: {
            prices_id_dev: '12345',
            prices_id_prod: '12345',
          },
        },
      ],
    }

    // getTerminalDetail関数を実行
    const result = await getTerminalDetail({ obj: obj as microCMSTerminalsType, color: '', recurring: '一括払い' })

    // 取得した結果が期待通りであることを確認
    expect(result).toBeUndefined()
  })

  it('recurringが空の場合、undefinedを返す', async () => {
    // テスト用の端末情報を定義
    const obj = {
      terminals: [
        {
          colorName: 'black',
          recurring: ['一括払い'],
          stripePrices: {
            prices_id_dev: '12345',
            prices_id_prod: '12345',
          },
        },
      ],
    }

    // getTerminalDetail関数を実行
    const result = await getTerminalDetail({ obj: obj as microCMSTerminalsType, color: 'black', recurring: '' })

    // 取得した結果が期待通りであることを確認
    expect(result).toBeUndefined()
  })
})
