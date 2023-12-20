/**
 * 送信先DB特定情報のオブジェクト
 */
import { DOMAIN_PROD, DEPLOY_ENV } from '@/config'

/**
 * 送信先DB特定情報のオブジェクトの型
 */
export type senderObjectType = {
  sender: {
    // 送信先ドメイン名
    domain_name: string
    // 送信先のDB検証環境（dev）or本番環境（prod）を指定
    env: 'dev' | 'prod'
    // 送信先DBの種別を指定
    receiver: 'kintone' | 'salesforce'
    // フォーム名（フォームによってreceiver先が変わる場合を想定）
    form_name: `form-${string}`
  }
}

/**
 * 送信先DB特定情報のオブジェクトのデフォルト値を返す関数
 * @param formName フォーム名
 * @returns {senderObjectType} 送信先DB特定情報のオブジェクト
 */
export const getSenderObject = (formName: `form-${string}`): senderObjectType => {
  return {
    sender: {
      domain_name: DOMAIN_PROD,
      env: DEPLOY_ENV,
      receiver: 'kintone',
      form_name: formName,
    },
  }
}
