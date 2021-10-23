import { FastifyReply, FastifyRequest } from "fastify";
import { channels, channel } from "../../models/channel.js";
import { channelCreated } from "../notificationcontroller.js";
import { logger } from "../../main.js";
import { ChannelIdParams, CreateChannel } from "../../types/channel_types.js";
import { IncomingMessage, Server } from "http";
import { AuthHeaders } from "../../types/auth_types";
import { checklogin } from "../auth/checklogin";
import { InvalidTokenError } from "../auth/verifytoken";

export async function createChannel(
  req: FastifyRequest<
    { Body: CreateChannel; Params: ChannelIdParams; Headers: AuthHeaders },
    Server,
    IncomingMessage
  >,
  res: FastifyReply
) {
  if (!req.headers.authorization) return;
  const check = await checklogin(req.headers.authorization);
  if (check instanceof InvalidTokenError) {
    res.status(401).send("Invalid request");
    return;
  }

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
