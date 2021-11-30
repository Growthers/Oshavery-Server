import { FastifyReply, FastifyRequest } from "fastify";
import { GuildIdParam, UpdateGuildInfo } from "../../types/guild_types";
import { Server } from "https";
import { IncomingMessage } from "http";
import update from "../../service/guild/update";

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
  const body = {
    name: req.body.name,
    icon: req.body.icon,
    owner: req.body.owner_id,
  };

  const resp = await update(guild_id, body);
  if (resp !== null) {
    return res.status(204).send();
  } else {
    req.log.error("Guild Update failed");
    return res.status(400).send("Invalid Request");
  }
}
