import express from "express";
import { channels,channel } from "../models/channel";

export const channelController = {

  async getChannels(req: express.Request, res: express.Response) {
    console.log(req.path)
    const channel_data = await channels.get()
    console.log(channel_data)
    res.json(channel_data)
  },

  async createChannel(req: express.Request, res: express.Response) {
    console.log(req.path)
    const body = req.body

    const channel: channel = {
      channel_name: body.channel_name,
      channel_topics: body.channel_topics,
      channel_type: body.channel_type,
      channel_position: body.channel_position
    }

    await channels.create(channel)
      .then(() => {
        res.status(201).json(channel)
        return
      })
      .catch((e) => {
        console.log(e)
        res.status(400).send("Bad Request")
        return
      })
    return
  }
}
