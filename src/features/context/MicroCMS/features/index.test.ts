import * as index from './index'

describe('index', () => {
  it('getPriceId関数が存在する', () => {
    expect(index.getPriceId).toBeTruthy()
  })

  it('getProductId関数が存在する', () => {
    expect(index.getProductId).toBeTruthy()
  })
})
