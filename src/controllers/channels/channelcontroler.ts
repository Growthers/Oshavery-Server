import { FastifyReply, FastifyRequest } from "fastify";
import { channels } from "../../models/channel";
import { GuildIdParam } from "../../types/guild_types";
import { CreateChannel } from "../../types/channel_types";
import { Server } from "https";
import { IncomingMessage } from "http";
import { GuildNotFoundError } from "../../models/guild";
import create from "../../service/channel/create";

export async function createChannel(
  req: FastifyRequest<
    { Params: GuildIdParam; Body: CreateChannel },
    Server,
    IncomingMessage
  >,
  res: FastifyReply
) {
  const RequestBody = req.body;
  const guild_id = req.params.guildId;

  const response = await create({
    name: RequestBody.channel_name,
    topics: RequestBody.channel_topics,
    type: RequestBody.channel_type,
    position: RequestBody.channel_position,
    guildId: guild_id,
  });

  req.log.info("Channel Created");

  res.status(200).send(response);
  return;
}

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
