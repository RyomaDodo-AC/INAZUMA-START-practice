import * as index from './index'

describe('index', () => {
  it('useMicroCMSContext関数が存在する', () => {
    expect(index.useMicroCMSContext).toBeTruthy()
  })

  it('MicroCMSContextProvider関数が存在する', () => {
    expect(index.MicroCMSContextProvider).toBeTruthy()
  })
})
