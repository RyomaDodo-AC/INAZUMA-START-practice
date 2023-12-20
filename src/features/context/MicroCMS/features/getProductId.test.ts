import { getProductId } from './getProductId'
import { microCMSProductsType } from '../types'

describe('getProductId', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('DEPLOY_ENVがprodの場合、products_id_prodを返す', () => {
    jest.mock('@/config', () => ({
      DEPLOY_ENV: 'prod',
    }))

    const getProductId = require('./getProductId').getProductId
    const product = {
      products_id_dev: 'dev_12345',
      products_id_prod: 'prod_12345',
    }
    const productId = getProductId(product as microCMSProductsType)
    expect(productId).toBe('prod_12345')
  })

  it('DEPLOY_ENVがprod以外の場合、products_id_devを返す', () => {
    jest.mock('@/config', () => ({
      DEPLOY_ENV: 'dev',
    }))

    const getProductId = require('./getProductId').getProductId
    const product = {
      products_id_dev: 'dev_12345',
      products_id_prod: 'prod_12345',
    }
    const productId = getProductId(product as microCMSProductsType)
    expect(productId).toBe('dev_12345')
  })

  it('引数がundefinedの場合、undefinedを返す', () => {
    const result = getProductId(undefined)
    expect(result).toBeUndefined()
  })
})
