import { FastifyReply, FastifyRequest } from "fastify";
import { GuildIdParam } from "../../types/guild_types";
import memberlist from "../../service/guild/memberlist";

export type guild = {
  id: string; // id
  name: string; // ギルド名
  topic: string; // トピック
  icon: string; // アイコンのURL
  created_at: Date; // 作成日時
  updated_at?: Date; // アップロード日時
  deleted_at?: Date; // 削除日時(使えるのかは未検証
};

export async function memberList(
  req: FastifyRequest<{ Params: GuildIdParam }>,
  res: FastifyReply
) {
  const member = await memberlist(req.params.guildId);
  if (member !== null) {
    return res.status(200).send(member);
  } else {
    req.log.info("Failed to get Guilds ");
    return res.send(400).send("Invalid Request");
  }
}
