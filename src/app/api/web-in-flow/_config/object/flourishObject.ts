/**
 * Flourish APIデータのオブジェクト
 */
import { DEPLOY_ENV, DOMAIN_PROD, DOMAIN_STG } from '@/config'
import { getGaClientId, routeType } from '@/app/api/web-in-flow/_config'
import { searchParamsContextType } from '@/features/context'
import { getDevice } from '@/app/api/web-in-flow/_config'

/**
 * Flourish APIデータのオブジェクトの型
 */
export interface flourishObjectType {
  // デバイス
  ac_device: string | undefined
  // フォーム名
  form_name: string | '不明'
  // クライアントID
  ac_clientid: string | undefined
  // アフィリエイトタグ識別子
  ac_afid: string | undefined
  // サイトURL
  site_url: string
  // ルート種別
  route_type?: typeof routeType
}

/**
 * Flourish APIデータのオブジェクトのデフォルト値を返す関数
 * @returns {flourishObjectType} Flourish APIデータのオブジェクト
 */
export const getFlourishObject = ({
  formName,
  searchParams,
  clientID,
  acAsp,
}: {
  formName: string
  searchParams?: searchParamsContextType['values']
  clientID?: string
  acAsp?: string
}): flourishObjectType => {
  return {
    ac_device: getDevice({ searchParams }) || undefined,
    form_name: formName || '不明',
    ac_clientid: getGaClientId(clientID) || undefined,
    ac_afid: acAsp || undefined,
    site_url: 'https://' + (DEPLOY_ENV === 'prod' ? DOMAIN_PROD : DOMAIN_STG) + '/',
    route_type: routeType === 'ac' ? undefined : routeType || undefined,
  }
}
