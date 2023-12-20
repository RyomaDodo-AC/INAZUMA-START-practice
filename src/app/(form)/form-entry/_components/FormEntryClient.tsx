/**
 * 申込フォームの入力ページのクライアントサイドコンポーネント
 */
'use client'
import React, { useEffect, useState } from 'react'
import { Iframe } from '@/components/plugins'
import { useSearchParamsContext } from '@/features/context'

export const FormEntryClient: React.FC = () => {
  /**
   * 初期設定
   */
  // コンテキストから値を取得
  const { ...SearchParams } = useSearchParamsContext()

  // Flourishパラメータ
  const [clientId, setClientId] = useState({
    clientID: '',
    loaded: false,
  })
  const [device, setDevice] = useState({
    device: '',
    loaded: false,
  })

  // ドキュメントがマウントされたら表示する
  const [documentMouned, setDocumentMounted] = useState(false)
  useEffect(() => {
    setDocumentMounted(true)
  }, [])

  // cookie情報
  const [cookieObject, setCookieObject] = useState<{
    [key: string]: string
  }>({})
  useEffect(() => {
    if (!documentMouned) return
    // cookie情報をキーと値で配列で取得
    const cookies = document.cookie.split('; ')
    // cookie情報をオブジェクトに変換
    setCookieObject(
      cookies.reduce((acc, cookie) => {
        const [key, value] = cookie.split('=')
        return { ...acc, [key]: value }
      }, {}),
    )
  }, [documentMouned])

  // Flourishのパラメータを取得
  useEffect(() => {
    // clientidを取得
    const ac_clientid = async () => {
      await fetch('/api/web-in-flow/get-client-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: cookieObject._ga || '',
        }),
      }).then((res) => {
        res.json().then((data) => {
          setClientId({ clientID: data.clientID, loaded: true })
        })
      })
    }

    ac_clientid()
  }, [cookieObject])

  const serchParams = SearchParams.getValues()
  useEffect(() => {
    // deviceを取得
    const ac_device = async () => {
      await fetch('/api/web-in-flow/get-ad-device', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchParams: serchParams,
        }),
      }).then((res) => {
        res.json().then((data) => {
          setDevice({ device: data.device, loaded: true })
        })
      })
    }

    ac_device()
  }, [serchParams])

  // clientIdとdeviceが取得できたらFlourishのクエリパラメータ文字列をもったiframeURL生成
  let url = 'https://bb8301ac.form.kintoneapp.com/public/3a35106fbe10b70f8b449ab9104f8cc9b353cfbdcb6653ba6253d2950267d5f0'
  if (clientId.loaded && device.loaded) {
    url = url + '?ac_clientid=' + clientId.clientID + '&ac_device=' + device.device
  }

  return <>{clientId.loaded && device.loaded && <Iframe height="500px" url={url} width="100%"></Iframe>}</>
}
