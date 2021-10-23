// import yaml from "js-yaml";
// import * as fs from "fs";
import { Config } from "../types/config_types.js";
// import { logger } from "../main";
// import * as url from "url";

export function loadConfig() {
  // 設定ファイル読み込み
  // const configFile = fs.readFileSync(".config/oshavery-config.yaml", "utf-8");
  // YamlをTSのオブジェクトに変換
  // const config = yaml.load(configFile) as Config;
  const config: Config = {
    repository: "Undecided-discord/Oshavery-Server",
    url: "oshavery-app.net",
    port: 3080,
    allowRegister: true,
    secretKeyFilePath: "/home/laminne/private-key.pem",
    publicKeyFilePath: "/home/laminne/public-key.pem",
    storage: {
      keyFile: "",
      bucketName: "test",
      mediaServerURL: "localhost",
    },
  };
  // インスタンスのURLが正しい形式かチェック
  // checkURL(config.url);

  return config;
}

// function checkURL(url: string) {
//   return new URL(url);
// }

// await loadConfig();
