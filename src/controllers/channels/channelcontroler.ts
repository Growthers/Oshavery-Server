import { FastifyReply, FastifyRequest } from "fastify";
import { GuildIdParam } from "../../types/guild_types";
import { CreateChannel } from "../../types/channel_types";
import { Server } from "https";
import { IncomingMessage } from "http";
import create from "../../service/channel/create";
import get from "../../service/channel/get";

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
  return res.status(200).send(response);
}

export async function getChannels(
  req: FastifyRequest<{ Params: GuildIdParam }, Server, IncomingMessage>,
  res: FastifyReply
) {
  const guild_id = req.params.guildId;
  const guilds = await get(guild_id);

  if (guilds !== null) {
    return res.status(200).send(guilds);
  } else {
    req.log.error("Guild Not Found");
    return res.status(404).send("Not found");
  }
}
