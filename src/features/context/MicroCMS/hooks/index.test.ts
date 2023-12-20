import * as index from './index'

describe('index', () => {
  it('useMicroCMSPlans関数が存在する', () => {
    expect(index.useMicroCMSPlans).toBeTruthy()
  })

  it('useMicroCMSTerminals関数が存在する', () => {
    expect(index.useMicroCMSTerminals).toBeTruthy()
  })

  it('useMicroCMSAccessories関数が存在する', () => {
    expect(index.useMicroCMSAccessories).toBeTruthy()
  })

  it('useMicroCMSGuarantees関数が存在する', () => {
    expect(index.useMicroCMSGuarantees).toBeTruthy()
  })

  it('useMicroCMSOptions関数が存在する', () => {
    expect(index.useMicroCMSOptions).toBeTruthy()
  })

  it('useMicroCMSOthers関数が存在する', () => {
    expect(index.useMicroCMSOthers).toBeTruthy()
  })
})
