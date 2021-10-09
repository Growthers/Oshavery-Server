import express from "express";
import { guild, GuildNotFoundError } from "../../models/guild";
import { logger } from "../../main";
import { medias } from "../../models/media";
import { users,user } from "../../models/user";

export type guild = {
  id: string, // id
  name: string, // ギルド名
  topic: string, // トピック
  icon: string, // アイコンのURL
  created_at: Date, // 作成日時
  updated_at?: Date, // アップロード日時
  deleted_at?: Date // 削除日時(使えるのかは未検証
}

export async function deleteGuild(req: express.Request, res: express.Response) {
  console.log(req.path);
  await guild.delete(req.params.guildId)
    .then(() => {
      res.status(204).end();
      logger.info("Guild Deleted")
      return;
    })
    .catch((e) => {
      logger.error(e);
      res.status(400).send("Invalid reqest");
      return;
    });
  return;
}
