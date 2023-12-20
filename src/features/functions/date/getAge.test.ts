import { getAge } from './getAge'

// 誕生日
const birthdate = '2000-06-01'

describe('getAge関数', () => {
  it('正しい年齢を返すこと', () => {
    // モックの現在の日付を設定
    const mockDate = new Date('2020-06-01')
    jest.useFakeTimers()
    jest.setSystemTime(mockDate)

    const age = getAge(birthdate)
    expect(age).toBe('20')

    // モックを解除
    jest.useRealTimers()
  })

  it('誕生日がまだ来ていなければageを1減らすこと', () => {
    // モックの現在の日付を設定
    const mockDate = new Date('2020-05-31')
    jest.useFakeTimers()
    jest.setSystemTime(mockDate)

    const age = getAge(birthdate)
    expect(age).toBe('19')

    // モックを解除
    jest.useRealTimers()
  })

  it('無効な日付の場合は空文字を返すこと', () => {
    // うるう年ではないので、2月29日は無効な日付
    const age = getAge('2001-02-29')
    expect(age).toBe('')
  })
})
