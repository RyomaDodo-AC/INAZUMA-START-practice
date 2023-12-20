/**
 * 送信データを取得する
 */
import { getWebInFlowDefaultObject, webInFlowDefaultObjectType } from '@/app/api/web-in-flow/_config'
import { searchParamsContextType } from '@/features/context'

/**
 * 送信データを生成するために必要なデータの型
 */
export interface getSendDataType {
  formPath: webInFlowDefaultObjectType['sender']['form_name']
  formName: string
  formValues: { [key: string]: string | undefined }
  mergeObject?: { [key: string]: string | undefined }
  searchParams?: searchParamsContextType['values']
  clientID?: string
  acAsp?: string
}

/**
 * 送信データを生成して返す
 * @param formPath フォームのパス名
 * @param formValues フォームの値
 * @param formName フォーム名
 * @param mergeObject カスタムで追加したいデータ
 * @param searchParams クエリパラメータ
 * @param clientID クライアントID
 * @param acAsp アフィリエイトタグ識別子
 * @returns {object} 送信データオブジェクト
 */
export const getSendData = ({ formPath, formName, formValues, mergeObject, searchParams, clientID, acAsp }: getSendDataType) => {
  // デフォルト値を取得
  const defaultData = getWebInFlowDefaultObject({ formPath, formValues, formName, searchParams, clientID, acAsp })

  // マージする
  const mergedData = {
    ...defaultData,
    data: {
      ...defaultData.data,
      ...mergeObject,
    },
  }

  return mergedData
}
