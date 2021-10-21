import { FastifyReply, FastifyRequest } from "fastify";
import { channels, channel } from "../../models/channel";
import { channelCreated } from "../notificationcontroller";
import { logger } from "../../main";
import { ChannelIdParams, CreateChannel } from "../../types/channel_types";
import { IncomingMessage, Server } from "http";

export async function createChannel(
  req: FastifyRequest<
    { Body: CreateChannel; Params: ChannelIdParams },
    Server,
    IncomingMessage
  >,
  res: FastifyReply
) {
  const RequestBody = req.body;
  const guild_id = req.params.guildId;

  const channel: channel = {
    channel_name: RequestBody.channel_name,
    channel_topics: RequestBody.channel_topics,
    channel_type: RequestBody.channel_type,
    channel_position: RequestBody.channel_position,
  };

  try {
    const Channels = await channels.create(channel, guild_id);
    await channelCreated(Channels.id);
    logger.info("Channel Created");
    return res.status(201).send(Channels);
  } catch (e) {
    return res.status(400).send("Invalid request");
  }
}
