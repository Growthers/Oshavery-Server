import { FastifyInstance } from "fastify";
import { AuthHeaders, AuthQueryString, Token } from "../../types/auth_types.js";
import bcrypt from "bcrypt";
import { users } from "../../models/user.js";
import jwt from "jsonwebtoken";
import { logger } from "../../main.js";
import * as fs from "fs";
import { loadConfig } from "../../config/load";

/*
  仕様: ログインできるのは自分のパスワードデータがあるインスタンスだけ
  (データは各インスタンスにあるにはあるがログインはできない)

  POST /login -> Authorizationにトークンらしきものが入っていたらとりあえずreject 入っていなければ通常のLoginとして処理
  -> ユーザーネームを検索 -> 存在していなければreject -> Originが自インスタンスであればPasswordを検証して通ればJWTのトークンを返す
*/

export async function Login(server: FastifyInstance) {
  server.post<{
    Body: AuthQueryString;
    Headers: AuthHeaders;
    Reply: Token | string;
  }>("/login", async (req, res) => {
    const Config = await loadConfig();
    const key = fs.readFileSync(Config.secretKeyFilePath);
    const pkey = fs.readFileSync(Config.publicKeyFilePath);

    if (req.headers.authorization) {
      // headerになにかが入っていたらreject
      res.status(400).send("No");
      return;
    }

    const { username, password } = req.body;
    // ユーザーが存在するかチェック
    const userdata = await users.getUserbyUsername(username);
    logger.debug(userdata);
    if (!userdata) {
      // 存在しないならreject
      res.status(400).send("User not found");
      return;
    }

    if (userdata.origin !== Config.url) {
      // originが設定されているものと違ったら別インスタンスのユーザと判断してreject
      res.status(400).send("You are not this instance's user");
      return;
    }

    let password_collect: boolean;
    if (userdata.password) {
      password_collect = await bcrypt.compare(password, userdata.password);
    } else {
      // パスワードがなかったらreject (他インスタンスのユーザーはパスワードがnull)
      res.status(500).send("Login failed");
      return;
    }

    if (password_collect) {
      const responseData = {
        uid: userdata.id,
        uname: userdata.name,
      };

      const token = jwt.sign(responseData, key, {
        algorithm: "RS256",
        issuer: Config.url,
        audience: userdata.sub,
      });
      logger.debug(jwt.verify(token, pkey));
      const reply: Token = {
        token: token,
      };
      // ログイン成功したのでTokenを返却
      res.status(201).send(reply);
    } else {
      res.status(400).send("Invalid request");
    }
  });
}
