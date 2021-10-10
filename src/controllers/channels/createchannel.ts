import {FastifyReply} from "fastify";
import { channels,channel} from "../../models/channel";
import { channelCreated } from "../notificationcontroller";
import { logger } from "../../refactor-main";

export async function createChannel(req: any, res: FastifyReply) {
  const RequestBody = req.body;
  const guild_id = req.params.guildId;

  const channel: channel = {
    channel_name: RequestBody.channel_name,
    channel_topics: RequestBody.channel_topics,
    channel_type: RequestBody.channel_type,
    channel_position: RequestBody.channel_position
  };

  await channels.create(channel,guild_id)
    .then((ch) => {
      logger.info("Channel created")
      channelCreated(ch.id);
      res.status(201).send(ch);
      return;
    })
    .catch((e) => {
      logger.error(e);
      res.status(400).send("Bad Request");
      return;
    })
  return;
}
