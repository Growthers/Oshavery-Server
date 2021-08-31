import express from "express";
import { channels,channel } from "../models/channel";

export const channelController = {

  async getUser(req: express.Request, res: express.Response) {
    console.log(req.path)
    const user = await channels.get()
    console.log(user)
    res.json(user)
  }
}
