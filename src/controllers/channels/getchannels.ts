import { FastifyReply } from "fastify";
import { channels, GuildNotFoundError } from "../../models/channel";

// eslint-disable-next-line
export async function getChannels(req: any, res: FastifyReply) {
  const guild_id = req.params.guildId;
  const guilds = await channels.get(guild_id);

  if (guilds instanceof GuildNotFoundError) {
    return res.status(404).send("Not found");
  }
  return res.status(200).send(guilds);
}
