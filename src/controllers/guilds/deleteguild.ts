import { FastifyReply, FastifyRequest } from "fastify";
import { GuildIdParam } from "../../types/guild_types";
import { deleteGuild } from "../../service/guild/delete";

export type guild = {
  id: string; // id
  name: string; // ギルド名
  topic: string; // トピック
  icon: string; // アイコンのURL
  created_at: Date; // 作成日時
  updated_at?: Date; // アップロード日時
  deleted_at?: Date; // 削除日時(使えるのかは未検証
};

export async function DeleteGuild(
  req: FastifyRequest<{ Params: GuildIdParam }>,
  res: FastifyReply
) {
  // Todo: Serviceに投げる
  const resp = await deleteGuild(req.params.guildId);

  if (resp !== null) {
    return res.status(204).send();
  } else {
    req.log.error("Failed to Delete Guild");
    return res.status(400).send("Invalid Request");
  }
}
