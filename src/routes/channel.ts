import { FastifyInstance, RouteShorthandOptions } from "fastify";

import { createChannel } from "../controllers/channels/createchannel";
import { getChannels } from "../controllers/channels/getchannels";
import {
  Channel,
  ChannelIdParams,
  CreateChannel,
} from "../types/channel_types";

export async function ChannelRouter(server: FastifyInstance) {
  const options: RouteShorthandOptions = {
    schema: {
      body: {
        type: "object",
        properties: {
          id: { type: "string" },
          channel_name: { type: "string" },
          channel_topics: { type: "string" },
          channel_type: { type: "string" },
          channel_position: { type: "number" },
          creator_id: { type: "string" },
        },
      },
    },
  };

  await server.get<{ Params: ChannelIdParams; Body: Channel }>(
    "/guilds/:guildId/channels",
    options,
    getChannels
  );

  await server.post<{
    Body: CreateChannel;
    Params: ChannelIdParams;
    Reply: Channel;
  }>("/guilds/:guildId/channels", options, createChannel);
  // .patch(() => {console.log("ぱっちうえー")}); ToDo: チャンネルの更新の実装

  // router_channel.route("/channels/:channelId/permissions") ToDo: チャンネル権限の追加
  //   .get(() => {console.log("げっとうえー")})
  //   .post(() => {console.log("ぽすとうえー")})
  //   .put(() => {console.log("ぷっとうえー")})
  //   .delete(() => {console.log("でりーとうえー")});
}
