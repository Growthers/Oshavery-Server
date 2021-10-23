// 設定ファイルで指定する内容
export type Config = {
  repository?: string; //レポジトリ <Org>/<RepoName>
  url: string; // インスタンスのURL
  port: number; // リッスンするポート
  allowRegister?: boolean; // 新規登録を許可するか
  secretKeyFilePath: string; // JWTなどの署名に使うインスタンスの秘密鍵
  publicKeyFilePath: string; // 公開鍵
  storage: {
    keyFile: string; // GCSのクレデンシャルファイルへのパス
    bucketName: string; // バケット名
    mediaServerURL: string; // ファイルのアップロード時のURL <scheme>://<domain_name>.<tld>
  };
};
