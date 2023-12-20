import { getPriceId } from './getPriceId'
import { microCMSPricesType } from '../types'

describe('getPriceId', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('DEPLOY_ENVがprodの場合、prices_id_prodを返す', () => {
    jest.mock('@/config', () => ({
      DEPLOY_ENV: 'prod',
    }))

    const getPriceId = require('./getPriceId').getPriceId
    const price = {
      prices_id_dev: 'dev_12345',
      prices_id_prod: 'prod_12345',
    }
    const priceId = getPriceId(price as microCMSPricesType)
    expect(priceId).toBe('prod_12345')
  })

  it('DEPLOY_ENVがprod以外の場合、prices_id_devを返す', () => {
    jest.mock('@/config', () => ({
      DEPLOY_ENV: 'dev',
    }))

    const getPriceId = require('./getPriceId').getPriceId
    const price = {
      prices_id_dev: 'dev_12345',
      prices_id_prod: 'prod_12345',
    }
    const priceId = getPriceId(price as microCMSPricesType)
    expect(priceId).toBe('dev_12345')
  })

  it('引数がundefinedの場合、undefinedを返す', () => {
    const result = getPriceId(undefined)
    expect(result).toBeUndefined()
  })
})
