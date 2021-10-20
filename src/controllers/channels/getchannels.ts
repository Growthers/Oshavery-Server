import { FastifyReply, FastifyRequest } from "fastify";
import { channels, GuildNotFoundError } from "../../models/channel";
import { Channel, ChannelIdParams } from "../../types/channel_types";
import { Server, IncomingMessage, ServerResponse } from "http";

export async function getChannels(
  req: FastifyRequest<
    { Body: Channel; Params: ChannelIdParams },
    Server,
    IncomingMessage
  >,
  res: FastifyReply<Server, IncomingMessage, ServerResponse, { Body: Channel }>
) {
  const guild_id = req.params.guildId;

  const guilds = await channels.get(guild_id);
  if (guilds instanceof GuildNotFoundError) {
    return res.status(404).send("Not found");
  }
  return res.status(200).send(guilds);
}
