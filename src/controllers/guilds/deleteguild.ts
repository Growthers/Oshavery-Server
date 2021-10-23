import { FastifyReply, FastifyRequest } from "fastify";
import { guild } from "../../models/guild.js";
import { logger } from "../../main.js";
import { GuildIdParam } from "../../types/guild_types";
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

export async function deleteGuild(
  req: FastifyRequest<{ Params: GuildIdParam; Headers: AuthHeaders }>,
  res: FastifyReply
) {
  if (!req.headers.authorization) return;
  const check = await checklogin(req.headers.authorization);
  if (check instanceof InvalidTokenError) {
    res.status(401).send("Invalid request");
    return;
  }

  await guild
    .delete(req.params.guildId)
    .then(() => {
      res.status(204).send();
      logger.info("Guild Deleted");
    })
    .catch((e) => {
      logger.error(e);
      res.status(400).send("Invalid reqest");
    });
}
