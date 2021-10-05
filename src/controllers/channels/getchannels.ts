import express from "express";
import { channels,GuildNotFoundError } from "../../models/channel";

export async function getChannels(req: express.Request, res: express.Response) {
  const guild_id = req.params.guildId;
  let guilds = await channels.get(guild_id);

  if (guilds instanceof GuildNotFoundError){
    return  res.status(404).send("Not found");
  }else {
    return res.status(200).json(guilds);
  }
}
