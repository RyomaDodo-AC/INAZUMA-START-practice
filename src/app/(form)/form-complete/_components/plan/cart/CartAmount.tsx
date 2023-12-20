/**
 * 選択した商品の合計金額を表示するコンポーネント
 * @module CartAmount
 * @todo watchの引数をtypeセーフにする
 */
import React from 'react'
import { useCompleteForm } from '@/app/(form)/form-complete/_config'
import { useStripeContext } from '@/features/context'
import { HeadingCaption, Note } from '@/components/elements'
import { Tabs, TabContent } from '@/components/plugins'
import { addComma } from '@/features/functions/number/addComma'

export const CartAmount: React.FC = () => {
  const { getBillingAmount } = useCompleteForm()
  const { translateInterval } = useStripeContext()

  const billingAmount = getBillingAmount()

  // タブのコンテンツを作成
  const tabs: TabContent[] = []
  billingAmount.forEach((billing) => {
    // 各料金のコンテンツを作成
    const amountContents: {
      oneTime: React.ReactNode
      recurring: React.ReactNode
      coupon: React.ReactNode
    } = {
      oneTime: <></>,
      recurring: <></>,
      coupon: <></>,
    }

    // 料金のコンテンツを作成
    Object.entries(billing.items).forEach(([key, items]) => {
      if (items.length === 0) return

      amountContents[key as keyof typeof amountContents] = items.map((item) => {
        return (
          item.price && (
            <dl key={item.price.id} className="py-2">
              <dt className="text-sm font-bold">{item.name}</dt>
              <dd className="text-right text-sm font-bold">
                {addComma(item.price.unit_amount ? item.price.unit_amount : 0)}円（税込）
                {item.price.type === 'recurring' && item.price.recurring && (
                  <span>
                    &nbsp;/&nbsp;{item.price.recurring.interval_count !== 1 && item.price.recurring.interval_count}
                    {item.price.recurring.interval_count !== 1 ? translateInterval(item.price.recurring.interval) : translateInterval(item.price.recurring.interval).slice(-1)}
                  </span>
                )}
              </dd>
            </dl>
          )
        )
      })
    })

    // 割引のコンテンツを作成
    billing.coupons.forEach((coupon) => {
      if (!coupon) return

      amountContents.coupon = (
        <dl key={coupon.id} className="py-2">
          <dt className="text-sm font-bold">{coupon.name}</dt>
          <dd className="text-right text-sm font-bold">
            {coupon.amount_off && <>-{addComma(coupon.amount_off)}円</>}
            {coupon.percent_off && <>{coupon.percent_off}%割引</>}
          </dd>
        </dl>
      )
    })

    // itemsの中身が空の場合はフラグメントを入れる
    let content = <></>
    if (billing.items.oneTime.length > 0 || billing.items.recurring.length > 0 || billing.coupons.length > 0) {
      content = (
        <div className="mt-4 space-y-3">
          {billing.items.oneTime.length > 0 && (
            <div>
              <h3 className="flex items-center font-bold before:content-['【'] after:content-['】']">単発料金</h3>
              <div className="divide-y divide-gray-500">{amountContents.oneTime}</div>
            </div>
          )}
          {billing.items.recurring.length > 0 && (
            <div>
              <h3 className="flex items-center font-bold before:content-['【'] after:content-['】']">{translateInterval(billing.recurringUnit).slice(-1)}額料金</h3>
              {billing.note && <Note list={[billing.note]} />}
              <div className="divide-y divide-gray-500">{amountContents.recurring}</div>
            </div>
          )}
          {billing.coupons.length > 0 && (
            <div>
              <h3 className="flex items-center font-bold before:content-['【'] after:content-['】']">割引料金</h3>
              <div className="divide-y divide-gray-500">{amountContents.coupon}</div>
            </div>
          )}
          <div className="border-t border-gray-500 pt-3">
            <h3 className="font-bold">合計金額</h3>
            <p className="text-right font-bold">{addComma(billing.total)}円（税込）</p>
          </div>
        </div>
      )
    }

    tabs.push({
      label: billing.recurring,
      content,
      id: String(billing.recurringScore),
    })
  })

  return (
    <div>
      <HeadingCaption tag="h2" className="mb-4 text-lg font-bold">
        支払い金額
      </HeadingCaption>
      <div>
        <Tabs tabs={tabs} style={{ default: 'button' }} size={{ default: 'xs' }} />
      </div>
    </div>
  )
}
