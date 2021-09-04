import express from "express";
import { message_struct, message } from "../models/message"


export const messageController = {

  async createMessage(req: express.Request, res: express.Response) {
    const now = new Date();
    const ip_address = req.headers["x-forwaded-for"] || "";

    // author は user の実装が終わってから guild_id は guild の実装が終わってから
    const mes: message_struct = {
      timestamp: now,
      author: {
        id: "5e95853f-8311-41b8-ba37-1508e5f814ec",
        name: "testuser",
        avator: "dee72156-1ede-4260-b24c-f23303b1acf1",
        bot: false,
        state: 0,
      },
      ip: ip_address[0],
      content: req.body.content,
      guild_id: "84e99ba4-feb0-4608-9478-c3cc031df372",
      channel_id: req.params.channelId
    }

    await message.createMessage(mes)
      .then((r) => {
        res.status(201).json(r);
      })
      .catch((e) => {
        console.error(e);
      });

    return;
  },

  async getMessages(req: express.Request, res: express.Response){
    const channelId = req.params.channelId;
    const before = req.query.before || "";
    let limit;
    if (Number(req.query.limit) === NaN && Number(req.query.limit) > 100){
      limit = 100;
    }else {
      limit = Number(req.query.limit)
    }

    await message.getMessages(channelId, before, limit)
    .then((r) => {
      res.status(200).json(r);
    })
    .catch((e) => {
      console.log(e);
    });
    return;

  },

  async getOneMessage(req: express.Request, res:express.Response){
    // const channelId:string = req.params.channelId;
    const messageId:string = req.params.messageId;

    await message.getOneMessage(messageId)
    .then((r)=> {
      res.status(200).json(r);
    })
    .catch((e) => {
      console.log(e);
    });

    return;
  }
}


