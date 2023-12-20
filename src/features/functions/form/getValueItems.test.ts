import { getValueItems, Items } from './getValueItems'

describe('getValueItems関数', () => {
  it('空の配列が渡された場合、空の配列を返す', () => {
    const result = getValueItems([])
    expect(result).toEqual([])
  })

  it('入力値の配列が渡された場合、正しい値を持つオブジェクトを返す', () => {
    const inputValues: Items = [
      { name: 'name', value: 'John Doe' },
      { name: 'email', value: 'johndoe@example.com' },
      { name: 'age', value: '30' },
    ]

    const result = getValueItems(inputValues)
    expect(result).toEqual(['John Doe', 'johndoe@example.com', '30'])
  })
})
