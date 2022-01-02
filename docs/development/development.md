# Development

これは Oshavery の開発者向けドキュメントです.

各種ドキュメントはこちら↓
- [APIドキュメント](./API/readme.md)
- DBスキーマ

## ローカル環境を作る
### 動作要件
- Node.js 14以上(LTSを推奨)
- Git
- MariaDB
- yarn

### サーバーの起動

1. 必要なパッケージを取得
```bash
yarn install
```
2. DBへスキーマを反映
`.env` に`DATABASE_URL` を追記してください.
(exampleは`.env.example` にあります.)
```bash
prisma db push
```
3. 初期データの設定
```
yarn run init
```
4. 起動
```
yarn start
```

デフォルトで `http://localhost:3080/` でサーバーは起動します.
