import { FastifyReply, FastifyRequest } from "fastify";
import { users, register } from "../../models/user";
import { logger } from "../../main";
import { Register } from "../../types/user_types";
import { IncomingMessage, Server } from "http";

export async function CreateUserAccount(
  req: FastifyRequest<{ Body: Register }, Server, IncomingMessage>,
  res: FastifyReply
) {
  /*
  ユーザー登録のフロー
  Username / Passwordを入力して送信 -> ユーザーアカウントの形式にする
   */

  const data: register = {
    name: req.body.name,
    sub: "", // sub #とは -> @<username>@<Instance_Origin> の形式(グローバルなユーザの識別子)
    avatar: "", // デフォルトのアイコンのパスを指定したい
    password: req.body.password, // ToDo: ハッシュする
  };

  try {
    const response = await users.createUserAccount(data);
    return res.status(201).send(response);
  } catch (e) {
    logger.error(e);
    return;
  }
}
