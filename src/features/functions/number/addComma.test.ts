import { addComma } from './addComma'

describe('addComma', () => {
  it('数値にカンマを追加', () => {
    expect(addComma(1000)).toBe('1,000')
    expect(addComma(123456789)).toBe('123,456,789')
    expect(addComma(1234.5678)).toBe('1,234.5678')
    expect(addComma(-1234.5678)).toBe('-1,234.5678')
  })

  it('無効な入力の場合、NaNが返る', () => {
    expect(addComma(NaN)).toBe('NaN')
    // expect(addComma(undefined)).toBe('NaN')
    // expect(addComma(null)).toBe('NaN')
    // expect(addComma('abc')).toBe('NaN')
  })
})
