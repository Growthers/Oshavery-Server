import { FastifyReply, FastifyRequest } from "fastify";
import { guild } from "../../models/guild.js";
import { logger } from "../../main.js";
import { users } from "../../models/user.js";
import { GuildIdParam } from "../../types/guild_types.js";
import { IncomingMessage, Server } from "http";
import { AuthHeaders } from "../../types/auth_types";
import { checklogin } from "../auth/checklogin";
import { InvalidTokenError } from "../auth/verifytoken";

export type guild = {
  id: string; // id
  name: string; // ギルド名
  topic: string; // トピック
  icon: string; // アイコンのURL
  created_at: Date; // 作成日時
  updated_at?: Date; // アップロード日時
  deleted_at?: Date; // 削除日時(使えるのかは未検証
};

export async function memberList(
  req: FastifyRequest<
    { Params: GuildIdParam; Headers: AuthHeaders },
    Server,
    IncomingMessage
  >,
  res: FastifyReply
) {
  if (!req.headers.authorization) return;
  const check = await checklogin(req.headers.authorization);
  if (check instanceof InvalidTokenError) {
    res.status(401).send("Invalid request");
    return;
  }
  // eslint-disable-next-line
  const re: Array<any> = await guild
    .searchJoinedGuildMembers(req.params.guildId)
    .then((r) => r)
    .catch((e) => {
      logger.error(e);
      return [];
    });
  // eslint-disable-next-line
  const resp = Array<any>();

  for (let i = 0; i < re.length; i++) {
    resp[i] = await users
      .get(re[i].usersId)
      .then((r) => r)
      .catch((e) => {
        logger.error(e);
      });
  }

  return res.status(200).send(resp);
}
