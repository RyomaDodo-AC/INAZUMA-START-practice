/**
 * WebInFlowに送信するデータのデフォルト値
 */
import { getCustomerObject, customerObjectType } from './customerObject'
import { getSenderObject, senderObjectType } from './senderObject'
import { getFlourishObject, flourishObjectType } from './flourishObject'
import { searchParamsContextType } from '@/features/context'

/**
 * WebInFlowに送信するデータの型
 */
export interface webInFlowDefaultObjectType extends senderObjectType {
  data: customerObjectType & flourishObjectType
}

/**
 * WebInFlowに送信するデータのデフォルト値を返す関数
 * @returns {webInFlowDefaultObjectType} WebInFlowに送信するデータのデフォルト値
 */
export const getWebInFlowDefaultObject = ({
  formPath,
  formName,
  formValues,
  searchParams,
  clientID,
  acAsp,
}: {
  formPath: senderObjectType['sender']['form_name']
  formName: string
  formValues: { [key: string]: string | undefined }
  searchParams?: searchParamsContextType['values']
  clientID?: string
  acAsp?: string
}): webInFlowDefaultObjectType => {
  return {
    ...getSenderObject(formPath),
    data: {
      ...getCustomerObject(formValues),
      ...getFlourishObject({ formName, searchParams, clientID, acAsp }),
    },
  }
}
