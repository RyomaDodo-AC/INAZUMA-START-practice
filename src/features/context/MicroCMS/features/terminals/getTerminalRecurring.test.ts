import { getTerminalRecurring } from './getTerminalRecurring'
import { microCMSTerminalsType } from '../../types'

describe('getTerminalRecurring関数', () => {
  it('正しい端末代金情報を取得できる', async () => {
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

    const expectedBlack = [
      {
        recurring: obj.terminals[0].recurring,
        stripePricesId: '12345',
      },
    ]
    const expectedWhite = [
      {
        recurring: obj.terminals[1].recurring,
        stripePricesId: '11111',
      },
    ]

    const actualBlack = await getTerminalRecurring({ obj: obj as microCMSTerminalsType, color: 'black' })
    expect(actualBlack).toEqual(expectedBlack)

    const actualWhite = await getTerminalRecurring({ obj: obj as microCMSTerminalsType, color: 'white' })
    expect(actualWhite).toEqual(expectedWhite)
  })

  it('端末情報がない場合、空の配列を返す', async () => {
    const obj = {
      terminals: [{}],
    }

    const actual = await getTerminalRecurring({ obj: obj as microCMSTerminalsType, color: 'black' })
    expect(actual).toEqual([])
  })

  it('端末の色がない場合、空の配列を返す', async () => {
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

    const actual = await getTerminalRecurring({ obj: obj as microCMSTerminalsType, color: '' })
    expect(actual).toEqual([])
  })

  it('端末の色が一致しない場合、空の配列を返す', async () => {
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

    const actual = await getTerminalRecurring({ obj: obj as microCMSTerminalsType, color: 'white' })
    expect(actual).toEqual([])
  })
})
