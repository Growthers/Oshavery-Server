import { FastifyReply, FastifyRequest } from "fastify";
import { channels, channel } from "../../models/channel";
import { channelCreated } from "../notificationcontroller";
import { logger } from "../../main";
import {
  Channel,
  ChannelIdParams,
  CreateChannel,
} from "../../types/channel_types";
import { IncomingMessage, Server, ServerResponse } from "http";

// eslint-disable-next-line
export async function createChannel(req: FastifyRequest<{Body: CreateChannel, Params: ChannelIdParams}>, res: FastifyReply<Server, IncomingMessage, ServerResponse, { Body: Channel }>) {
  const RequestBody = req.body;
  const guild_id = req.params.guildId;

  const channel: channel = {
    channel_name: RequestBody.channel_name,
    channel_topics: RequestBody.channel_topics,
    channel_type: RequestBody.channel_type,
    channel_position: RequestBody.channel_position,
  };

  await channels
    .create(channel, guild_id)
    .then((ch) => {
      logger.info("Channel created");
      channelCreated(ch.id);
      res.status(201).send(ch);
    })
    .catch((e) => {
      logger.error(e);
      res.status(400).send("Bad Request");
    });
}
