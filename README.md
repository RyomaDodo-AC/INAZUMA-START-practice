# 環境構築

## node.js のインストール

本リポジトリの動作には[node.js](https://nodejs.org/)が必要です。  
node.js のバージョンは `package.json` の `volta` に記載のあるバージョンで動作を確認済みです。

## 依存パッケージのインストール

```bash
npm install
```

## 環境変数の設定

### Vercel メンバーの場合

1. 以下のコマンドを実行して Vercel にログインします。
2. 案内に沿って必要な Vercel プロジェクトを連携します。

```bash
npx vercel list
```

3. 以下のコマンドを実行して Vercel に環境変数が登録されていることを確認します。  
   登録されていない場合は、事前に Vercel 管理画面かた環境変数を登録しましょう。（コマンドから登録しても OK です。）

```bash
npx vercel env list
```

4. 以下のコマンドを実行して環境変数をダウンロードします。

```bash
npx vercel env pull
```

### それ以外の場合

1. `sample.env` を `.env.local` として複製します。  
   ※この時、元の `sample.env` を改変・削除してしまった場合、コミットしないように注意してください。
2. `.env.local` 内のコメントを参考にして各種環境変数を取得・記述し保存してください。  
   多くの場合は既に用意されている Vercel プロジェクトに環境変数を閲覧できるので、自身で取得できない場合は Vercel メンバーに確認をしてください。

## 開発環境実行

```bash
npm run dev
```

[https://localhost:3000](https://localhost:3000) or [http://localhost:3001](http://localhost:3001) にアクセスすると閲覧できます。

[http://localhost:6006](http://localhost:6006) にアクセスすると Storybook を閲覧できます。

# アップグレード

## Next.js

[Next.js の GitHub リポジトリ](https://github.com/vercel/next.js/releases)を確認し、latest が現在インストールされているバージョンよりも新しくなっている場合は、以下のコマンドを実行しアップグレードを実施してください。

```bash
npm i next@latest react@latest react-dom@latest
```

## Storybook

Storybook 立ち上げ時にアップグレードの案内が出たら案内に沿って以下のコマンドを実行しアップグレードを実施してください。

```bash
npx storybook@latest upgrade
```

# 学習

Next.js について詳しくは、次のリソースをご覧ください。

- [Next.js Documentation](https://nextjs.org/docs) - Next.js の機能と API について学びます。
- [Learn Next.js](https://nextjs.org/learn) - インタラクティブな Next.js チュートリアル。

[Next.js の GitHub repository](https://github.com/vercel/next.js/) を定期的にチェックしてアップデート情報を取得しましょう。

# その他情報について

[テンプレートリポジトリの Wiki](https://github.com/all-connect-design-engineers/00_INAZUMA-START-NEXT/wiki/) にシステム構成を含んだ基本的な情報をまとめています。  
作業着手前に必要な項目について注意事項が無いかなどの確認を行ってから着手するようにしてください。  
上記の Wiki に無い本リポジトリ固有の情報は本リポジトリの Wiki を確認及び編集するようにしてください。
