import { FastifyReply } from "fastify";
import { guild } from "../../models/guild";
import { logger } from "../../main";

export type guild = {
  id: string; // id
  name: string; // ギルド名
  topic: string; // トピック
  icon: string; // アイコンのURL
  created_at: Date; // 作成日時
  updated_at?: Date; // アップロード日時
  deleted_at?: Date; // 削除日時(使えるのかは未検証
};

// eslint-disable-next-line
export async function deleteGuild(req: any, res: FastifyReply) {
  console.log(req.path);
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
