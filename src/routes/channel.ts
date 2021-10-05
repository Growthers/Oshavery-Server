import express from "express";
const router_channel = express.Router();

import { createChannel } from "../controllers/channels/createchannel";
import {getChannels} from "../controllers/channels/getchannels";

router_channel.route("/guilds/:guildId/channels")
  .get(getChannels)
  .post(createChannel)
  // .patch(() => {console.log("ぱっちうえー")});

// router_channel.route("/channels/:channelId/permissions")
//   .get(() => {console.log("げっとうえー")})
//   .post(() => {console.log("ぽすとうえー")})
//   .put(() => {console.log("ぷっとうえー")})
//   .delete(() => {console.log("でりーとうえー")});

module.exports = router_channel;
