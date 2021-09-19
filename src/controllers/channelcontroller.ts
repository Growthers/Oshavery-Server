import express from "express";
import { channels,channel } from "../models/channel";
import { channelCreated } from "./notificationcontroller";
import { logger } from "../main";

export const channelController = {

  async getChannels(req: express.Request, res: express.Response) {
    console.log(req.path);
    const guild_id = req.params.guildId;

    await channels.get(guild_id)
      .then((ch) => {
        res.status(200).json(ch);
        return;
      })
      .catch((e) => {
        logger.error(e);
        res.status(400).send("Bad Request");
        return;
      });
    return;
  },

  async createChannel(req: express.Request, res: express.Response) {
    const body = req.body;
    const guild_id = req.params.guildId;

    const channel: channel = {
      channel_name: body.channel_name,
      channel_topics: body.channel_topics,
      channel_type: body.channel_type,
      channel_position: body.channel_position
    };

    await channels.create(channel,guild_id)
      .then((ch) => {
        logger.info("Channel created")
        channelCreated(ch.id);
        res.status(201).json(ch);
        return;
      })
      .catch((e) => {
        logger.error(e);
        res.status(400).send("Bad Request");
        return;
      })
    return;
  }
}
