import { FastifyReply, FastifyRequest } from "fastify";
import { CreateGuild } from "../../types/guild_types";
import { Server } from "https";
import { IncomingMessage } from "http";
import create from "../../service/guild/create";

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

  const resp = await create({ name: body.name, topics: body.topic });

  if (resp !== null) {
    res.log.info("Guild Created");
    return res.status(201).send(resp);
  } else {
    res.log.error("Failed to create Guild");
    return res.status(400).send("Invalid Request");
  }
}
