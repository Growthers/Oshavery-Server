import {FastifyReply} from "fastify";
import { guild} from "../../models/guild";
import { logger } from "../../refactor-main";

export type guild = {
  id: string, // id
  name: string, // ギルド名
  topic: string, // トピック
  icon: string, // アイコンのURL
  created_at: Date, // 作成日時
  updated_at?: Date, // アップロード日時
  deleted_at?: Date // 削除日時(使えるのかは未検証
}

export async function createGuild(req: any, res: FastifyReply) {
  const body = req.body;

  await guild.create(body)
    .then((gld) => {
      logger.info("Guild created")
      res.status(201).send(gld);
      return;
    })
    .catch((e) => {
      logger.error(e);
      res.status(400).send("Invaild reqest");
      return;
    });
  return;
}
