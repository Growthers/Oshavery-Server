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

export async function getGuild(req: express.Request, res: express.Response) {
  let resp:guild;

  const g = await guild.get(req.params.guildId)

  const icon = await medias.searchGuildIcon(g.id)
  if (icon) {
    resp = {
      id: g.id,
      name: g.name,
      icon: icon.fullpath,
      topic: g.topic || "",
      created_at: g.created_at
    }
  }else {
    resp = {
      id: g.id,
      name: g.name,
      icon: g.icon,
      topic: g.topic || "",
      created_at: g.created_at
    }
  }

  return res.json(resp);
}
