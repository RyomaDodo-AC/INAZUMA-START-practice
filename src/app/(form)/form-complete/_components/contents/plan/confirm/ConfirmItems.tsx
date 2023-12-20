/**
 * 選択した商品を確認画面に表示するコンポーネント
 * @module ConfirmItems
 */
import React from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import { useMicroCMSContext, useStripeContext } from '@/features/context'
import { HeadingCaption } from '@/components/elements'
import { Swiper, Accordion } from '@/components/plugins'

/**
 * 選択した商品を確認画面に表示するコンポーネント
 */
export const ConfirmItems: React.FC = () => {
  // 現在選択中の内容を取得
  const { watch } = useFormContext()
  const { getPlan, getTerminal, getAccessory, getTerminalDetail, getGuarantee, getOption, getProductId } = useMicroCMSContext()
  const { getProduct } = useStripeContext()

  // 画像のURLリスト
  const imageUrls: { name?: string; url: string[] }[] = []

  /**
   * 現在選択中のプランからDOMを作成する
   * @param {string|string[]} value - 値
   * @param {string} type - microCMSのAPIキー名
   * @returns {JSX.Element} - DOM
   */
  const createDOM = ({ value, type }: { value?: string | string[]; type: string }) => {
    // typeによって表示内容を変更
    let contents: React.ReactNode | undefined = undefined
    switch (type) {
      case 'plan':
        if (typeof value === 'string') {
          const plan = getPlan(value)
          // Stripeから商品画像を取得
          const productId = plan?.stripe.products && getProductId(plan.stripe.products)
          const product = productId ? getProduct(productId) : undefined

          // 画像URLリスト配列と商品画像配列をマージ
          if (product?.images.length) {
            imageUrls.push({
              name: plan?.name,
              url: product.images,
            })
          }

          contents = (
            <div className="py-1.5">
              <p className="text-xl font-bold">{plan?.name}</p>
              {/* 
                リッチエディタによるコンテンツがある場合表示
                （HTMLを解釈するため脆弱性に注意）
              */}
              {plan?.contents && <div className="text-sm" dangerouslySetInnerHTML={{ __html: plan.contents }}></div>}
            </div>
          )
        } else {
          contents = undefined
        }
        break
      case 'terminal':
        if (typeof value === 'string') {
          const terminal = getTerminal(value)
          if (!terminal) return undefined
          const terminalColor = watch('terminalColor')
          const terminalRecurring = watch('terminalRecurring')

          // 端末情報を取得
          const terminalDetail = getTerminalDetail({ obj: terminal, color: terminalColor, recurring: terminalRecurring })

          // Stripeから商品画像を取得
          const productId = terminalDetail?.stripeProducts && getProductId(terminalDetail.stripeProducts)
          const product = productId ? getProduct(productId) : undefined

          // 画像URLリスト配列と商品画像配列をマージ
          if (product?.images.length) {
            imageUrls.push({
              name: terminal?.name,
              url: product.images,
            })
          }

          // 付属品のDOMを作成
          const selectAccessories = []
          selectAccessories.push(watch('accessoryCharger'))
          selectAccessories.push(watch('accessoryCradle'))

          const accessories = selectAccessories
            .map((v) => {
              const accessory = getAccessory(v)
              // 画像を取得
              const productId = accessory?.stripe.products && getProductId(accessory?.stripe.products)
              const product = productId ? getProduct(productId) : undefined

              // 画像URLリスト配列と商品画像配列をマージ
              if (product?.images.length) {
                imageUrls.push({
                  name: accessory?.name,
                  url: product.images,
                })
              }

              return accessory?.name
            })
            .filter((v) => v)

          contents = (
            <div className="flex items-center gap-2 py-1.5">
              <div>
                <p className="space-x-2 text-xl font-bold">
                  <span>{terminal.name}</span>
                  {terminalColor && <span className="inline-block text-base">{terminalColor}</span>}
                </p>
                {/* 
                  リッチエディタによるコンテンツがある場合表示
                  （HTMLを解釈するため脆弱性に注意）
                */}
                {terminal?.contents && <div className="text-sm" dangerouslySetInnerHTML={{ __html: terminal.contents }}></div>}
                {accessories.length > 0 && (
                  <ul className="list-inside list-disc text-sm">
                    {accessories.map((v) => (
                      <li key={v}>{v}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )
        } else {
          contents = undefined
        }
        break
      case 'guarantee':
        if (typeof value === 'string' && value !== 'null') {
          const guarantee = getGuarantee(value)

          // 画像を取得
          const productId = guarantee?.stripe?.products && getProductId(guarantee?.stripe?.products)
          const product = productId ? getProduct(productId) : undefined

          // 画像URLリスト配列と商品画像配列をマージ
          if (product?.images.length) {
            imageUrls.push({
              name: guarantee?.name,
              url: product.images,
            })
          }

          contents = (
            <div className="py-1.5">
              <p className="text-lg font-bold">{guarantee?.name}</p>
              {/* 
                リッチエディタによるコンテンツがある場合表示
                （HTMLを解釈するため脆弱性に注意）
              */}
              {guarantee?.contents && <div className="text-sm" dangerouslySetInnerHTML={{ __html: guarantee.contents }}></div>}
            </div>
          )
        } else {
          contents = undefined
        }
        break
      case 'option':
        if (typeof value === 'object') {
          const list = value.map((v) => getOption(v))

          contents =
            list.length > 0
              ? list.map((v) => {
                  // 画像を取得
                  const productId = v?.stripe?.products && getProductId(v?.stripe?.products)
                  const product = productId ? getProduct(productId) : undefined

                  // 画像URLリスト配列と商品画像配列をマージ
                  if (product?.images.length) {
                    imageUrls.push({
                      name: v?.name,
                      url: product.images,
                    })
                  }

                  return (
                    <div key={v?.id} className="py-1.5">
                      <p className="text-lg font-bold">{v?.name}</p>
                      {/* 
                      リッチエディタによるコンテンツがある場合表示
                      （HTMLを解釈するため脆弱性に注意）
                    */}
                      {v?.contents && <div className="text-sm" dangerouslySetInnerHTML={{ __html: v.contents }}></div>}
                    </div>
                  )
                })
              : undefined
        } else {
          contents = undefined
        }
        break
    }

    return value && contents ? (
      <>
        {/* <h3 className="mb-2 font-bold before:content-['【'] after:content-['】']">{title}</h3> */}
        {contents}
      </>
    ) : undefined
  }

  // 料金プラン
  const plan = createDOM({ value: watch('plan'), type: 'plan' })
  // 機種
  const terminal = createDOM({ value: watch('terminal'), type: 'terminal' })
  // 端末保証
  const guarantee = createDOM({ value: watch('guarantee'), type: 'guarantee' })
  // オプション
  const option = createDOM({ value: watch('option'), type: 'option' })

  const images: React.ReactNode[] = imageUrls.map((v) => {
    return v.url.map((url) => {
      return (
        <div key={url} className="h-60 w-full pb-8">
          <div className="relative h-full w-full">
            <Image src={url} alt={v.name ? v.name : ''} fill={true} style={{ objectFit: 'contain' }} sizes="(min-width: 768px) 20vw, 100vw" />
          </div>
        </div>
      )
    })
  })

  return (
    <div>
      <HeadingCaption className="mb-8 text-lg md:text-xl">機種・プラン</HeadingCaption>
      <div className="gap-5 md:flex">
        <div className="md:w-1/2">
          <Swiper contents={images} />
        </div>
        <div className="flex-1">
          <div className="divide-y divide-gray-700">
            {plan}
            {terminal}
          </div>
          {(guarantee || option) && (
            <div>
              <Accordion color="black" style="outline" title="その他ご選択プラン" border="thin">
                <div className="divide-y divide-gray-700">
                  {guarantee}
                  {option}
                </div>
              </Accordion>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
