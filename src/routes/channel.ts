import { FastifyInstance } from "fastify";

import { createChannel } from "../controllers/channels/createchannel";
import { getChannels } from "../controllers/channels/getchannels";
import { Channel, ChannelIdParams } from "../types/channel_types";

export async function ChannelRouter(server: FastifyInstance) {
  await server.get<{ Params: ChannelIdParams; Body: Channel }>(
    "/guilds/:guildId/channels",
    getChannels
  );
  // server.post("/guilds/:guildId/channels", createChannel);
  // .patch(() => {console.log("ぱっちうえー")}); ToDo: チャンネルの更新の実装

  // router_channel.route("/channels/:channelId/permissions") ToDo: チャンネル権限の追加
  //   .get(() => {console.log("げっとうえー")})
  //   .post(() => {console.log("ぽすとうえー")})
  //   .put(() => {console.log("ぷっとうえー")})
  //   .delete(() => {console.log("でりーとうえー")});
}
