/**
 * 各種設定ファイル
 */
/**
 * 定数
 */
// 実行中のモード
export const NODE_ENV: string = process.env.NODE_ENV
// デプロイしたいモード
export const DEPLOY_ENV: 'dev' | 'prod' = process.env.NEXT_PUBLIC_DEPLOY_ENV as 'dev' | 'prod'
// 本番環境ドメイン（プロトコル無し）
export const DOMAIN_PROD: string = 'acag.jp'
// ステージング環境ドメイン（プロトコル無し）
export const DOMAIN_STG: string = 'dev.' + DOMAIN_PROD

/**
 * 環境変数を読み込み
 */
// GTM ID
export const GTM_ID: string = process.env.NEXT_PUBLIC_GTM_ID || ''
// Stripe API Key
export const STRIPE_PUBLIC_KEY: string | undefined = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
export const STRIPE_SECRET_KEY: string | undefined = process.env.STRIPE_SECRET_KEY
// BASIC認証のID・PW
export const BASIC_USER_NAME: string | undefined = process.env.BASIC_AUTH_USER
export const BASIC_PASSWORD: string | undefined = process.env.BASIC_AUTH_PASSWORD
// microCMSの認証情報
export const MICROCMS_API_KEY: string | undefined = process.env.MICROCMS_API_KEY
export const MICROCMS_REVALIDATE_KEY: string | undefined = process.env.MICROCMS_REVALIDATE_KEY
export const MICROCMS_DOMAIN: string | undefined = process.env.MICROCMS_DOMAIN
