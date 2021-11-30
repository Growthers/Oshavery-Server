import { FastifyReply, FastifyRequest } from "fastify";
import { guild } from "../../repositories/guild";
import { medias } from "../../models/media";
import { GuildIdParam } from "../../types/guild_types";
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

export async function getGuild(
  req: FastifyRequest<{ Params: GuildIdParam }, Server, IncomingMessage>,
  res: FastifyReply
) {
  let resp: guild;

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
