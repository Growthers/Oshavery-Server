import { FastifyReply, FastifyRequest } from "fastify";
import { guild } from "../../models/guild.js";
import { medias } from "../../models/media.js";
import { AuthHeaders } from "../../types/auth_types";
import { GuildIdParam } from "../../types/guild_types";
import { IncomingMessage, Server } from "http";
import { logger } from "../../main";
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

export async function getGuild(
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
  logger.debug("ok");

  let resp: guild;

  logger.info(req.params);
  const g = await guild.get(req.params.guildId);
  const icon = await medias.searchGuildIcon(g.id);
  if (icon) {
    resp = {
      id: g.id,
      name: g.name,
      icon: icon.fullpath,
      topic: g.topic || "",
      created_at: g.created_at,
    };
  } else {
    resp = {
      id: g.id,
      name: g.name,
      icon: g.icon,
      topic: g.topic || "",
      created_at: g.created_at,
    };
  }

  return res.send(resp);
}
