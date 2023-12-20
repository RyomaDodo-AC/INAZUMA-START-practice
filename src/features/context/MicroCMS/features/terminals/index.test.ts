import * as index from './index'

describe('index', () => {
  it('getTerminalColors関数が存在する', () => {
    expect(index.getTerminalColors).toBeTruthy()
  })

  it('getTerminalRecurring関数が存在する', () => {
    expect(index.getTerminalRecurring).toBeTruthy()
  })

  it('getTerminalAccessories関数が存在する', () => {
    expect(index.getTerminalAccessories).toBeTruthy()
  })

  it('getTerminalDetail関数が存在する', () => {
    expect(index.getTerminalDetail).toBeTruthy()
  })
})
