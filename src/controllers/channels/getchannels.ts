import { FastifyReply, FastifyRequest } from "fastify";
import { channels, GuildNotFoundError } from "../../models/channel";
import { GuildIdParam } from "../../types/guild_types";
import { Server } from "https";
import { IncomingMessage } from "http";

export async function getChannels(
  req: FastifyRequest<{ Params: GuildIdParam }, Server, IncomingMessage>,
  res: FastifyReply
) {
  const guild_id = req.params.guildId;
  const guilds = await channels.get(guild_id);

  if (guilds instanceof GuildNotFoundError) {
    return res.status(404).send("Not found");
  }
  return res.status(200).send(guilds);
}
