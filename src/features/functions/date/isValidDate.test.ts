import { isValidDate } from './isValidDate'

describe('isValidDate関数', () => {
  it('有効な日付を渡した場合、trueを返すこと', () => {
    const date = '2022-01-01'
    expect(isValidDate(date)).toBe(true)
  })

  it('無効な日付を渡した場合、falseを返すこと', () => {
    // うるう年ではないので、2月29日は無効な日付
    const date = '2001-02-29'
    expect(isValidDate(date)).toBe(false)
  })

  it('Invalid Dateになる文字列を渡した場合、falseを返すこと', () => {
    // Invalid Dateになる文字列
    const date = 'Invalid Date'
    expect(isValidDate(date)).toBe(false)
  })
})
