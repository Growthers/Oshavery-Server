import { FastifyReply, FastifyRequest } from "fastify";
import { guild, guild_struct_post } from "../../models/guild";
import { logger } from "../../main";
import { CreateGuild } from "../../types/guild_types";
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

export async function createGuild(
  req: FastifyRequest<{ Body: CreateGuild }, Server, IncomingMessage>,
  res: FastifyReply
) {
  const body = req.body;
  const data: guild_struct_post = {
    guild_name: body.name,
    guild_topics: body.topic,
  };
  await guild
    .create(data)
    .then((gld) => {
      logger.info("Guild created");
      res.status(201).send(gld);
    })
    .catch((e) => {
      logger.error(e);
      res.status(400).send("Invaild reqest");
    });
}
