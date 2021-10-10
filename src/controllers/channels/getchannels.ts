import {FastifyReply} from "fastify";
import { channels,GuildNotFoundError } from "../../models/channel";

export async function getChannels(req:any, res: FastifyReply) {
  const guild_id = req.params.guildId;
  let guilds = await channels.get(guild_id);

  if (guilds instanceof GuildNotFoundError){
    return  res.status(404).send("Not found");
  }else {
    return res.status(200).send(guilds);
  }
}
