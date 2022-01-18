import { FastifyReply, FastifyRequest } from "fastify";
import { GuildIdParam } from "../../types/guild_types";
import { CreateChannel, UpdateChannel } from "../../types/channel_types";
import { Server } from "https";
import { IncomingMessage } from "http";
import create from "../../service/channel/create";
import get from "../../service/channel/get";
import { default as update } from "../../service/channel/update";

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

  if (!response) {
    return res.status(400).send("Invalid Request");
  }

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

export async function updateChannel(
  req: FastifyRequest<
    { Params: GuildIdParam; Body: UpdateChannel },
    Server,
    IncomingMessage
  >,
  res: FastifyReply
) {
  const data = {
    id: req.params.guildId,
    name: req.body.channel_name,
    topic: req.body.channel_topic,
    position: req.body.channel_position,
  };
  const resp = update(data);
  if (!resp) {
    return res.status(500).send("Failed to update Chanel");
  } else {
    return res.status(201).send(resp);
  }
}
