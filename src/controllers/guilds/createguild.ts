import { FastifyReply, FastifyRequest } from "fastify";
import { guild, guild_struct_post } from "../../models/guild";
import { logger } from "../../main";
import { CreateGuild, GetGuild, GuildIdParam } from "../../types/guild_types";
import { IncomingMessage, Server } from "http";

export type guild = {
  id: string; // id
  name: string; // ギルド名
  topic: string; // トピック
  icon: string; // アイコンのURL
  created_at: Date; // 作成日時
  updated_at?: Date; // アップロード日時
  deleted_at?: Date; // 削除日時(使えるのかは未検証
};

export async function createGuild(
  req: FastifyRequest<
    { Body: CreateGuild; Params: GuildIdParam },
    Server,
    IncomingMessage
  >,
  res: FastifyReply
) {
  const body: guild_struct_post = {
    guild_name: req.body.name,
    guild_topics: req.body.topic,
  };

  let CreatedGuild;
  try {
    CreatedGuild = await guild.create(body);
    logger.info("Guild created");
    return res.status(201).send(CreatedGuild);
  } catch (e) {
    logger.error(e);
    res.status(400).send("invalid request");
    return;
  }
}
