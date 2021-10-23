import { FastifyReply, FastifyRequest } from "fastify";
import { users, register } from "../../models/user.js";
import { Config, logger } from "../../main.js";
import { Register } from "../../types/user_types.js";
import { IncomingMessage, Server } from "http";
import bcrypt from "bcrypt";

export async function CreateUserAccount(
  req: FastifyRequest<{ Body: Register }, Server, IncomingMessage>,
  res: FastifyReply
) {
  /*
  ユーザー登録のフロー
  Username / Passwordを入力して送信 -> ユーザーアカウントの形式にする
   */

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const data: register = {
    name: req.body.name,
    sub: req.body.name + "@" + Config.url, // sub #とは -> @<username>@<Instance_Origin> の形式(グローバルなユーザの識別子)
    avatar: "", // デフォルトのアイコンのパスを指定したい
    password: hashedPassword,
  };

  try {
    const response = await users.createUserAccount(data);
    return res.status(201).send(response);
  } catch (e) {
    logger.error(e);
    return;
  }
}
