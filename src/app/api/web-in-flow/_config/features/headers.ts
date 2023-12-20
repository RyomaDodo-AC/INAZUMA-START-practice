/**
 * WebInFlowのリクエストヘッダー
 */
import { DEPLOY_ENV, DOMAIN_PROD, DOMAIN_STG } from '@/config'

/**
 * エンドポイントを返す関数
 */
export const getWebInFlowEndpoint = () => {
  const endpointProd = 'https://f58bfbsldf.execute-api.ap-northeast-1.amazonaws.com/v1/inflow/prod'
  const endpointDev = 'https://f58bfbsldf.execute-api.ap-northeast-1.amazonaws.com/v1/inflow/dev'

  return DEPLOY_ENV === 'prod' ? endpointProd : endpointDev
}

/**
 * WebInFlowのリクエストヘッダーを返す関数
 */
export const getWebInFlowHeaders = () => {
  return {
    'Content-Type': 'application/json;charset=utf-8',
    origin: 'https://' + (DEPLOY_ENV === 'prod' ? DOMAIN_PROD : DOMAIN_STG),
  }
}
