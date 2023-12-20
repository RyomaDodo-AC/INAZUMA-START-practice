import { getTerminalAccessories } from './getTerminalAccessories'
import { microCMSTerminalsType } from '../../types'

describe('getTerminalAccessories関数', () => {
  it('正しい端末の付属品情報を取得できる', async () => {
    const obj = {
      accessories: [
        {
          id: '12345',
        },
        {
          id: '11111',
        },
      ],
    }

    const expected = ['12345', '11111']

    const actual = await getTerminalAccessories(obj as microCMSTerminalsType)
    expect(actual).toEqual(expected)
  })

  it('端末情報がない場合、空の配列を返す', async () => {
    const obj = {
      accessories: [{}],
    }

    const actual = await getTerminalAccessories(obj as microCMSTerminalsType)
    expect(actual).toEqual([])
  })

  it('端末の付属品IDがない場合、空の配列を返す', async () => {
    const obj = {
      accessories: [
        {
          name: '付属品',
        },
      ],
    }

    const actual = await getTerminalAccessories(obj as microCMSTerminalsType)
    expect(actual).toEqual([])
  })

  it('端末の付属品IDが重複する場合、重複した付属品IDを除いて返す', async () => {
    const obj = {
      accessories: [
        {
          id: '12345',
        },
        {
          id: '12345',
        },
      ],
    }

    const expected = ['12345']

    const actual = await getTerminalAccessories(obj as microCMSTerminalsType)
    expect(actual).toEqual(expected)
  })
})
