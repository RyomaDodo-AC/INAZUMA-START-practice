import { getTerminalColors } from './getTerminalColors'
import { microCMSTerminalsType } from '../../types'

describe('getTerminalColors関数', () => {
  it('指定したIDの端末の色情報を取得できる', async () => {
    const obj = {
      terminals: [
        {
          colorName: 'black',
          colorCode: '#000000',
        },
        {
          colorName: 'white',
          colorCode: '#ffffff',
        },
      ],
    }

    const expected = [
      {
        colorName: obj.terminals[0].colorName,
        colorCode: obj.terminals[0].colorCode,
      },
      {
        colorName: obj.terminals[1].colorName,
        colorCode: obj.terminals[1].colorCode,
      },
    ]

    const actual = await getTerminalColors(obj as microCMSTerminalsType)
    expect(actual).toEqual(expected)
  })

  it('端末情報がない場合、空の配列を返す', async () => {
    const obj = {
      terminals: [{}],
    }

    const actual = await getTerminalColors(obj as microCMSTerminalsType)
    expect(actual).toEqual([])
  })

  it('端末の色がない場合、空の配列を返す', async () => {
    const obj = {
      terminals: [
        {
          colorName: 'black',
        },
      ],
    }

    const actual = await getTerminalColors(obj as microCMSTerminalsType)
    expect(actual).toEqual([])
  })

  it('端末の色コードがない場合、空の配列を返す', async () => {
    const obj = {
      terminals: [
        {
          colorCode: '#000000',
        },
      ],
    }

    const actual = await getTerminalColors(obj as microCMSTerminalsType)
    expect(actual).toEqual([])
  })

  it('重複する色名・色コードがある場合、重複した色情報を取得しない', async () => {
    const obj = {
      terminals: [
        {
          colorName: 'black',
          colorCode: '#000000',
        },
        {
          colorName: 'white',
          colorCode: '#ffffff',
        },
        {
          colorName: 'white',
          colorCode: '#ffffff',
        },
      ],
    }

    const expected = [
      {
        colorName: obj.terminals[0].colorName,
        colorCode: obj.terminals[0].colorCode,
      },
      {
        colorName: obj.terminals[1].colorName,
        colorCode: obj.terminals[1].colorCode,
      },
    ]

    const actual = await getTerminalColors(obj as microCMSTerminalsType)
    expect(actual).toEqual(expected)
  })
})
