/**
 * 郵便番号検索APIを使って郵便番号から住所を取得する
 * @param postalCode 郵便番号（ハイフンあり or なし）
 * @returns 住所
 * @throws Error
 * @see https://zipcloud.ibsnet.co.jp/doc/api
 */
export const getAddress = async (postalCode: string): Promise<zipcloudType> => {
  // 郵便番号（ハイフンあり or なし）が不正な形式の場合はエラーを投げる
  if (!(postalCode.match(/^\d{3}-?\d{4}$/) || postalCode.match(/^\d{7}$/))) {
    throw new Error('郵便番号が不正な形式です')
  }

  // 郵便番号検索APIを使って郵便番号から住所を取得する
  const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
  const response = await fetch(url, { next: { revalidate: 86400 } })
  const json = await response.json()
  if (json.status !== 200) {
    throw new Error('住所が見つかりませんでした')
  }

  // 結果をそのまま返す
  return json as zipcloudType
}

/**
 * 郵便番号検索APIのレスポンス型
 * @see https://zipcloud.ibsnet.co.jp/doc/api
 */
export type zipcloudType = {
  message: null | string // エラーメッセージ
  results:
    | null
    | [
        {
          address1: string // 都道府県名
          address2: string // 市区町村名
          address3: string // 町域名
          kana1: string // 都道府県名カナ
          kana2: string // 市区町村名カナ
          kana3: string // 町域名カナ
          prefcode: string // 都道府県コード
          zipcode: string // 郵便番号
        },
      ]
  status: number // ステータスコード
}
