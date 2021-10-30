import { FastifyReply, FastifyRequest } from "fastify";
import { guild } from "../../models/guild";
import { logger } from "../../main";
import { GuildIdParam, UpdateGuildInfo } from "../../types/guild_types";
import { Server } from "https";
import { IncomingMessage } from "http";

export type guild = {
  id: string; // id
  name: string; // ギルド名
  topic: string; // トピック
  icon: string; // アイコンのURL
  created_at: Date; // 作成日時
  updated_at?: Date; // アップロード日時
  deleted_at?: Date; // 削除日時(使えるのかは未検証
};

export async function updateGuild(
  req: FastifyRequest<
    { Params: GuildIdParam; Body: UpdateGuildInfo },
    Server,
    IncomingMessage
  >,
  res: FastifyReply
) {
  const guild_id = req.params.guildId;
  const { body } = req;

  await guild
    .update(guild_id, body)
    .then(() => {
      res.status(204).send();
    })
    .catch((e) => {
      logger.error(e);
      res.status(400).send("Invalid reqest");
    });
}
