/**
 * 完結フォームのカスタムフック
 */
'use strict'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useMicroCMSContext, useStripeContext } from '@/features/context'
import { createStripeIds, createBillingAmount, createBillingAmountProps } from '../features'

/**
 * 完結フォームのカスタムフック
 */
export const useCompleteForm = () => {
  const useForm = useFormContext()
  const useMicroCMS = useMicroCMSContext()
  const useStripe = useStripeContext()

  /**
   * 渡された商品タイプからstripeIdsを作成する
   * @returns {[key: string]: ReturnType<typeof createStripeIds>} - stripeIds
   */
  const getStripeIds = (): { [key: string]: ReturnType<typeof createStripeIds> } => {
    /**
     * 選択中の内容からStripeのIDをオブジェクトで定義する
     */
    const stripeIds = {
      plan: 'plan',
      terminal: 'terminal',
      accessoryCharger: 'accessoryCharger',
      accessoryCradle: 'accessoryCradle',
      guarantee: 'guarantee',
      option: 'option',
      othersAdministrativeFee: 'others.administrativeFee',
    }

    return Object.entries(stripeIds).reduce((prev, [key, value]) => {
      return {
        ...prev,
        [key]: createStripeIds({ type: value, useFormContext: useForm, useMicroCMSContext: useMicroCMS }),
      }
    }, {})
  }

  /**
   * StripeIdsから請求金額を作成する
   * @returns {createBillingAmountReturn} - createBillingAmountReturn
   */
  const getBillingAmount = () => {
    return createBillingAmount({ stripeIds: getStripeIds(), useStripeContext: useStripe, unitLimit: 'start' })
  }

  return { getStripeIds, getBillingAmount }
}
