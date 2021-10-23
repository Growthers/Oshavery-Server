import { FastifyInstance } from "fastify";
import { AuthHeaders, AuthQueryString, Token } from "../../types/auth_types";
import bcrypt from "bcrypt";
import { users } from "../../models/user";
import jwt from "jsonwebtoken";
import { logger } from "../../main";
import * as fs from "fs";

const key = fs.readFileSync("");
const pkey = fs.readFileSync("");
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

    if (userdata.origin !== "oshavery-app.net") {
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

      // Todo: tokenを生成するときの鍵を何にするか決める
      const token = jwt.sign(responseData, key, {
        algorithm: "RS256",
        issuer: "oshavery-app.net",
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
