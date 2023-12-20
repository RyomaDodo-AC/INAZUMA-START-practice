/**
 * 料金プラン説明コンポーネント
 * @module PlanDescription
 */
import React, { Fragment } from 'react'
import { useStripeContext, priceMeta, useMicroCMSContext, microCMSPlansType } from '@/features/context'
import { HeadingCaption } from '@/components/elements'
import { useFormContext } from 'react-hook-form'
import type MicroCMS from 'microcms-js-sdk'
import { addComma } from '@/features/functions/number/addComma'
import { PlanInputProps } from './PlanInput'

/**
 * 料金プラン説明コンテンツのプロパティ
 * @typedef {Object} PlanDescriptionProps
 */
export interface PlanDescriptionProps {
  /**
   * フォームの名前（ID）
   */
  nameId: PlanInputProps['nameId']
}

/**
 * 料金プラン説明コンポーネント
 * @param {PlanDescriptionProps} props - 料金プラン説明コンポーネントのプロパティ
 * @returns {React.FC} - 料金プラン説明コンポーネント
 */
export const PlanDescription: React.FC<PlanDescriptionProps> = (props) => {
  const { getPlan, getPriceId } = useMicroCMSContext()
  const { translateInterval, getPrice, getNextPriceIds } = useStripeContext()
  const { watch } = useFormContext()
  const { nameId } = props

  /**
   * Stripeから料金プラン説明コンテンツを作成
   */
  // 選択されている料金プランのIDを取得
  const planId: microCMSPlansType['id'] = watch(nameId)
  // 料金が設定されていない場合は表示しない
  if (!planId) return <></>

  // 料金プランの情報を取得
  const plan = getPlan(planId)
  // 料金プランの情報が取得できない場合は表示しない
  if (!plan || !plan.stripe || !plan.stripe.prices) return <></>

  // planIdからStripeのpriceIdを取得
  const priceId = getPriceId(plan.stripe.prices)
  // priceIdが取得できない場合は表示しない
  if (!priceId) return <></>

  // Stripeから全ての料金情報を取得
  const prices = getNextPriceIds(priceId)

  // 料金表を作成
  const priceRows = prices.map((price, index) => {
    // 料金オブジェクトを作成
    const priceObj = getPrice(price)
    // 料金オブジェクトが取得できない場合は表示しない
    if (!priceObj) return <></>
    const priceMeta: priceMeta = priceObj.metadata

    // 料金表の行を返す
    return (
      <Fragment key={priceObj.id}>
        {priceObj.recurring ? (
          <tr>
            <th className="table-style-cell table-style-th w-5/12 text-left">
              {priceMeta.end_interval_count === '999' ? (
                '以降'
              ) : (
                <>
                  ～{priceObj.recurring.interval_count * Number(priceMeta.end_interval_count) + 1}
                  {translateInterval(priceObj.recurring.interval)}間
                </>
              )}
            </th>
            <td className="table-style-cell">{priceObj.unit_amount ? <>{addComma(priceObj.unit_amount)}</> : '0'}円（税込）</td>
          </tr>
        ) : (
          <tr>
            <th className="table-style-cell table-style-th w-5/12 text-left">初回</th>
            <td className="table-style-cell">td</td>
          </tr>
        )}
      </Fragment>
    )
  })

  /**
   * microCMSから料金プラン説明コンテンツを作成
   * （HTMLを解釈するため脆弱性に注意）
   */
  const planContents = plan.planContents ? <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: plan.planContents }}></div> : <></>

  return (
    <div className="mt-6 bg-gray-100 p-7">
      <HeadingCaption tag="h3" className="mb-6 text-xl">
        月額基本料
      </HeadingCaption>
      <table className="table-style w-full">
        <tbody className="table-style-row">{priceRows}</tbody>
      </table>
      {planContents && <div className="mt-10">{planContents}</div>}
    </div>
  )
}
